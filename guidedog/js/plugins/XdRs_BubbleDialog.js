//=================================================================================================
// Bubble_Dialog.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 气泡对话框。
* @author 芯☆淡茹水
* @help
*
* 〓 使用说明 〓
* 需要显示气泡对话时，在对话文本里写备注： <XrBD:id,type>
* id :事件ID或对象序号，根据所用环境的不同而不同。
*     在地图场景里，如果类型（type）是事件，这个ID表示事件ID； 如果类型（type）是角色，这个ID表示角色队伍序号，第一个是 0 。
*     在战斗场景里，如果类型（type）是敌人，这个ID表示敌人队伍序号， 第一个是 0 ； 如果类型（type）是角色，这个ID表示角色队伍序号，第一个是 0 。
* type : 类型（事件/敌人 或 角色） 写 1 表示角色， 不写表示 事件或敌人 。
*
*/
//=================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.bd = XdRsData.bd || {};
//=================================================================================================
// 气泡对话框只在 地图 与 战斗 场景有效。
SceneManager.isBubbleEffectiveScene = function() {
    if (!this._scene) return false;
    return this._scene.constructor === Scene_Map ||
    this._scene.constructor === Scene_Battle;
};
// 代入游戏数据对象(Game_battle 或 Game_Character) 获取其对应的精灵对象(Sprite_Battler 或 Sprite_Character)。
SceneManager.getBubbleTargetSprite = function(target) {
    if (!target || !this.isBubbleEffectiveScene()) return null;
    return this._scene._spriteset.findTargetSprite(target);
};
//=================================================================================================
XdRsData.bd.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    XdRsData.bd.Game_Message_clear.call(this);
    this._bubbleSprite = null;
};
// 获取对话文本里备注的气泡框显示对象。
Game_Message.prototype.getBubbleTarget = function(text) {
    if (text.match(/<XrBD:(\S+)>/)) {
        const arr = RegExp.$1.split(',').map(n => parseInt(n));
        const id = arr[0], type = arr[1];
        if ($gameParty.inBattle()) {
            return type ? $gameParty.members()[id] : $gameTroop.members()[id];
        }
        return type ? $gamePlayer.getBubbleDialogTarget(id) : $gameMap.event(id);
    }
    return null;
};
// 记录气泡窗口显示的对象精灵，并将气泡备注替换掉。
Game_Message.prototype.setupBubbleSprite = function(text) {
    if (!this._bubbleSprite) {
        const target = this.getBubbleTarget(text);
        this._bubbleSprite = SceneManager.getBubbleTargetSprite(target);
    }
    return text.replace(/<XrBD:(\S+)>/g, '');
};
// 气泡窗口显示的对象精灵。
Game_Message.prototype.bubbleSprite = function() {
    return this._bubbleSprite;
};
// 添加文本前，记录气泡窗口显示的对象精灵。
XdRsData.bd.Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
    text = this.setupBubbleSprite(text);
    XdRsData.bd.Game_Message_add.call(this, text);
};
//=================================================================================================
// 以 index 为序，获取气泡框显示的对应角色对象。
Game_Player.prototype.getBubbleDialogTarget = function(index) {
    if (index === 0) return this;
    return this._followers.data()[index - 1];
};
//=================================================================================================
// 记忆一个默认对话框的 rect 。
XdRsData.bd.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(rect) {
    this._mnemonicRect = rect;
    XdRsData.bd.Window_Message_initialize.call(this, rect);
};
// 判断是否是气泡状态。
Window_Message.prototype.isBubbleState = function() {
    return !!$gameMessage.bubbleSprite();
};
// 开始前，设置对话窗口样式。
XdRsData.bd.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this.resetWindowStyle();
    XdRsData.bd.Window_Message_startMessage.call(this);
};
// 重新设置对话窗口样式。
Window_Message.prototype.resetWindowStyle = function() {
    this._isBattleSprite = false;
    const sprite = $gameMessage.bubbleSprite();
    if (sprite) {
        this._isBattleSprite = (sprite instanceof Sprite_Battler);
    }
    this.isBubbleState() ? this.changeToBubble() : this.changeToOrdinary();
    this.resetPauseSign();
};
// 改变成气泡样式。
Window_Message.prototype.changeToBubble = function() {
    const text = $gameMessage.allText();
    const data = this.textSizeEx(text);
    const spacing = 20;
    const pd = $gameSystem.windowPadding();
    const faceWidth = ImageManager.faceWidth;
    const fw = $gameMessage.faceName() ? faceWidth + spacing : 4;
    this.width = data.width + fw + pd * 2;
    this.height = data.height + pd * 2;
    this.createContents();
};
// 改变成默认的普通样式。
Window_Message.prototype.changeToOrdinary = function() {
    const rect = this._mnemonicRect;
    if (this.width !== rect.width || this.height !== rect.height) {
        this.width  = rect.width;
        this.height = rect.height;
        this.x = rect.x;
        this.createContents();
    }
};
// 再设置暂停标志的位置 （气泡样式时,当成箭头用 O.O）。
Window_Message.prototype.resetPauseSign = function() {
    const height = this._pauseSignSprite.height;
    const py = this.height + (this.isBubbleState() ? height : 0);
    this._pauseSignSprite.move(this._width / 2, py);
};
// 在气泡样式时，有头像时用 Sprite 显示。
XdRsData.bd.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
    if (this.isBubbleState()) this.setupBubbleFace();
    else XdRsData.bd.Window_Message_drawMessageFace.call(this);
    this.resetNameBoxPosition();
};
// 设置气泡样式时的头像精灵。 
Window_Message.prototype.setupBubbleFace = function() {
    !this._bubbleFace && this.createBubbleFace();
    const name = $gameMessage.faceName();
    const index = $gameMessage.faceIndex();
    const rw = ImageManager.faceWidth, rh = ImageManager.faceHeight;
    const rx = (index % 4) * rw, ry = Math.floor(index / 4) * rh;
    this._bubbleFace.bitmap = ImageManager.loadFace(name);
    this._bubbleFace.setFrame(rx, ry, rw, rh);
    this._bubbleFace.x = $gameSystem.windowPadding();
    this._bubbleFace.y = this.height - rh - $gameSystem.windowPadding();
    this._bubbleFace.show();
};
// 生成气泡样式时的头像精灵。 
Window_Message.prototype.createBubbleFace = function() {
    this._bubbleFace = new Sprite();
    this.addChild(this._bubbleFace);
};
// 当气泡样式时，再设置名字窗口的位置，并且显示名字窗口。
Window_Message.prototype.resetNameBoxPosition = function() {
    if (this.isBubbleState()) {
        this.updateBubblePosition();  // 先刷新一下，定位窗口位置后，再设置名字窗口的位置。
        const x = $gameMessage.faceName() ? this._bubbleFace.x + this._bubbleFace.width : 0;
        this._nameBoxWindow.x = this.x + x + 4;
        this._nameBoxWindow.y = this.y - this._nameBoxWindow.height;
    }
    this._nameBoxWindow.show();
};
// 结束时，隐藏头像精灵。
XdRsData.bd.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    XdRsData.bd.Window_Message_terminateMessage.call(this);
    this._bubbleFace && this._bubbleFace.hide();
};
// 添加气泡状态时的位置刷新。
XdRsData.bd.Window_Message_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
    XdRsData.bd.Window_Message_update.call(this);
    this.updateBubblePosition();
};
// 在 再设置名字窗口的位置 前，先将名字窗口隐藏，以免出现 名字窗口 出现在 以前位置 ，而后立马跳到 当前位置 的状况。
XdRsData.bd.Window_Message_updateSpeakerName = Window_Message.prototype.updateSpeakerName;
Window_Message.prototype.updateSpeakerName = function() {
    XdRsData.bd.Window_Message_updateSpeakerName.call(this);
    this._nameBoxWindow.hide();
};
// 刷新气泡状态时的位置。
Window_Message.prototype.updateBubblePosition = function() {
    if (!this.visible || !this.isBubbleState()) return;
    const sprite = $gameMessage.bubbleSprite();
    const spacing = this._isBattleSprite ? 48 : 24;
    this.x = sprite.x - this.width / 2 - 4;
    this.y = sprite.y - sprite.height - this.height - spacing;
};
//=================================================================================================
// end
//=================================================================================================
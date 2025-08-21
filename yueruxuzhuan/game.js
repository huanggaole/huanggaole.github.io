// RPG游戏框架主文件


class RPGGame {
    constructor() {
        this.currentScene = 'main-menu';
        this.configManager = new ConfigManager();
        this.audioManager = new AudioManager();
        this.saveManager = new SaveManager(this);
        this.currentStoryId = null;  // 当前剧情ID
        this.gameData = {
            player: {
                name: '林月如',
                level: 1,
                exp: 0
            },
            story: {
                currentChapter: 0,
                currentDialog: 0
            },
            party: [
                { name: '林月如' }
            ],
            flags: {}
        };
        this.currentStory = null;
        this.currentMap = null;
        this.currentDialogData = null;
        this.init();
    }

    async init() {
        try {
            // 显示加载界面
            this.showLoadingScreen();

            // 加载主配置
            await this.configManager.loadMainConfig();



            // 设置事件监听器
            this.setupEventListeners();

            // 隐藏加载界面，显示主菜单
            this.hideLoadingScreen();
            this.showScene('main-menu');

            console.log('游戏初始化完成');
        } catch (error) {
            console.error('游戏初始化失败:', error);
            this.showErrorScreen('游戏加载失败，请刷新页面重试。');
        }
    }

    showLoadingScreen() {
        // 创建加载界面
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-screen';
        loadingDiv.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex; justify-content: center; align-items: center;
                        z-index: 9999; color: white; font-size: 1.5rem;">
                <div style="text-align: center;">
                    <div>月如续传</div>
                    <div style="margin-top: 1rem; font-size: 1rem;">加载中...</div>
                </div>
            </div>
        `;
        document.body.appendChild(loadingDiv);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    }

    showErrorScreen(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: #e74c3c; display: flex; justify-content: center;
                        align-items: center; z-index: 9999; color: white; font-size: 1.2rem;">
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">错误</div>
                    <div>${message}</div>
                </div>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    setupEventListeners() {
        // 主菜单事件
        document.getElementById('new-game-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('continue-game-btn').addEventListener('click', () => this.continueGame());
        document.getElementById('exit-game-btn').addEventListener('click', () => this.exitGame());

        // 情节场景事件
        document.getElementById('story-next-btn').addEventListener('click', () => this.nextStoryDialog());
        document.getElementById('story-skip-btn').addEventListener('click', () => this.skipStory());

        // 地图场景事件将在renderMap中动态添加



        // 对话框事件
        document.getElementById('dialog-next-btn').addEventListener('click', () => this.nextDialog());
        document.getElementById('dialog-close-btn').addEventListener('click', () => this.closeDialog());

        // UI按钮事件
        document.getElementById('save-btn').addEventListener('click', () => this.saveGame());
        document.getElementById('load-btn').addEventListener('click', () => this.loadGame());
        document.getElementById('music-btn').addEventListener('click', () => this.toggleMusic());
        document.getElementById('party-btn').addEventListener('click', () => this.openParty());
        document.getElementById('main-menu-btn').addEventListener('click', () => this.returnToMainMenu());
    }

    showScene(sceneName) {
        // 隐藏所有场景
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.remove('active');
        });

        // 显示指定场景
        const targetScene = document.getElementById(sceneName);
        if (targetScene) {
            targetScene.classList.add('active');
            this.currentScene = sceneName;
        }

        // 根据场景显示/隐藏游戏UI
        const gameUI = document.getElementById('game-ui');
        if (sceneName === 'main-menu') {
            gameUI.classList.add('hidden');
            // 播放主菜单背景音乐
            this.audioManager.playBGM('music/005云谷鹤峰.ogg');
        } else {
            gameUI.classList.remove('hidden');
            this.updateUI();
        }
    }

    updateUI() {
        // 更新地图名称显示
        const mapNameElement = document.getElementById('current-map-name');
        if (mapNameElement && this.currentMap) {
            mapNameElement.textContent = this.currentMap.name;
        }
    }



    addNPCToCurrentMap(npcId) {
        // 定义可添加的NPC
        const availableNPCs = {
            'tianguihuang': {
                id: "tianguihuang",
                name: "天鬼皇",
                type: "npc",
                position: { x: "45%", y: "70%" },
                style: {
                    width: "80px",
                    height: "35px",
                    backgroundColor: "#4B0082",
                    color: "#FFD700",
                    borderRadius: "8px",
                    border: "3px solid #FFD700",
                    fontWeight: "bold"
                },
                onClick: { action: "startDialog", target: "tianguihuang" },
                dialogFile: "ghost_gate",
                description: "神秘的天鬼皇"
            }
        };

        const npc = availableNPCs[npcId];
        if (npc && this.currentMap) {
            // 检查NPC是否已存在
            const existingNPC = this.currentMap.npcs.find(n => n.id === npcId);
            if (!existingNPC) {
                this.currentMap.npcs.push(npc);

                // 立即渲染新NPC
                const mapBackground = document.getElementById('map-background');
                const npcsContainer = mapBackground.querySelector('.map-npcs');
                const btn = this.createMapButton(npc);
                npcsContainer.appendChild(btn);

                console.log(`${npc.name} 已添加到地图中`);
                return true;
            }
        }
        return false;
    }

    addLocationToCurrentMap(locationId) {
        // 定义可添加的地点
        const availableLocations = {
            'ghost_entrance': {
                id: "ghost_entrance",
                name: "鬼界入口",
                type: "location",
                position: { x: "43%", y: "50%" },
                style: {
                    width: "110px",
                    height: "35px",
                    backgroundColor: "#ffffffff",
                    color: "#ff0000ff",
                    borderRadius: "8px",
                    border: "3px solid #ff0000ff",
                    fontWeight: "bold"
                },
                onClick: { action: "startStory", target: "chapter2" },
                unlocked: true,
                description: "通往鬼界的神秘入口"
            },
            'youdu': {
                id: "to_youdu",
                name: "幽都",
                type: "location",
                position: { x: "85%", y: "85%" },
                style: {
                    width: "80px",
                    height: "30px",
                    backgroundColor: "#2F2F2F",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    border: "3px solid #8B0000",
                    fontSize: "0.9rem",
                    fontWeight: "bold"
                },
                onClick: { action: "endGame"},
                unlocked: true,
                description: "前往幽都"
            }
    };

        const location = availableLocations[locationId];
        if (location && this.currentMap) {
            // 检查地点是否已存在
            const existingLocation = this.currentMap.locations.find(l => l.id === locationId);
            if (!existingLocation) {
                this.currentMap.locations.push(location);

                // 立即渲染新地点
                const mapBackground = document.getElementById('map-background');
                const locationsContainer = mapBackground.querySelector('.map-locations');
                const btn = this.createMapButton(location);
                locationsContainer.appendChild(btn);

                // 更新savedMapStates
                this.updateMapState(this.currentMap.mapId);

                console.log(`${location.name} 已添加到地图中`);
                return true;
            }
        }
        return false;
    }

    async startNewGame() {
        console.log('开始新游戏');
        this.resetGameData();
        await this.showStory(this.configManager.config.startingStory);
    }

    async continueGame() {
        console.log('继续游戏');
        if (await this.saveManager.loadGame()) {
            // SaveManager已经处理了场景恢复，这里只需要更新UI
            this.updateUI();
        } else {
            alert('没有找到存档，将开始新游戏');
            await this.startNewGame();
        }
    }

    exitGame() {
        console.log('退出游戏');
        if (confirm('确定要退出游戏吗？')) {
            window.close();
        }
    }

    resetGameData() {
        this.gameData = {
            player: {
                name: '林月如',
                level: 1,
                exp: 0
            },
            story: {
                currentChapter: 0,
                currentDialog: 0
            },
            party: [
                { name: '林月如' }
            ],
            flags: {}
        };
    }

    async showStory(storyId) {
        try {
            this.currentStory = await this.configManager.loadStory(storyId);
            this.currentStoryId = storyId;  // 保存当前剧情ID
            this.gameData.story.currentDialog = 0;
            this.showScene('story-scene');
            this.displayStoryDialog();
        } catch (error) {
            console.error('加载剧情失败:', error);
            // 如果加载失败，直接进入地图
            await this.showMap(this.configManager.config.startingMap);
        }
    }

    displayStoryDialog() {
        if (!this.currentStory || !this.currentStory.dialogs) {
            this.skipStory();
            return;
        }

        const currentDialogIndex = this.gameData.story.currentDialog;
        const dialogText = this.currentStory.dialogs[currentDialogIndex];

        if (dialogText) {
            document.getElementById('story-text').textContent = dialogText;

            // 播放背景音乐（如果有且是第一段对话）
            if (currentDialogIndex === 0 && this.currentStory.backgroundMusic) {
                this.audioManager.playBGM(`music/${this.currentStory.backgroundMusic}`);
            }

            // 隐藏角色立绘（简化版本不需要）
            const characterPortrait = document.getElementById('story-character');
            if (characterPortrait) {
                characterPortrait.style.backgroundImage = 'none';
            }
        } else {
            // 故事结束
            this.completeStory();
        }
    }

    nextStoryDialog() {
        this.gameData.story.currentDialog++;
        this.displayStoryDialog();
    }

    async skipStory() {
        await this.showMap(this.configManager.config.startingMap);
    }

    async completeStory() {
        // 检查剧情是否有完成后的动作
        if (this.currentStory && this.currentStory.onComplete) {
            if (Array.isArray(this.currentStory.onComplete)) {
                // 如果onComplete是数组，依次执行所有动作
                for (const action of this.currentStory.onComplete) {
                    await this.executeAction(action);
                }
                // 执行完所有动作后，如果当前在地图场景，重新渲染地图
                if (this.currentScene === 'map-scene') {
                    this.renderMap();
                }
            } else {
                // 如果onComplete是单个动作
                await this.executeAction(this.currentStory.onComplete);
            }
        } else {
            // 默认行为：进入地图
            await this.showMap(this.configManager.config.startingMap);
        }
    }

    async showMap(mapId) {
        try {
            this.currentMap = await this.configManager.loadMap(mapId);

            // 确保动态元素已经恢复到地图中
            this.ensureDynamicElementsRestored(mapId);

            // 应用保存的地图状态
            this.applyMapState(mapId);

            this.showScene('map-scene');
            this.renderMap();

            // 检查是否有onEnter事件
            if (this.currentMap.onEnter) {
                // 延迟执行onEnter事件，确保地图已经渲染完成
                setTimeout(() => {
                    this.executeAction(this.currentMap.onEnter);
                }, 500);
            }
        } catch (error) {
            console.error('加载地图失败:', error);
            this.showErrorScreen('地图加载失败');
        }
    }

    ensureDynamicElementsRestored(mapId) {
        // 恢复保存在dynamicMapElements中的动态元素
        if (this.gameData.dynamicMapElements && this.gameData.dynamicMapElements[mapId]) {
            const dynamicElements = this.gameData.dynamicMapElements[mapId];

            // 恢复动态地点
            if (dynamicElements.locations) {
                dynamicElements.locations.forEach(location => {
                    const exists = this.currentMap.locations.some(loc => loc.id === location.id);
                    if (!exists) {
                        this.currentMap.locations.push(location);
                        console.log(`恢复动态地点: ${location.name}`);
                    }
                });
            }

            // 恢复动态NPC
            if (dynamicElements.npcs) {
                dynamicElements.npcs.forEach(npc => {
                    const exists = this.currentMap.npcs.some(existingNpc => existingNpc.id === npc.id);
                    if (!exists) {
                        this.currentMap.npcs.push(npc);
                        console.log(`恢复动态NPC: ${npc.name}`);
                    }
                });
            }
        }

        // 根据游戏标志位确保特定动态元素存在
        if (mapId === 'ghost_gate') {
            // 如果已经完成了牛头马面的对话，确保天鬼皇存在
            if (this.gameData.flags['ghost_gate_main_dialog_complete']) {
                const hasTimGuiHuang = this.currentMap.npcs.some(npc => npc.id === 'tianguihuang');
                if (!hasTimGuiHuang) {
                    this.addNPCToCurrentMap('tianguihuang');
                }
            }

            // 如果已经完成了天鬼皇的对话，确保鬼界入口存在
            if (this.gameData.flags['tianguihuang_main_dialog_complete']) {
                const hasGhostEntrance = this.currentMap.locations.some(loc => loc.id === 'ghost_entrance');
                if (!hasGhostEntrance) {
                    this.addLocationToCurrentMap('ghost_entrance');
                }
            }
        }
    }

    renderMap() {
        if (!this.currentMap) return;

        const mapBackground = document.getElementById('map-background');
        const locationsContainer = mapBackground.querySelector('.map-locations');
        const npcsContainer = mapBackground.querySelector('.map-npcs');

        // 清空现有内容
        locationsContainer.innerHTML = '';
        npcsContainer.innerHTML = '';

        // 清除之前的geometricElements
        const existingGeometricElements = mapBackground.querySelectorAll('.geometric-element');
        existingGeometricElements.forEach(element => element.remove());

        // 设置背景
        if (this.currentMap.backgroundImage) {
            mapBackground.style.backgroundImage = `url('assets/maps/${this.currentMap.backgroundImage}')`;
        }

        // 设置背景颜色
        if (this.currentMap.backgroundColor) {
            mapBackground.style.backgroundColor = this.currentMap.backgroundColor;
        } else {
            // 如果没有设置背景颜色，使用默认颜色
            mapBackground.style.backgroundColor = '#228B22';
        }

        // 播放地图背景音乐
        if (this.currentMap.backgroundMusic) {
            this.audioManager.playBGM(`music/${this.currentMap.backgroundMusic}`);
        }

        // 渲染几何图形元素
        if (this.currentMap.geometricElements) {
            this.renderGeometricElements(mapBackground);
        }

        // 渲染地点
        this.currentMap.locations.forEach(location => {
            if (this.isLocationUnlocked(location)) {
                const btn = this.createMapButton(location);
                locationsContainer.appendChild(btn);
            }
        });

        // 渲染NPC
        this.currentMap.npcs.forEach(npc => {
            const btn = this.createMapButton(npc);
            npcsContainer.appendChild(btn);
        });

        // 检查是否需要自动触发对话
        if (this.currentMap.autoTriggerDialog && !this.gameData.flags[`${this.currentMap.mapId}_auto_dialog_triggered`]) {
            setTimeout(() => {
                this.triggerAutoDialog();
            }, 500);
        }
    }

    renderGeometricElements(container) {
        this.currentMap.geometricElements.forEach((element) => {
            const div = document.createElement('div');
            div.className = `geometric-element geometric-${element.type}`;
            div.style.position = 'absolute';
            div.style.top = element.position.y;
            div.style.left = element.position.x;

            if (element.size) {
                if (element.size.width !== "0") div.style.width = element.size.width;
                if (element.size.height !== "0") div.style.height = element.size.height;
            }

            Object.assign(div.style, element.style);

            container.appendChild(div);
        });
    }

    async triggerAutoDialog() {
        const autoDialog = this.currentMap.autoTriggerDialog;

        if (autoDialog) {
            // 标记已触发，避免重复触发
            this.gameData.flags[`${this.currentMap.mapId}_auto_dialog_triggered`] = true;

            // 触发对话
            await this.startDialog(autoDialog.npcId, autoDialog.dialogFile);
        }
    }

    createMapButton(element) {
        const btn = document.createElement('button');
        btn.textContent = element.name;
        btn.className = element.type === 'location' ? 'location-btn' : 'npc-btn';
        btn.dataset.elementId = element.id;

        // 设置位置
        btn.style.position = 'absolute';
        btn.style.top = element.position.y;
        btn.style.left = element.position.x;

        // 应用自定义样式
        if (element.style) {
            Object.assign(btn.style, element.style);
        }

        // 添加点击事件
        btn.addEventListener('click', () => {
            // 如果是NPC对话，需要传递dialogFile信息
            if (element.onClick.action === 'startDialog' && element.dialogFile) {
                const actionWithDialogFile = {
                    ...element.onClick,
                    dialogFile: element.dialogFile
                };
                this.executeAction(actionWithDialogFile);
            } else {
                this.executeAction(element.onClick);
            }
        });

        // 添加悬停提示
        if (element.description) {
            btn.title = element.description;
        }

        return btn;
    }

    isLocationUnlocked(location) {
        if (location.unlocked === undefined || location.unlocked === true) {
            return true;
        }

        if (location.unlockCondition) {
            const condition = location.unlockCondition;
            return this.gameData.flags[condition.flag] === condition.value;
        }

        return false;
    }

    async executeAction(action) {
        if (!action) return;

        switch (action.action) {
            case 'switchToMap':
                await this.showMap(action.target);
                break;
            case 'startDialog':
                await this.startDialog(action.target, action.dialogFile);
                break;

            case 'startStory':
                await this.showStory(action.target);
                break;
            case 'setFlag':
                this.gameData.flags[action.flagName] = action.flagValue;
                break;
            case 'closeDialog':
                this.closeDialog();
                break;
            case 'addPartyMember':
                this.addPartyMember(action.memberName);
                console.log(`${action.memberName} 加入了队伍！`);
                break;
            case 'removePartyMember':
                this.removePartyMember(action.memberName);
                break;
            case 'removeNPC':
                this.removeNPCFromCurrentMap(action.npcId);
                break;
            case 'addLocation':
                this.addLocationToCurrentMap(action.locationId);
                break;
            case 'showAutoMessage':
                this.showAutoMessage(action.speaker, action.text, action.buttonText);
                break;
            case 'endGame':
                this.showEndScreen();
                break;
            default:
                console.log('未知动作:', action);
        }
    }

    async startDialog(npcId, dialogFile) {
        try {
            // 使用地图配置中的对话文件，如果没有指定则使用默认的npcs
            const fileName = dialogFile || 'npcs';
            this.currentDialogData = this.configManager.loadDialogs(fileName);

            if (this.currentDialogData && this.currentDialogData[npcId]) {
                this.currentNpcId = npcId;

                // 检查是否是牛头或马面，且已经完成过完整对话
                if ((npcId === 'niutou' || npcId === 'mamian') && this.gameData.flags['ghost_gate_main_dialog_complete']) {
                    this.currentDialogId = 'simple_explanation';
                } else if (npcId === 'tianguihuang' && this.gameData.flags['tianguihuang_main_dialog_complete']) {
                    // 天鬼皇完成主要对话后的简化对话
                    this.currentDialogId = 'simple_reminder';
                } else {
                    this.currentDialogId = 'greeting'; // 默认从greeting开始
                }

                this.displayDialog();
            } else {
                console.error(`找不到NPC ${npcId} 的对话数据`);
            }
        } catch (error) {
            console.error('加载对话失败:', error);
        }
    }

    displayDialog() {
        if (!this.currentDialogData || !this.currentNpcId) return;

        const npcData = this.currentDialogData[this.currentNpcId];
        const dialog = npcData.dialogs.find(d => d.id === this.currentDialogId);

        if (!dialog) {
            this.closeDialog();
            return;
        }

        const dialogBox = document.getElementById('dialog-box');

        // 使用对话中指定的说话人，如果没有则使用NPC名称
        const speakerName = dialog.speaker || npcData.name;
        document.getElementById('dialog-speaker').textContent = speakerName;
        document.getElementById('dialog-text').textContent = dialog.text;

        // 清空现有的选项按钮
        const dialogControls = document.querySelector('.dialog-controls');
        dialogControls.innerHTML = '';

        // 创建选项按钮
        if (dialog.options && dialog.options.length > 0) {
            dialog.options.forEach((option) => {
                const btn = document.createElement('button');
                btn.textContent = option.text;
                btn.className = 'dialog-btn';
                btn.addEventListener('click', () => this.selectDialogOption(option));
                dialogControls.appendChild(btn);
            });
        } else {
            // 如果没有选项，显示关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭';
            closeBtn.className = 'dialog-btn';
            closeBtn.addEventListener('click', () => this.closeDialog());
            dialogControls.appendChild(closeBtn);
        }

        dialogBox.classList.remove('hidden');
    }

    async selectDialogOption(option) {
        // 执行选项的动作
        if (option.action && option.action !== 'none') {
            await this.executeDialogAction(option);
        }

        // 跳转到下一个对话
        if (option.nextDialog) {
            this.currentDialogId = option.nextDialog;
            this.displayDialog();
        } else {
            this.closeDialog();
        }
    }

    async executeDialogAction(option) {
        switch (option.action) {
            case 'setFlag':
                this.gameData.flags[option.flagName] = option.flagValue;
                console.log(`设置标志位: ${option.flagName} = ${option.flagValue}`);
                break;
            case 'buyItem':
                if (this.gameData.gold >= option.price) {
                    this.gameData.gold -= option.price;
                    // 这里可以添加物品到背包的逻辑
                    console.log(`购买物品: ${option.itemId}, 花费: ${option.price}`);
                } else {
                    alert('金币不足！');
                }
                break;
            case 'learnSkill':
                // 给主角学习技能
                const mainCharacter = this.gameData.party[0];
                if (!mainCharacter.skills.includes(option.skillId)) {
                    mainCharacter.skills.push(option.skillId);
                    console.log(`学会技能: ${option.skillId}`);
                }
                break;

            case 'addNPC':
                this.addNPCToCurrentMap(option.npcId);
                break;
            case 'addLocation':
                this.addLocationToCurrentMap(option.locationId);
                break;
            case 'addPartyMember':
                this.addPartyMember(option.memberName);
                this.showDialog('系统', `${option.memberName} 加入了队伍！`);
                break;
            case 'openShop':
                console.log('打开商店界面');
                // 这里可以实现商店界面
                break;
            case 'closeDialog':
                this.closeDialog();
                break;
            case 'startStory':
                await this.showStory(option.target);
                break;
            case 'collectItem':
                this.collectItem(option.itemId);
                break;
        }
    }

    collectItem(itemId) {
        console.log(`收集物品: ${itemId}`);

        // 设置收集标志
        this.gameData.flags[`collected_${itemId}`] = true;

        // 从当前地图移除该NPC
        if (this.currentMap && this.currentMap.npcs) {
            const npcIndex = this.currentMap.npcs.findIndex(npc => npc.id === itemId);
            if (npcIndex !== -1) {
                this.currentMap.npcs.splice(npcIndex, 1);
                console.log(`移除NPC: ${itemId}`);
            }
        }

        // 检查奈河畔的特殊逻辑
        if (this.currentMap && this.currentMap.mapId === 'ghost_naihe') {
            this.checkNaiheItems();
        }

        // 重新渲染地图
        this.renderMap();

        // 关闭对话框
        this.closeDialog();
    }

    checkNaiheItems() {
        // 检查是否收集了槐树皮和忘忧草
        const hasHuaiShuPi = this.gameData.flags['collected_huai_shu_pi'];
        const hasWangYouCao = this.gameData.flags['collected_wang_you_cao'];

        if (hasHuaiShuPi && hasWangYouCao) {
            // 两个物品都收集了，添加传送点
            const hasTransferPoint = this.currentMap.locations.some(loc => loc.id === 'to_ghost_shushan');
            if (!hasTransferPoint) {
                const transferLocation = {
                    id: "to_ghost_shushan",
                    name: "鬼界蜀山",
                    type: "location",
                    position: { x: "50%", y: "10%" },
                    style: {
                        width: "100px",
                        height: "30px",
                        backgroundColor: "#4169E1",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        border: "3px solid #0000FF",
                        fontSize: "0.9rem",
                        fontWeight: "bold"
                    },
                    onClick: { action: "startStory", target: "chapter4" },
                    unlocked: true,
                    description: "返回鬼界蜀山"
                };

                this.currentMap.locations.push(transferLocation);
                console.log('奈河畔传送点已激活');
            }
        }
    }

    showDialog(speaker, text) {
        const dialogBox = document.getElementById('dialog-box');
        document.getElementById('dialog-speaker').textContent = speaker;
        document.getElementById('dialog-text').textContent = text;

        // 清空控制按钮并添加关闭按钮
        const dialogControls = document.querySelector('.dialog-controls');
        dialogControls.innerHTML = '';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '关闭';
        closeBtn.className = 'dialog-btn';
        closeBtn.addEventListener('click', () => this.closeDialog());
        dialogControls.appendChild(closeBtn);

        dialogBox.classList.remove('hidden');
    }

    nextDialog() {
        // 这里可以实现多段对话逻辑
        this.closeDialog();
    }

    closeDialog() {
        document.getElementById('dialog-box').classList.add('hidden');
        this.currentDialogData = null;
        this.currentNpcId = null;
        this.currentDialogId = null;
    }
    // 保存游戏
    saveGame() {
        console.log('保存游戏');
        if (this.saveManager.saveGame()) {
            alert('游戏已保存！');
        } else {
            alert('保存失败！');
        }
    }

    // 加载游戏
    async loadGame() {
        console.log('加载游戏');
        if (await this.saveManager.loadGame()) {
            alert('游戏已加载！');
            // SaveManager已经处理了场景恢复，这里只需要更新UI
            this.updateUI();
        } else {
            alert('没有找到存档！');
        }
    }

    // 音乐开关
    toggleMusic() {
        console.log('切换音乐');
        const isMuted = this.audioManager.toggleMute();
        alert(isMuted ? '音乐已关闭' : '音乐已开启');
    }

    openParty() {
        console.log('打开队伍');
        // 创建一个更好的队伍信息显示
        this.showPartyInfo();
    }

    // 添加队伍成员
    addPartyMember(name) {
        // 检查是否已经存在
        if (!this.gameData.party.some(member => member.name === name)) {
            this.gameData.party.push({ name: name });
            console.log(`${name} 加入了队伍！`);
        }
    }

    // 移除队伍成员
    removePartyMember(name) {
        const index = this.gameData.party.findIndex(member => member.name === name);
        if (index !== -1) {
            this.gameData.party.splice(index, 1);
            console.log(`${name} 离开了队伍！`);
        }
    }

    removeNPCFromCurrentMap(npcId) {
        if (this.currentMap && this.currentMap.npcs) {
            const npcIndex = this.currentMap.npcs.findIndex(npc => npc.id === npcId);
            if (npcIndex !== -1) {
                this.currentMap.npcs.splice(npcIndex, 1);
                console.log(`NPC ${npcId} 已从地图移除`);

                // 更新savedMapStates
                this.updateMapState(this.currentMap.mapId);

                // 立即重新渲染地图
                if (this.currentScene === 'map-scene') {
                    this.renderMap();
                }
                return true;
            }
        }
        return false;
    }

    updateMapState(mapId) {
        // 初始化savedMapStates如果不存在
        if (!this.savedMapStates) {
            this.savedMapStates = {};
        }

        // 更新当前地图的状态
        if (this.currentMap && this.currentMap.mapId === mapId) {
            this.savedMapStates[mapId] = {
                npcs: [...this.currentMap.npcs],
                locations: [...this.currentMap.locations]
            };
            console.log(`更新地图 ${mapId} 的状态:`, this.savedMapStates[mapId]);
        }
    }

    applyMapState(mapId) {
        // 如果有保存的地图状态，应用它们
        if (this.savedMapStates && this.savedMapStates[mapId]) {
            const savedState = this.savedMapStates[mapId];

            // 恢复NPC状态
            if (savedState.npcs) {
                this.currentMap.npcs = [...savedState.npcs];
                console.log(`应用地图 ${mapId} 的NPC状态:`, savedState.npcs);
            }

            // 恢复地点状态
            if (savedState.locations) {
                this.currentMap.locations = [...savedState.locations];
                console.log(`应用地图 ${mapId} 的地点状态:`, savedState.locations);
            }
        }
    }

    showAutoMessage(speaker, text, buttonText = "确定") {
        const dialogBox = document.getElementById('dialog-box');
        const speakerElement = document.getElementById('dialog-speaker');
        const textElement = document.getElementById('dialog-text');
        const optionsContainer = document.getElementById('dialog-options');

        speakerElement.textContent = speaker;
        textElement.textContent = text;

        // 创建单个关闭按钮
        optionsContainer.innerHTML = `
            <button class="dialog-option" onclick="game.closeDialog()">${buttonText}</button>
        `;

        dialogBox.classList.remove('hidden');
    }

    showEndScreen() {
        console.log('显示结束页面');
        this.showScene('end-scene');

        // 停止背景音乐
        if (this.audioManager) {
            this.audioManager.stopMusic();
        }
    }

    returnToMainMenu() {
        console.log('返回主菜单');
        this.showScene('main-menu');

        // 重置游戏状态
        this.currentMap = null;
        this.currentStory = null;
        this.currentStoryId = null;
        this.savedMapStates = {};
        this.gameData={};

        // 播放主菜单音乐
        if (this.audioManager) {
            this.audioManager.playMusic('001序曲.ogg');
        }
    }

    restartGame() {
        console.log('重新开始游戏');

        // 重置所有游戏数据
        this.gameData = {
            player: {
                name: '林月如',
                level: 1,
                exp: 0,
                hp: 100,
                maxHp: 100,
                mp: 50,
                maxMp: 50
            },
            story: {
                currentChapter: 0,
                currentDialog: 0
            },
            party: [
                { name: '林月如' }
            ],
            flags: {},
            dynamicMapElements: {}  // 重置动态地图元素
        };

        // 清理保存的地图状态
        this.savedMapStates = {};

        // 重置游戏状态
        this.currentMap = null;
        this.currentStory = null;
        this.currentStoryId = null;

        // 开始新游戏
        this.startNewGame();
    }

    showPartyInfo() {
        // 创建队伍信息弹窗
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #2c3e50, #34495e);
            border: 2px solid #FFD700;
            border-radius: 15px;
            padding: 2rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            color: white;
        `;

        let html = '<h2 style="text-align: center; color: #FFD700; margin-bottom: 1.5rem;">队伍成员</h2>';

        this.gameData.party.forEach((member) => {
            html += `
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; margin-bottom: 1rem; border-radius: 8px; text-align: center;">
                    <h3 style="color: #FFD700; margin: 0;">${member.name}</h3>
                </div>
            `;
        });

        html += `
            <div style="text-align: center; margin-top: 1rem;">
                <button id="close-party-info" style="padding: 0.5rem 2rem; background: #e74c3c; border: none; color: white; border-radius: 5px; cursor: pointer; font-size: 1rem;">关闭</button>
            </div>
        `;

        content.innerHTML = html;
        modal.appendChild(content);
        document.body.appendChild(modal);

        // 添加关闭事件
        document.getElementById('close-party-info').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new RPGGame();
});

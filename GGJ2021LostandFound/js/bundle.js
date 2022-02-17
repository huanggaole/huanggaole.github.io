(function () {
    'use strict';

    class Item extends Laya.Script {
        onStart() {
            super.onStart();
            this.owner.on(Laya.Event.MOUSE_DOWN, this, () => { Item.selectedItem = this.owner; });
            this.rb = this.owner.getComponent(Laya.RigidBody);
        }
        onUpdate() {
            if (this.owner.y < 70 && this.owner.visible == true) {
                this.rb.gravityScale = 1.0;
            }
            else {
                this.rb.gravityScale = 0.0;
            }
        }
    }

    class Aid extends Laya.Script {
        onTriggerEnter(other) {
            for (let i = 0; i < Aid.aidItems.length; i++) {
                if (other.owner.name == Aid.aidItems[i]) {
                    for (let j = 0; j < Customer.CustomerList.length; j++) {
                        if (Customer.CustomerList[j].searchfor == other.owner.name) {
                            Customer.CustomerList[j].destroy();
                            console.log("after:" + Customer.CustomerList);
                        }
                    }
                    Aid.aidItems = Aid.aidItems.filter(item => item != Aid.aidItems[i]);
                    other.owner.destroy();
                    Item.selectedItem = null;
                    break;
                }
            }
        }
    }
    Aid.aidItems = [];

    var Customer_Status;
    (function (Customer_Status) {
        Customer_Status[Customer_Status["Walkin"] = 0] = "Walkin";
        Customer_Status[Customer_Status["Lining"] = 1] = "Lining";
        Customer_Status[Customer_Status["Waiting"] = 2] = "Waiting";
        Customer_Status[Customer_Status["Leaving"] = 3] = "Leaving";
    })(Customer_Status || (Customer_Status = {}));
    class Customer extends Laya.Sprite {
        constructor(_main) {
            super();
            this.main = _main;
            this.x = 240;
            let box = this.addComponent(Laya.BoxCollider);
            let rb = this.addComponent(Laya.RigidBody);
            box.width = this.width = 150;
            this.height = 150;
            box.height = 150;
            box.x = 0;
            box.y = 0;
            let rdmitem = Math.floor(Math.random() * this.main.loseItems.length);
            this.searchfor = this.main.loseItems[rdmitem];
            let searchsprite = this.main.getChildByName(this.searchfor);
            this.main.loseItems = this.main.loseItems.filter(item => item != this.searchfor);
            this.timeleft = 20;
            this.timeleftlbl = new Laya.Label();
            this.lostItemsp = new Laya.Sprite();
            this.lostItemsp.width = 50;
            this.lostItemsp.height = 50;
            this.lostItemsp.texture = searchsprite.texture;
            this.timeleftlbl.text = "patience：" + this.timeleft;
            this.timeleftlbl.y = 0;
            this.timeleftlbl.x = 60;
            this.lostItemsp.y = 0;
            this.addChild(this.timeleftlbl);
            this.addChild(this.lostItemsp);
            this.status = Customer_Status.Walkin;
            Customer.CustomerList.push(this);
        }
        destroy() {
            Aid.aidItems = Aid.aidItems.filter(item => item != this.searchfor);
            super.destroy();
            Customer.CustomerList = Customer.CustomerList.filter(item => item != this);
            this.main.updateScore(this.timeleft);
        }
        onAwake() {
            let rnd = Math.floor(Math.random() * 7 + 1);
            this.loadImage("comp/customer" + rnd + ".png");
            this.timer.loop(500, this, () => {
                this.timeleft -= 1;
                this.timeleftlbl.text = "patience：" + this.timeleft;
                if (this.timeleft <= 0) {
                    this.timer.clearAll(this);
                    this.main.updateHP(-1);
                    this.main.loseItems.push(this.searchfor);
                    this.destroy();
                }
            });
        }
    }
    Customer.CustomerList = [];

    class GameScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("GameScene.scene");
        }
        createCustomer() {
            const cust = new Customer(this);
            this.addChild(cust);
            if (this.waitItems.length > 0) {
                let rnditem = Math.floor(Math.random() * this.waitItems.length);
                let newitem = this.waitItems[rnditem];
                this.waitItems = this.waitItems.filter(item => item != newitem);
                let item = this.getChildByName(newitem);
                this.loseItems.push(newitem);
                console.log(item);
                item.x = 842;
                item.y = -200;
            }
        }
        onMouseDown() {
            if (Item.selectedItem != null) {
                this.ifCanmove = true;
                this.lastx = Laya.stage.mouseX;
                this.lasty = Laya.stage.mouseY;
            }
        }
        onMouseUp() {
            this.ifCanmove = false;
            if (Item.selectedItem != null) {
                let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody);
                rigidbody.setVelocity({ x: 0, y: 0 });
            }
            Item.selectedItem = null;
        }
        updateHP(changevalue) {
            this.HPvalue += changevalue;
            this.HP.text = "HP: " + this.HPvalue;
            if (this.HPvalue <= 0) {
                alert("动作太慢被顾客投诉啦！游戏失败！\nYou are too slow that many customers have complained, you lose the game!");
                this.timer.clearAll(this);
                this.destroy();
            }
        }
        updateScore(changevalue) {
            this.Scorevalue += changevalue;
            this.score.value = this.Scorevalue + "";
        }
        onAwake() {
            this.loseItems = ["bag", "cup", "plug", "handbag", "coat", "luggage", "card", "umbrella"];
            this.waitItems = ["bag2", "bag3", "card2", "cup2", "cup3", "coat2", "coat3", "handbag2", "handbag3", "luggage2", "luggage3", "luggage4", "umbrella2", "umbrella3", "umbrella4"];
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Laya.Event.MOUSE_MOVE, this, () => {
                if (this.ifCanmove) {
                    if (Item.selectedItem != null) {
                        let dx = Laya.stage.mouseX - this.lastx;
                        let dy = Laya.stage.mouseY - this.lasty;
                        this.lastx = Laya.stage.mouseX;
                        this.lasty = Laya.stage.mouseY;
                        let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody);
                        rigidbody.setVelocity({ x: dx, y: dy });
                    }
                }
            });
            this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this.HPvalue = 3;
            this.Scorevalue = 0;
            this.updateHP(0);
            this.updateScore(0);
            this.timer.loop(1000, this, () => {
                if (this.loseItems.length == 0 && Customer.CustomerList.length == 0) {
                    alert("所有的失物都归还给失主了，真好！\n你本局游戏得分为：" + this.Scorevalue + "\n" +
                        "Well Done! All the lost things have found their owner!\n You got " + this.Scorevalue + " score in this game.");
                    this.timer.clearAll(this);
                    this.destroy();
                }
                if (this.loseItems.length == 0) {
                    return;
                }
                if (Customer.CustomerList.length == 0) {
                    this.createCustomer();
                }
                else if (Math.random() < 0.1) {
                    this.createCustomer();
                }
            });
        }
    }

    class StartScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("StartScene.scene");
        }
        onAwake() {
            this.startBtn.on(Laya.Event.CLICK, this, () => {
                const gs = new GameScene();
                Laya.stage.addChild(gs);
            });
            this.intro.text = "这里是某高铁站，春运期间有大量旅客会将物品落在列车上，我们每天都能收到大量来自各个列车的遗失物品。你的任务就是帮助我们，在来领遗失物品的乘客等得不耐烦开始打投诉电话之前，从仓库中把他们遗失的物品找到并及时拿出来还给他们。";
            this.intro.text += "\n\n";
            this.intro.text += "This is a railway station. During the Spring Festival, a large number of passengers will drop their belongings on the train. We can receive a large number of lost belongings from various trains every day. Your task is to help us find the lost items from the warehouse and return them to their owners before they ran out of their patience and start a complaint call.";
        }
    }

    class Table extends Laya.Script {
        onTriggerEnter(other) {
            Aid.aidItems.push(other.owner.searchfor);
            console.log(Aid.aidItems);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scene/StartScene.ts", StartScene);
            reg("scene/GameScene.ts", GameScene);
            reg("script/Aid.ts", Aid);
            reg("script/Table.ts", Table);
            reg("script/Item.ts", Item);
            reg("prefab/Customer.ts", Customer);
        }
    }
    GameConfig.width = 1136;
    GameConfig.height = 640;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "GameScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            const ss = new StartScene();
            Laya.stage.addChild(ss);
        }
    }
    new Main();

}());

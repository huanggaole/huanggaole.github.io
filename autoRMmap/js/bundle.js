(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class MathUtil {
        static random() {
            return Math.random();
        }
    }

    const Tilesetsdata = [
        null,
        { "id": 1, "mode": 0, "name": "世界", "note": "", "tilesetNames": ["World_A1", "World_A2", "", "", "", "World_B", "World_C", "", ""] },
        { "id": 2, "mode": 1, "name": "外观", "note": "", "tilesetNames": ["Outside_A1", "Outside_A2", "Outside_A3", "Outside_A4", "Outside_A5", "Outside_B", "Outside_C", "", ""] },
        { "id": 3, "mode": 1, "name": "内部", "note": "", "tilesetNames": ["Inside_A1", "Inside_A2", "", "Inside_A4", "Inside_A5", "Inside_B", "Inside_C", "", ""] },
        { "id": 4, "mode": 1, "name": "地下城", "note": "", "tilesetNames": ["Dungeon_A1", "Dungeon_A2", "", "Dungeon_A4", "Dungeon_A5", "Dungeon_B", "Dungeon_C", "", ""] },
        { "id": 5, "mode": 1, "name": "近未来外观", "note": "", "tilesetNames": ["Outside_A1", "Outside_A2", "SF_Outside_A3", "SF_Outside_A4", "SF_Outside_A5", "SF_Outside_B", "SF_Outside_C", "", ""] },
        { "id": 6, "mode": 1, "name": "近未来内部", "note": "", "tilesetNames": ["Inside_A1", "Inside_A2", "", "SF_Inside_A4", "SF_Outside_A5", "SF_Inside_B", "SF_Inside_C", "", ""] }
    ];
    class TilesManager {
        static get instance() {
            const index = Map.instance.tilesetId;
            if (!TilesManager._instance) {
                TilesManager._instance = new Array(7);
            }
            if (!TilesManager._instance[index]) {
                TilesManager._instance[index] = new TilesManager(index);
            }
            return TilesManager._instance[index];
        }
        constructor(_id) {
            this.finished = 0;
            this.id = _id;
            this.name = Tilesetsdata[_id]["name"];
            this.tiletextures = new Array(8192);
            if (Tilesetsdata[_id]["tilesetNames"][0] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][0] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.A1 = Laya.loader.getRes(fname);
                    this.analyseA1(this.A1);
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][1] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][1] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.A2 = Laya.loader.getRes(fname);
                    this.analyseA2(this.A2);
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][2] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][2] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.A3 = Laya.loader.getRes(fname);
                    this.analyseA3(this.A3);
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][3] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][3] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.A4 = Laya.loader.getRes(fname);
                    this.analyseA4(this.A4);
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][4] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][4] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.A5 = Laya.loader.getRes(fname);
                    for (let rows = 0; rows < 16; rows++) {
                        for (let cols = 0; cols < 16; cols++) {
                            this.tiletextures[rows * 8 + cols + 1536] = Laya.Texture.createFromTexture(this.A5, cols * 48, rows * 48, 47, 47);
                        }
                    }
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][5] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][5] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.B = Laya.loader.getRes(fname);
                    for (let rows = 0; rows < 16; rows++) {
                        for (let cols = 0; cols < 8; cols++) {
                            this.tiletextures[rows * 8 + cols] = Laya.Texture.createFromTexture(this.B, cols * 48, rows * 48, 48, 48);
                            this.tiletextures[rows * 8 + cols + 128] = Laya.Texture.createFromTexture(this.B, (8 + cols) * 48, rows * 48, 48, 48);
                        }
                    }
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][6] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][6] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.C = Laya.loader.getRes(fname);
                    for (let rows = 0; rows < 16; rows++) {
                        for (let cols = 0; cols < 8; cols++) {
                            this.tiletextures[rows * 8 + cols + 256] = Laya.Texture.createFromTexture(this.C, cols * 48, rows * 48, 48, 48);
                            this.tiletextures[rows * 8 + cols + 384] = Laya.Texture.createFromTexture(this.C, (8 + cols) * 48, rows * 48, 48, 48);
                        }
                    }
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][7] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][7] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.D = Laya.loader.getRes(fname);
                    for (let rows = 0; rows < 16; rows++) {
                        for (let cols = 0; cols < 8; cols++) {
                            this.tiletextures[rows * 8 + cols + 512] = Laya.Texture.createFromTexture(this.D, cols * 48, rows * 48, 48, 48);
                            this.tiletextures[rows * 8 + cols + 640] = Laya.Texture.createFromTexture(this.D, (8 + cols) * 48, rows * 48, 48, 48);
                        }
                    }
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
            if (Tilesetsdata[_id]["tilesetNames"][8] !== "") {
                const fname = "./res/tiles/" + Tilesetsdata[_id]["tilesetNames"][8] + ".png";
                Laya.loader.load([fname], Laya.Handler.create(this, () => {
                    this.E = Laya.loader.getRes(fname);
                    for (let rows = 0; rows < 16; rows++) {
                        for (let cols = 0; cols < 8; cols++) {
                            this.tiletextures[rows * 8 + cols + 768] = Laya.Texture.createFromTexture(this.E, cols * 48, rows * 48, 48, 48);
                            this.tiletextures[rows * 8 + cols + 896] = Laya.Texture.createFromTexture(this.E, (8 + cols) * 48, rows * 48, 48, 48);
                        }
                    }
                    this.finished++;
                }));
            }
            else {
                this.finished++;
            }
        }
        analyseA1(A1) {
            this.generateFloor(Laya.Texture.createFromTexture(A1, 0, 0, 96, 144), 2048);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 3, 0, 96, 144), 2144);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 4, 0, 96, 144), 2240);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 0, 144, 96, 144), 2096);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 3, 144, 96, 144), 2192);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 4, 144, 96, 144), 2336);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 0, 144 * 2, 96, 144), 2432);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 4, 144 * 2, 96, 144), 2624);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 0, 144 * 3, 96, 144), 2528);
            this.generateFloor(Laya.Texture.createFromTexture(A1, 96 * 4, 144 * 3, 96, 144), 2720);
        }
        analyseA2(A2) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 8; i++) {
                    this.generateFloor(Laya.Texture.createFromTexture(A2, i * 96, j * 144, 96, 144), 2816 + 48 * (j * 8 + i));
                }
            }
        }
        analyseA3(A3) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 8; i++) {
                    this.generateWall(Laya.Texture.createFromTexture(A3, i * 96, j * 96, 96, 96), 4352 + 48 * (j * 8 + i));
                }
            }
        }
        analyseA4(A4) {
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 8; i++) {
                    this.generateFloor(Laya.Texture.createFromTexture(A4, 96 * i, (144 + 96) * j, 96, 144), 5888 + i * 48 + j * 768);
                    this.generateWall(Laya.Texture.createFromTexture(A4, 96 * i, (144 + 96) * j + 144, 96, 96), 6272 + i * 48 + j * 768);
                }
            }
        }
        mergeTiles(inputTexture, lu, ru, ld, rd) {
            const image = new Laya.Image();
            image.graphics.drawTexture(inputTexture[lu], 0, 0, 24, 24);
            image.graphics.drawTexture(inputTexture[ru], 24, 0, 24, 24);
            image.graphics.drawTexture(inputTexture[ld], 0, 24, 24, 24);
            image.graphics.drawTexture(inputTexture[rd], 24, 24, 24, 24);
            const texture = image.drawToTexture(48, 48, 0, 0);
            return texture;
        }
        generateFloor(FloorInput, startindex) {
            const inputTexture = Array(24);
            for (let j = 0; j < 6; j++) {
                for (let i = 0; i < 4; i++) {
                    inputTexture[j * 4 + i] = Laya.Texture.createFromTexture(FloorInput, i * 24, j * 24, 24, 24);
                }
            }
            this.tiletextures[startindex] = this.mergeTiles(inputTexture, 13, 14, 17, 18);
            this.tiletextures[startindex + 1] = this.mergeTiles(inputTexture, 2, 14, 17, 18);
            this.tiletextures[startindex + 2] = this.mergeTiles(inputTexture, 13, 3, 17, 18);
            this.tiletextures[startindex + 3] = this.mergeTiles(inputTexture, 2, 3, 17, 18);
            this.tiletextures[startindex + 4] = this.mergeTiles(inputTexture, 13, 14, 17, 7);
            this.tiletextures[startindex + 5] = this.mergeTiles(inputTexture, 2, 14, 17, 7);
            this.tiletextures[startindex + 6] = this.mergeTiles(inputTexture, 13, 3, 17, 7);
            this.tiletextures[startindex + 7] = this.mergeTiles(inputTexture, 2, 3, 17, 7);
            this.tiletextures[startindex + 8] = this.mergeTiles(inputTexture, 13, 14, 6, 18);
            this.tiletextures[startindex + 9] = this.mergeTiles(inputTexture, 2, 14, 6, 18);
            this.tiletextures[startindex + 10] = this.mergeTiles(inputTexture, 13, 3, 6, 18);
            this.tiletextures[startindex + 11] = this.mergeTiles(inputTexture, 2, 3, 6, 18);
            this.tiletextures[startindex + 12] = this.mergeTiles(inputTexture, 13, 14, 6, 7);
            this.tiletextures[startindex + 13] = this.mergeTiles(inputTexture, 2, 14, 6, 7);
            this.tiletextures[startindex + 14] = this.mergeTiles(inputTexture, 13, 3, 6, 7);
            this.tiletextures[startindex + 15] = this.mergeTiles(inputTexture, 2, 3, 6, 7);
            this.tiletextures[startindex + 16] = this.mergeTiles(inputTexture, 12, 14, 16, 18);
            this.tiletextures[startindex + 17] = this.mergeTiles(inputTexture, 12, 3, 16, 18);
            this.tiletextures[startindex + 18] = this.mergeTiles(inputTexture, 12, 14, 16, 7);
            this.tiletextures[startindex + 19] = this.mergeTiles(inputTexture, 12, 3, 16, 7);
            this.tiletextures[startindex + 20] = this.mergeTiles(inputTexture, 9, 10, 17, 18);
            this.tiletextures[startindex + 21] = this.mergeTiles(inputTexture, 9, 10, 17, 7);
            this.tiletextures[startindex + 22] = this.mergeTiles(inputTexture, 9, 10, 6, 18);
            this.tiletextures[startindex + 23] = this.mergeTiles(inputTexture, 9, 10, 6, 7);
            this.tiletextures[startindex + 24] = this.mergeTiles(inputTexture, 13, 15, 17, 19);
            this.tiletextures[startindex + 25] = this.mergeTiles(inputTexture, 13, 15, 6, 19);
            this.tiletextures[startindex + 26] = this.mergeTiles(inputTexture, 2, 15, 17, 19);
            this.tiletextures[startindex + 27] = this.mergeTiles(inputTexture, 2, 15, 6, 19);
            this.tiletextures[startindex + 28] = this.mergeTiles(inputTexture, 13, 14, 21, 22);
            this.tiletextures[startindex + 29] = this.mergeTiles(inputTexture, 2, 14, 21, 22);
            this.tiletextures[startindex + 30] = this.mergeTiles(inputTexture, 13, 3, 21, 22);
            this.tiletextures[startindex + 31] = this.mergeTiles(inputTexture, 2, 3, 21, 22);
            this.tiletextures[startindex + 32] = this.mergeTiles(inputTexture, 12, 15, 16, 19);
            this.tiletextures[startindex + 33] = this.mergeTiles(inputTexture, 9, 10, 21, 22);
            this.tiletextures[startindex + 34] = this.mergeTiles(inputTexture, 8, 9, 12, 13);
            this.tiletextures[startindex + 35] = this.mergeTiles(inputTexture, 8, 9, 12, 7);
            this.tiletextures[startindex + 36] = this.mergeTiles(inputTexture, 10, 11, 14, 15);
            this.tiletextures[startindex + 37] = this.mergeTiles(inputTexture, 10, 11, 6, 15);
            this.tiletextures[startindex + 38] = this.mergeTiles(inputTexture, 18, 19, 22, 23);
            this.tiletextures[startindex + 39] = this.mergeTiles(inputTexture, 2, 19, 22, 23);
            this.tiletextures[startindex + 40] = this.mergeTiles(inputTexture, 16, 14, 20, 21);
            this.tiletextures[startindex + 41] = this.mergeTiles(inputTexture, 16, 3, 20, 21);
            this.tiletextures[startindex + 42] = this.mergeTiles(inputTexture, 8, 11, 16, 19);
            this.tiletextures[startindex + 43] = this.mergeTiles(inputTexture, 8, 10, 20, 22);
            this.tiletextures[startindex + 44] = this.mergeTiles(inputTexture, 12, 15, 20, 23);
            this.tiletextures[startindex + 45] = this.mergeTiles(inputTexture, 9, 11, 6, 15);
            this.tiletextures[startindex + 46] = this.mergeTiles(inputTexture, 0, 1, 4, 5);
            this.tiletextures[startindex + 47] = this.mergeTiles(inputTexture, 0, 1, 4, 5);
        }
        generateWall(WallInput, startindex) {
            const inputTexture = Array(16);
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 4; i++) {
                    inputTexture[j * 4 + i] = Laya.Texture.createFromTexture(WallInput, i * 24, j * 24, 24, 24);
                }
            }
            this.tiletextures[startindex] = this.mergeTiles(inputTexture, 5, 6, 9, 10);
            this.tiletextures[startindex + 1] = this.mergeTiles(inputTexture, 4, 5, 8, 9);
            this.tiletextures[startindex + 2] = this.mergeTiles(inputTexture, 1, 2, 5, 6);
            this.tiletextures[startindex + 3] = this.mergeTiles(inputTexture, 0, 1, 4, 5);
            this.tiletextures[startindex + 4] = this.mergeTiles(inputTexture, 6, 7, 10, 11);
            this.tiletextures[startindex + 5] = this.mergeTiles(inputTexture, 4, 7, 8, 11);
            this.tiletextures[startindex + 6] = this.mergeTiles(inputTexture, 2, 3, 6, 7);
            this.tiletextures[startindex + 7] = this.mergeTiles(inputTexture, 0, 3, 4, 7);
            this.tiletextures[startindex + 8] = this.mergeTiles(inputTexture, 9, 10, 13, 14);
            this.tiletextures[startindex + 9] = this.mergeTiles(inputTexture, 8, 9, 12, 13);
            this.tiletextures[startindex + 10] = this.mergeTiles(inputTexture, 1, 2, 13, 14);
            this.tiletextures[startindex + 11] = this.mergeTiles(inputTexture, 0, 1, 12, 13);
            this.tiletextures[startindex + 12] = this.mergeTiles(inputTexture, 10, 11, 14, 15);
            this.tiletextures[startindex + 13] = this.mergeTiles(inputTexture, 8, 11, 12, 15);
            this.tiletextures[startindex + 14] = this.mergeTiles(inputTexture, 2, 3, 14, 15);
            this.tiletextures[startindex + 15] = this.mergeTiles(inputTexture, 0, 3, 12, 15);
        }
        static updateWall(tvalue, lu, u, ru, l, r, ld, d, rd) {
            let cu = true;
            let cd = true;
            let cl = true;
            let cr = true;
            if (u < tvalue || u > tvalue + 15) {
                cu = false;
            }
            else {
                if (u % 2 === 1) {
                    cl = false;
                }
                if (Math.floor(u / 4) % 2 === 1) {
                    cr = false;
                }
            }
            if (d < tvalue || d > tvalue + 15) {
                cd = false;
            }
            else {
                if (d % 2 === 1) {
                    cl = false;
                }
                if (Math.floor(d / 4) % 2 === 1) {
                    cr = false;
                }
            }
            if (l < tvalue || l > tvalue + 15) {
                cl = false;
            }
            if (r < tvalue || r > tvalue + 15) {
                cr = false;
            }
            let resvalue = tvalue;
            if (cl === false) {
                resvalue += 1;
            }
            if (cr === false) {
                resvalue += 4;
            }
            if (cu === false) {
                resvalue += 2;
            }
            if (cd === false) {
                resvalue += 8;
            }
            return resvalue;
        }
        static updateFloor(tvalue, lu, u, ru, l, r, ld, d, rd) {
            let clu = true;
            let cu = true;
            let cru = true;
            let cld = true;
            let cd = true;
            let crd = true;
            let cl = true;
            let cr = true;
            if (lu < tvalue || lu > tvalue + 48) {
                clu = false;
            }
            if (u < tvalue || u > tvalue + 48) {
                cu = false;
            }
            if (ru < tvalue || ru > tvalue + 48) {
                cru = false;
            }
            if (l < tvalue || l > tvalue + 48) {
                cl = false;
            }
            if (r < tvalue || r > tvalue + 48) {
                cr = false;
            }
            if (ld < tvalue || ld > tvalue + 48) {
                cld = false;
            }
            if (d < tvalue || d > tvalue + 48) {
                cd = false;
            }
            if (rd < tvalue || rd > tvalue + 48) {
                crd = false;
            }
            let resvalue = tvalue;
            clu = !clu;
            cu = !cu;
            cru = !cru;
            cl = !cl;
            cr = !cr;
            cld = !cld;
            cd = !cd;
            crd = !crd;
            if (!cu && !cl && !cr && !cd) {
                resvalue += 0;
            }
            if (clu && !cu && !cru && !cl && !cr && !cld && !cd && !crd) {
                resvalue += 1;
            }
            if (!clu && !cu && cru && !cl && !cr && !cld && !cd && !crd) {
                resvalue += 2;
            }
            if (clu && !cu && cru && !cl && !cr && !cld && !cd && !crd) {
                resvalue += 3;
            }
            if (!clu && !cu && !cru && !cl && !cr && !cld && !cd && crd) {
                resvalue += 4;
            }
            if (clu && !cu && !cru && !cl && !cr && !cld && !cd && crd) {
                resvalue += 5;
            }
            if (!clu && !cu && cru && !cl && !cr && !cld && !cd && crd) {
                resvalue += 6;
            }
            if (clu && !cu && cru && !cl && !cr && !cld && !cd && crd) {
                resvalue += 7;
            }
            if (!clu && !cu && !cru && !cl && !cr && cld && !cd && !crd) {
                resvalue += 8;
            }
            if (clu && !cu && !cru && !cl && !cr && cld && !cd && !crd) {
                resvalue += 9;
            }
            if (!clu && !cu && cru && !cl && !cr && cld && !cd && !crd) {
                resvalue += 10;
            }
            if (clu && !cu && cru && !cl && !cr && cld && !cd && !crd) {
                resvalue += 11;
            }
            if (!clu && !cu && !cru && !cl && !cr && cld && !cd && crd) {
                resvalue += 12;
            }
            if (clu && !cu && !cru && !cl && !cr && cld && !cd && crd) {
                resvalue += 13;
            }
            if (!clu && !cu && cru && !cl && !cr && cld && !cd && crd) {
                resvalue += 14;
            }
            if (clu && !cu && cru && !cl && !cr && cld && !cd && crd) {
                resvalue += 15;
            }
            if (!cu && !cru && cl && !cr && !cd && !crd) {
                resvalue += 16;
            }
            if (!cu && cru && cl && !cr && !cd && !crd) {
                resvalue += 17;
            }
            if (!cu && !cru && cl && !cr && !cd && crd) {
                resvalue += 18;
            }
            if (!cu && cru && cl && !cr && !cd && crd) {
                resvalue += 19;
            }
            if (cu && !cl && !cr && !cld && !cd && !crd) {
                resvalue += 20;
            }
            if (cu && !cl && !cr && !cld && !cd && crd) {
                resvalue += 21;
            }
            if (cu && !cl && !cr && cld && !cd && !crd) {
                resvalue += 22;
            }
            if (cu && !cl && !cr && cld && !cd && crd) {
                resvalue += 23;
            }
            if (!clu && !cu && !cl && cr && !cld && !cd) {
                resvalue += 24;
            }
            if (!clu && !cu && !cl && cr && cld && !cd) {
                resvalue += 25;
            }
            if (clu && !cu && !cl && cr && !cld && !cd) {
                resvalue += 26;
            }
            if (clu && !cu && !cl && cr && cld && !cd) {
                resvalue += 27;
            }
            if (!clu && !cu && !cru && !cl && !cr && cd) {
                resvalue += 28;
            }
            if (clu && !cu && !cru && !cl && !cr && cd) {
                resvalue += 29;
            }
            if (!clu && !cu && cru && !cl && !cr && cd) {
                resvalue += 30;
            }
            if (clu && !cu && cru && !cl && !cr && cd) {
                resvalue += 31;
            }
            if (!cu && cl && cr && !cd) {
                resvalue += 32;
            }
            if (cu && !cl && !cr && cd) {
                resvalue += 33;
            }
            if (cu && cl && !cr && !cd && !crd) {
                resvalue += 34;
            }
            if (cu && cl && !cr && !cd && crd) {
                resvalue += 35;
            }
            if (cu && !cl && cr && !cld && !cd) {
                resvalue += 36;
            }
            if (cu && !cl && cr && cld && !cd) {
                resvalue += 37;
            }
            if (!clu && !cu && !cl && cr && cd) {
                resvalue += 38;
            }
            if (clu && !cu && !cl && cr && cd) {
                resvalue += 39;
            }
            if (!cu && !cru && cl && !cr && cd) {
                resvalue += 40;
            }
            if (!cu && cru && cl && !cr && cd) {
                resvalue += 41;
            }
            if (cu && cl && cr && !cd) {
                resvalue += 42;
            }
            if (cu && cl && !cr && cd) {
                resvalue += 43;
            }
            if (!cu && cl && cr && cd) {
                resvalue += 44;
            }
            if (cu && !cl && cr && cd) {
                resvalue += 45;
            }
            if (cu && cl && cr && cd) {
                resvalue += 46;
            }
            return resvalue;
        }
    }

    class MapGenerator {
        constructor(width, height) {
            this.data1 = [];
            this.data2 = [];
            this.data3 = [];
            this.data4 = [];
            this.data5 = [];
            this.data6 = [];
            this.eightX = [-1, 0, 1, -1, 1, -1, 0, 1];
            this.eightY = [-1, -1, -1, 0, 0, 1, 1, 1];
            this.fourX = [-1, 1, 0, 0];
            this.fourY = [0, 0, -1, 1];
            this.width = width;
            this.height = height;
            for (let j = 0; j < height; j++) {
                for (let i = 0; i < width; i++) {
                    this.data1.push(0);
                    this.data2.push(0);
                    this.data3.push(0);
                    this.data4.push(0);
                    this.data5.push(0);
                    this.data6.push(0);
                }
            }
        }
        ifWallTileType(type, walltype) {
            if (type >= walltype && type < walltype + 16) {
                return true;
            }
            return false;
        }
        fillFlood(regiontype, regionindex, startX, startY, noteregions) {
            const list = [];
            const startP = new Laya.Point(startX, startY);
            list.push(startP);
            noteregions[startY * this.width + startX] = regionindex;
            let listindex = 0;
            while (listindex < list.length) {
                const tempP = list[listindex];
                listindex++;
                for (let k = 0; k < 4; k++) {
                    const newP = new Laya.Point(tempP.x + this.fourX[k], tempP.y + this.fourY[k]);
                    if (this.data1[newP.y * this.width + newP.x] === regiontype && noteregions[newP.y * this.width + newP.x] != regionindex) {
                        noteregions[newP.y * this.width + newP.x] = regionindex;
                        list.push(newP);
                    }
                }
            }
            return list;
        }
        ifcanBarr(lu, u, ru, l, r, ld, d, rd) {
            const tempt = new Array(9);
            tempt[0] = lu;
            tempt[1] = u;
            tempt[2] = ru;
            tempt[3] = l;
            tempt[4] = false;
            tempt[5] = r;
            tempt[6] = ld;
            tempt[7] = d;
            tempt[8] = rd;
            let firstbase = 0;
            for (let i = 0; i < 9; i++) {
                if (tempt[i] === true) {
                    firstbase = i;
                }
            }
            const list = [];
            list.push(firstbase);
            let listindex = 0;
            while (listindex < list.length) {
                const p = list[listindex];
                listindex++;
                tempt[p] = false;
                let x = p % 3;
                let y = Math.floor(p / 3);
                for (let k = 0; k < 4; k++) {
                    const newx = x + this.fourX[k];
                    const newy = y + this.fourY[k];
                    if (newx >= 0 && newx < 3 && newy >= 0 && newy < 3) {
                        if (tempt[newy * 3 + newx] === true) {
                            list.push(newy * 3 + newx);
                        }
                    }
                }
            }
            for (let i = 0; i < 9; i++) {
                if (tempt[i] === true) {
                    return false;
                }
            }
            return true;
        }
    }

    class DungeonGenerator extends MapGenerator {
        constructor(width, height) {
            super(width, height);
            this.Base = 1553;
            this.Base2 = 3296;
            this.Wall = 6320;
            this.WallTop = 5936;
            this.Stone1 = [];
            this.prob1 = [];
            this.Stone21 = 65;
            this.Stone22 = 73;
            this.WalkableStone = 49;
            this.WalkableBase = 1625;
            this.Hole = 3392;
            this.Lake = 2528;
            this.WallDecTop = [];
            this.probWallTop = [];
            this.WallDecDown = [];
            this.probWallDown = [];
            this.Wall21 = [];
            this.Wall22 = [];
            this.probWall2 = [];
            this.widthmargin = 3;
            this.heightmargin = 3;
            this.initTilesType();
            if (this.width <= 25 && this.height <= 25) {
                this.initSmallRandomMap();
            }
            else {
                this.initRandomMap();
                this.autoCell();
            }
            this.connectAllBase();
            this.generateLakeandHole();
            this.generateWall();
            this.fillWallTops();
            this.generateBase2();
            this.updateAutoTiles();
            this.data = this.data1.concat(this.data2.concat(this.data3.concat(this.data4.concat(this.data5.concat(this.data6)))));
        }
        initTilesType() {
            if (DungeonGenerator.dungeontype === 0) {
                this.Base = 1552;
                this.Base2 = 2912;
                this.Wall = 6272;
                this.WallTop = 5888;
                this.Stone1 = [56, 108, 9, 242];
                this.prob1 = [0.0, 0.4, 0.8, 0.9];
                this.Stone21 = 64;
                this.Stone22 = 72;
                this.WalkableStone = 48;
                this.WalkableBase = 1624;
                this.Hole = 3008;
                this.Lake = 2432;
                this.Wall21 = [153, 0];
                this.Wall22 = [161, 0];
                this.probWall2 = [0, 0.1];
                this.WallDecTop = [144, 0];
                this.probWallTop = [0, 0.1];
                this.WallDecDown = [0];
                this.probWallDown = [0];
            }
            else if (DungeonGenerator.dungeontype === 1) {
                this.Base = 1553;
                this.Base2 = 3296;
                this.Wall = 6320;
                this.WallTop = 5936;
                this.Stone1 = [57, 104, 167, 242];
                this.prob1 = [0.0, 0.4, 0.8, 0.9];
                this.Stone21 = 65;
                this.Stone22 = 73;
                this.WalkableStone = 49;
                this.WalkableBase = 1625;
                this.Hole = 3392;
                this.Lake = 2528;
                this.Wall21 = [152, 153, 154, 0];
                this.Wall22 = [160, 161, 162, 0];
                this.probWall2 = [0.0, 0.1, 0.2, 0.3];
                this.WallDecTop = [155, 144, 165, 0];
                this.probWallTop = [0.0, 0.1, 0.2, 0.4];
                this.WallDecDown = [163, 167, 0];
                this.probWallDown = [0.0, 0.1, 0.3];
            }
            else if (DungeonGenerator.dungeontype === 2) {
                this.Base = 1554;
                this.Base2 = 3680;
                this.Wall = 6368;
                this.WallTop = 5984;
                this.Stone1 = [58, 242];
                this.prob1 = [0.0, 0.9];
                this.Stone21 = 66;
                this.Stone22 = 74;
                this.WalkableStone = 50;
                this.WalkableBase = 1626;
                this.Hole = 3776;
                this.Lake = 2240;
                this.Wall21 = [156, 0];
                this.Wall22 = [164, 0];
                this.probWall2 = [0.0, 0.1];
                this.WallDecTop = [0];
                this.probWallTop = [0];
                this.WallDecDown = [0];
                this.probWallDown = [0];
            }
            else if (DungeonGenerator.dungeontype === 3) {
                this.Base = 1555;
                this.Base2 = 4064;
                this.Wall = 6416;
                this.WallTop = 6032;
                this.Stone1 = [59, 106];
                this.prob1 = [0.0, 0.9];
                this.Stone21 = 67;
                this.Stone22 = 75;
                this.WalkableStone = 51;
                this.WalkableBase = 1627;
                this.Hole = 3440;
                this.Lake = 3440;
                this.Wall21 = [157, 0];
                this.Wall22 = [165, 0];
                this.probWall2 = [0.0, 0.1];
                this.WallDecTop = [166, 0];
                this.probWallTop = [0, 0.1];
                this.WallDecDown = [158, 0];
                this.probWallDown = [0, 0.1];
            }
            else if (DungeonGenerator.dungeontype === 4) {
                this.Base = 1556;
                this.Base2 = 2960;
                this.Wall = 6464;
                this.WallTop = 6080;
                this.Stone1 = [1, 9, 60, 105, 48, 242];
                this.prob1 = [0.0, 0.2, 0.4, 0.6, 0.8, 0.9];
                this.Stone21 = 68;
                this.Stone22 = 76;
                this.WalkableStone = 52;
                this.WalkableBase = 1628;
                this.Hole = 3056;
                this.Lake = 2336;
                this.Wall21 = [152, 154];
                this.Wall22 = [160, 162];
                this.probWall2 = [0.0, 0.5];
                this.WallDecTop = [155, 144];
                this.probWallTop = [0.0, 0.9];
                this.WallDecDown = [163, 155];
                this.probWallDown = [0.0, 0.7];
            }
            else if (DungeonGenerator.dungeontype === 5) {
                this.Base = 1557;
                this.Base2 = 3344;
                this.Wall = 6512;
                this.WallTop = 6128;
                this.Stone1 = [61];
                this.prob1 = [0.0];
                this.Stone21 = 69;
                this.Stone22 = 77;
                this.WalkableStone = 53;
                this.WalkableBase = 1629;
                this.Hole = 4160;
                this.Lake = 2624;
                this.Wall21 = [0];
                this.Wall22 = [0];
                this.probWall2 = [0];
                this.WallDecTop = [0];
                this.probWallTop = [0];
                this.WallDecDown = [0];
                this.probWallDown = [0];
            }
            else if (DungeonGenerator.dungeontype === 6) {
                this.Base = 1558;
                this.Base2 = 1558;
                this.Wall = 6560;
                this.WallTop = 6176;
                this.Stone1 = [62];
                this.prob1 = [0.0];
                this.Stone21 = 70;
                this.Stone22 = 78;
                this.WalkableStone = 54;
                this.WalkableBase = 1630;
                this.Hole = 3824;
                this.Lake = 3824;
                this.Wall21 = [0];
                this.Wall22 = [0];
                this.probWall2 = [0];
                this.WallDecTop = [0];
                this.probWallTop = [0];
                this.WallDecDown = [0];
                this.probWallDown = [0];
            }
            else if (DungeonGenerator.dungeontype === 7) {
                this.Base = 1559;
                this.Base2 = 1559;
                this.Wall = 6608;
                this.WallTop = 6224;
                this.Stone1 = [63, 62, 61];
                this.prob1 = [0.0, 0.4, 0.7];
                this.Stone21 = 71;
                this.Stone22 = 79;
                this.WalkableStone = 55;
                this.WalkableBase = 1631;
                this.Hole = 4208;
                this.Lake = 4208;
                this.Wall21 = [153, 0];
                this.Wall22 = [161, 0];
                this.probWall2 = [0, 0.2];
                this.WallDecTop = [144, 0];
                this.probWallTop = [0, 0.1];
                this.WallDecDown = [0];
                this.probWallDown = [0];
            }
        }
        initSmallRandomMap() {
            if (this.width < this.widthmargin * 2 + 1 || this.height < this.heightmargin * 2 + 1) {
                return;
            }
            let seednum = 2 + Math.floor(MathUtil.random() * this.width * this.height / 6);
            for (let i = 0; i < seednum; i++) {
                const tempx = this.widthmargin + Math.floor(MathUtil.random() * (this.width - this.widthmargin * 2));
                const tempy = this.heightmargin + Math.floor(MathUtil.random() * (this.height - this.heightmargin * 2));
                this.data1[tempy * this.width + tempx] = this.Base;
            }
        }
        initRandomMap() {
            this.widthmargin = 3;
            this.heightmargin = 3;
            for (let j = 0; j < this.height; j++) {
                for (let i = 0; i < this.width; i++) {
                    if (i > this.widthmargin && i < this.width - this.widthmargin && j > this.heightmargin && j < this.height - this.heightmargin) {
                        this.data1[j * this.width + i] = MathUtil.random() * 2 < 1 ? 0 : this.Base;
                    }
                }
            }
        }
        autoCell() {
            let itertime = 100;
            const lastdata = new Array(this.data1.length);
            for (let i = 0; i < this.data1.length; i++) {
                lastdata[i] = this.data1[i];
            }
            while (itertime > 0) {
                itertime--;
                for (let i = this.heightmargin; i < this.height - this.heightmargin; i++) {
                    for (let j = this.widthmargin; j < this.width - this.widthmargin; j++) {
                        let roadCount = 0;
                        for (let k = i - 1; k <= i + 1; k++) {
                            for (let l = j - 1; l <= j + 1; l++) {
                                if (k != i || l != j) {
                                    if (lastdata[k * this.width + l] == this.Base) {
                                        roadCount++;
                                    }
                                }
                            }
                        }
                        if (roadCount > 4) {
                            this.data1[i * this.width + j] = this.Base;
                        }
                        else if (roadCount < 4) {
                            this.data1[i * this.width + j] = 0;
                        }
                    }
                }
                for (let i = 0; i < this.data1.length; i++) {
                    lastdata[i] = this.data1[i];
                }
            }
        }
        connectAllBase() {
            const noteregions = new Array(this.height * this.width);
            const regions = [];
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    noteregions[i * this.width + j] = -1;
                }
            }
            let index = 0;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (this.data1[i * this.width + j] === this.Base && noteregions[i * this.width + j] === -1) {
                        const region = this.fillFlood(this.Base, index, j, i, noteregions);
                        regions.push(region);
                        index++;
                    }
                }
            }
            if (regions.length === 1) {
                return;
            }
            let maxid = 0;
            let maxarea = 0;
            for (let i = 0; i < regions.length; i++) {
                if (regions[i].length > maxarea) {
                    maxid = i;
                    maxarea = regions[i].length;
                }
            }
            for (let i = 0; i < regions.length; i++) {
                if (i !== maxid) {
                    let paths = [];
                    for (let j = 0; j < 10; j++) {
                        let path = [];
                        let rndP = regions[i][Math.floor(MathUtil.random() * regions[i].length)];
                        path.push(rndP);
                        paths.push(path);
                    }
                    let findpathindex = -1;
                    while (true) {
                        for (let j = 0; j < 10; j++) {
                            let tempP = paths[j][paths[j].length - 1];
                            let rndD = Math.floor(MathUtil.random() * 4);
                            const newP = new Laya.Point(tempP.x + this.fourX[rndD], tempP.y + this.fourY[rndD]);
                            if (newP.x >= this.widthmargin && newP.x < this.width - this.widthmargin && newP.y >= this.heightmargin && newP.y < this.height - this.heightmargin) {
                                paths[j].push(newP);
                                if (noteregions[newP.y * this.width + newP.x] === maxid) {
                                    findpathindex = j;
                                    break;
                                }
                            }
                        }
                        if (findpathindex >= 0) {
                            for (let j = 0; j < paths[findpathindex].length; j++) {
                                let tempP = paths[findpathindex][j];
                                this.data1[tempP.y * this.width + tempP.x] = this.Base;
                                noteregions[tempP.y * this.width + tempP.x] = maxid;
                            }
                            for (let j = 0; j < regions[i].length; j++) {
                                let tempP = regions[i][j];
                                noteregions[tempP.y * this.width + tempP.x] = maxid;
                            }
                            break;
                        }
                    }
                }
            }
        }
        generateLakeandHole() {
            const noteregions = new Array(this.height * this.width);
            const regions = [];
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    noteregions[i * this.width + j] = -1;
                }
            }
            let index = 0;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (this.data1[i * this.width + j] === 0 && noteregions[i * this.width + j] === -1) {
                        const region = this.fillFlood(0, index, j, i, noteregions);
                        regions.push(region);
                        index++;
                    }
                }
            }
            console.log(noteregions);
            console.log(regions);
            for (let i = 1; i < regions.length; i++) {
                if (MathUtil.random() < 0.5) {
                    if (MathUtil.random() < 0.5) {
                        for (let j = 0; j < regions[i].length; j++) {
                            this.data1[regions[i][j].y * this.width + regions[i][j].x] = this.Hole;
                        }
                    }
                    else {
                        for (let j = 0; j < regions[i].length; j++) {
                            this.data1[regions[i][j].y * this.width + regions[i][j].x] = this.Lake;
                        }
                    }
                }
            }
        }
        generateWall() {
            for (let i = this.height - 2; i > 2; i--) {
                for (let j = this.width - 2; j > 2; j--) {
                    if ((this.data1[i * this.width + j] === this.Base) && (this.data1[(i - 2) * this.width + j] === this.Base)) {
                        this.data1[(i - 1) * this.width + j] = this.Base;
                    }
                    if ((this.data1[i * this.width + j] === this.Base) && (this.data1[(i - 3) * this.width + j] === this.Base)) {
                        this.data1[(i - 1) * this.width + j] = this.Base;
                        this.data1[(i - 2) * this.width + j] = this.Base;
                    }
                }
            }
            for (let i = this.height - 2; i >= 2; i--) {
                for (let j = this.width - 1; j > 0; j--) {
                    if ((this.data1[i * this.width + j] === this.Base) && this.data1[(i - 1) * this.width + j] === 0 && this.data1[(i - 2) * this.width + j] === 0) {
                        this.data1[(i - 1) * this.width + j] = this.Wall;
                        if (i - 3 >= 0 && this.data1[(i - 3) * this.width + j] === 0) {
                            this.data1[(i - 2) * this.width + j] = this.Wall;
                        }
                    }
                }
            }
            for (let i = 1; i < this.height - 1; i++) {
                for (let j = 1; j < this.width - 1; j++) {
                    if (this.data1[i * this.width + j] === 0) {
                        for (let k = 0; k < 8; k++) {
                            const adj = this.data1[(i + this.eightY[k]) * this.width + j + this.eightX[k]];
                            if (adj === this.Wall || adj === this.Base) {
                                this.data1[i * this.width + j] = this.WallTop;
                            }
                        }
                    }
                }
            }
        }
        fillWallTops() {
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (this.data1[i * this.width + j] === 0) {
                        this.data1[i * this.width + j] = this.WallTop;
                    }
                }
            }
        }
        renderBase2(x, y, leftnum, upnum, downnum, rightnum) {
            let adjBase1Num = 0;
            if (this.data1[y * this.width + x] !== this.Base && this.data1[y * this.width + x] !== this.Base2) {
                return;
            }
            for (let i = 0; i < 8; i++) {
                let newx = x + this.eightX[i];
                let newy = y + this.eightY[i];
                if (this.data1[newy * this.width + newx] === this.Base || this.data1[newy * this.width + newx] === this.Base2) {
                    adjBase1Num++;
                }
            }
            if (adjBase1Num >= 7) {
                this.data1[y * this.width + x] = this.Base2;
                for (let j = 0; j < 4; j++) {
                    if (j == 0 && leftnum > 0) {
                        this.renderBase2(x + this.fourX[j], y + this.fourY[j], leftnum - 1, leftnum - 1, leftnum - 1, leftnum - 1);
                    }
                    if (j == 1 && upnum > 0) {
                        this.renderBase2(x + this.fourX[j], y + this.fourY[j], upnum - 1, upnum - 1, upnum - 1, upnum - 1);
                    }
                    if (j == 2 && downnum > 0) {
                        this.renderBase2(x + this.fourX[j], y + this.fourY[j], downnum - 1, downnum - 1, downnum - 1, downnum - 1);
                    }
                    if (j == 3 && rightnum > 0) {
                        this.renderBase2(x + this.fourX[j], y + this.fourY[j], rightnum - 1, rightnum - 1, rightnum - 1, rightnum - 1);
                    }
                }
            }
        }
        generateBase2() {
            if (this.Base2 === this.Base) {
                return;
            }
            const seedNum = Math.floor(MathUtil.random() * Math.sqrt(this.width + this.height));
            for (let num = 0; num < seedNum; num++) {
                let x = 1 + Math.floor(MathUtil.random() * this.width - 2);
                let y = 1 + Math.floor(MathUtil.random() * this.height - 2);
                if (this.data1[y * this.width + x] === this.Base) {
                    const leftnum = Math.floor(MathUtil.random() * 5);
                    const rightnum = Math.floor(MathUtil.random() * 5);
                    const upnum = Math.floor(MathUtil.random() * 5);
                    const downnum = Math.floor(MathUtil.random() * 5);
                    this.renderBase2(x, y, leftnum, upnum, downnum, rightnum);
                }
                else {
                    num--;
                }
            }
        }
        updateAutoTiles() {
            const lastdata = new Array(this.data1.length);
            for (let i = 0; i < this.data1.length; i++) {
                lastdata[i] = this.data1[i];
            }
            let ifupdated = true;
            while (ifupdated) {
                ifupdated = false;
                for (let i = 1; i < this.height - 1; i++) {
                    for (let j = 1; j < this.width - 1; j++) {
                        const lu = this.data1[(i - 1) * this.width + j - 1];
                        const u = this.data1[(i - 1) * this.width + j];
                        const ru = this.data1[(i - 1) * this.width + j + 1];
                        const l = this.data1[(i) * this.width + j - 1];
                        const r = this.data1[(i) * this.width + j + 1];
                        const ld = this.data1[(i + 1) * this.width + j - 1];
                        const d = this.data1[(i + 1) * this.width + j];
                        const rd = this.data1[(i + 1) * this.width + j + 1];
                        let olddata = this.data1[i * this.width + j];
                        if (lastdata[i * this.width + j] === this.Wall) {
                            this.data1[i * this.width + j] = TilesManager.updateWall(lastdata[i * this.width + j], lu, u, ru, l, r, ld, d, rd);
                            if (olddata !== this.data1[i * this.width + j]) {
                                ifupdated = true;
                            }
                        }
                        if (lastdata[i * this.width + j] === this.Base2 && this.Base2 !== this.Base) {
                            this.data1[i * this.width + j] = TilesManager.updateFloor(lastdata[i * this.width + j], lu, u, ru, l, r, ld, d, rd);
                            if (olddata !== this.data1[i * this.width + j]) {
                                ifupdated = true;
                            }
                        }
                        if (lastdata[i * this.width + j] === this.WallTop) {
                            this.data1[i * this.width + j] = TilesManager.updateFloor(lastdata[i * this.width + j], lu, u, ru, l, r, ld, d, rd);
                            if (olddata !== this.data1[i * this.width + j]) {
                                ifupdated = true;
                            }
                        }
                        if (lastdata[i * this.width + j] === this.Hole) {
                            this.data1[i * this.width + j] = TilesManager.updateFloor(lastdata[i * this.width + j], lu, u, ru, l, r, ld, d, rd);
                            if (olddata !== this.data1[i * this.width + j]) {
                                ifupdated = true;
                            }
                        }
                        if (lastdata[i * this.width + j] === this.Lake) {
                            this.data1[i * this.width + j] = TilesManager.updateFloor(lastdata[i * this.width + j], lu, u, ru, l, r, ld, d, rd);
                            if (olddata !== this.data1[i * this.width + j]) {
                                ifupdated = true;
                            }
                        }
                    }
                }
            }
        }
        walkable(x, y) {
            if (this.data1[y * this.width + x] !== this.Base && this.data1[y * this.width + x] !== this.Base2 && this.data1[y * this.width + x] !== this.WalkableBase) {
                return false;
            }
            if (this.data3[y * this.width + x] === this.Stone22) {
                return false;
            }
            for (let i = 0; i < this.Stone1.length; i++) {
                if (this.data3[y * this.width + x] === this.Stone1[i]) {
                    return false;
                }
            }
            return true;
        }
        cleardeco() {
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    this.data3[i * this.width + j] = 0;
                    this.data4[i * this.width + j] = 0;
                    if (this.data1[i * this.width + j] === this.WalkableBase) {
                        this.data1[i * this.width + j] = this.Base;
                    }
                }
            }
            this.data = this.data1.concat(this.data2.concat(this.data3.concat(this.data4.concat(this.data5.concat(this.data6)))));
        }
        adddeco() {
            const topWallList = [];
            const downWallList = [];
            for (let i = 1; i < this.height - 1; i++) {
                for (let j = 1; j < this.width; j++) {
                    if (this.ifWallTileType(this.data1[i * this.width + j], this.Wall) && !this.ifWallTileType(this.data1[(i - 1) * this.width + j], this.Wall)) {
                        topWallList.push(new Laya.Point(j, i));
                    }
                    if (this.ifWallTileType(this.data1[i * this.width + j], this.Wall) && !this.ifWallTileType(this.data1[(i + 1) * this.width + j], this.Wall)) {
                        downWallList.push(new Laya.Point(j, i));
                    }
                }
            }
            let num = MathUtil.random() * Math.floor(topWallList.length / 3);
            for (let i = 0; i < num / 3; i++) {
                const rnd = MathUtil.random();
                let index;
                for (let j = 0; j < this.probWallTop.length; j++) {
                    if (rnd > this.probWallTop[j]) {
                        index = j;
                    }
                }
                let p = topWallList[Math.floor(MathUtil.random() * topWallList.length)];
                console.log(this.data3[p.y * this.width + p.x]);
                if (this.data3[p.y * this.width + p.x] === 0) {
                    this.data3[p.y * this.width + p.x] = this.WallDecTop[index];
                }
            }
            for (let i = 0; i < num / 3; i++) {
                const rnd = MathUtil.random();
                let index;
                for (let j = 0; j < this.probWallDown.length; j++) {
                    if (rnd > this.probWallDown[j]) {
                        index = j;
                    }
                }
                let p = downWallList[Math.floor(MathUtil.random() * downWallList.length)];
                if (this.data3[p.y * this.width + p.x] === 0) {
                    this.data3[p.y * this.width + p.x] = this.WallDecDown[index];
                }
            }
            for (let i = 0; i < num / 3; i++) {
                const rnd = MathUtil.random();
                let index;
                for (let j = 0; j < this.probWall2.length; j++) {
                    if (rnd > this.probWall2[j]) {
                        index = j;
                    }
                }
                let p = topWallList[Math.floor(MathUtil.random() * topWallList.length)];
                if (this.data3[p.y * this.width + p.x] === 0 && this.data3[p.x, p.y + 1] === 0) {
                    this.data3[p.y * this.width + p.x] = this.Wall21[index];
                    this.data3[(p.y + 1) * this.width + p.x] = this.Wall22[index];
                }
            }
            console.log(this.data3);
            num = this.width > this.height ? this.height : this.width + MathUtil.random() * Math.floor(this.width + this.height);
            for (let i = 0; i < num / 3; i++) {
                const x = 1 + Math.floor(MathUtil.random() * (this.width - 2));
                const y = 1 + Math.floor(MathUtil.random() * (this.height - 2));
                if (this.data1[y * this.width + x] === this.Base) {
                    this.data1[y * this.width + x] = this.WalkableBase;
                }
            }
            num = this.width > this.height ? this.height : this.width + MathUtil.random() * Math.floor(this.width + this.height);
            for (let i = 0; i < num; i++) {
                const x = 1 + Math.floor(MathUtil.random() * (this.width - 2));
                const y = 1 + Math.floor(MathUtil.random() * (this.height - 2));
                if (this.walkable(x, y)) {
                    const lu = this.walkable(x - 1, y - 1);
                    const u = this.walkable(x, y - 1);
                    const ru = this.walkable(x + 1, y - 1);
                    const l = this.walkable(x - 1, y);
                    const r = this.walkable(x + 1, y);
                    const ld = this.walkable(x - 1, y + 1);
                    const d = this.walkable(x, y + 1);
                    const rd = this.walkable(x + 1, y + 1);
                    if (this.ifcanBarr(lu, u, ru, l, r, ld, d, rd)) {
                        const rnd = MathUtil.random();
                        let stone1index = 0;
                        for (let i = 0; i < this.prob1.length; i++) {
                            if (rnd > this.prob1[i]) {
                                stone1index = i;
                            }
                            else {
                                break;
                            }
                        }
                        this.data3[y * this.width + x] = this.Stone1[stone1index];
                    }
                }
            }
            num = this.width > this.height ? this.height : this.width + MathUtil.random() * Math.floor(this.width + this.height);
            for (let i = 0; i < num / 3; i++) {
                const x = 1 + Math.floor(MathUtil.random() * (this.width - 2));
                const y = 1 + Math.floor(MathUtil.random() * (this.height - 2));
                if (this.walkable(x, y)) {
                    const lu = this.walkable(x - 1, y - 1);
                    const u = this.walkable(x, y - 1);
                    const ru = this.walkable(x + 1, y - 1);
                    const l = this.walkable(x - 1, y);
                    const r = this.walkable(x + 1, y);
                    const ld = this.walkable(x - 1, y + 1);
                    const d = this.walkable(x, y + 1);
                    const rd = this.walkable(x + 1, y + 1);
                    if (this.ifcanBarr(lu, u, ru, l, r, ld, d, rd)) {
                        this.data4[(y - 1) * this.width + x] = this.Stone21;
                        this.data3[y * this.width + x] = this.Stone22;
                    }
                }
            }
            num = this.width > this.height ? this.height : this.width + MathUtil.random() * Math.floor(this.width + this.height);
            for (let i = 0; i < num / 3; i++) {
                const x = 1 + Math.floor(MathUtil.random() * (this.width - 2));
                const y = 1 + Math.floor(MathUtil.random() * (this.height - 2));
                if (this.walkable(x, y)) {
                    this.data3[y * this.width + x] = this.WalkableStone;
                }
            }
            this.data = this.data1.concat(this.data2.concat(this.data3.concat(this.data4.concat(this.data5.concat(this.data6)))));
        }
    }
    DungeonGenerator.dungeontype = 0;

    var MapType;
    (function (MapType) {
        MapType[MapType["dungeon"] = 0] = "dungeon";
    })(MapType || (MapType = {}));
    class Map {
        constructor() {
            this.width = 30;
            this.height = 30;
            this.maptype = MapType.dungeon;
            this.tilesetId = 0;
            this.mapstr = "";
        }
        static get instance() {
            if (!Map._instance) {
                Map._instance = new Map();
            }
            return Map._instance;
        }
        getTiledSetID(type) {
            let id = 4;
            if (type === MapType.dungeon) {
                id = 4;
            }
            return id;
        }
        genstr() {
            const width = this.mapgenerator.width;
            const height = this.mapgenerator.height;
            let str = "";
            for (let i = 0; i <= 5; i++) {
                for (let j = 0; j < width * height; j++) {
                    if (!(i == 0 && j == 0)) {
                        str += ",";
                    }
                    str += this.mapgenerator.data[i * width * height + j].toString();
                }
            }
            return str;
        }
        init(width, height, type) {
            this.width = width;
            this.height = height;
            this.maptype = type;
            this.tilesetId = this.getTiledSetID(type);
            if (type === MapType.dungeon) {
                this.mapgenerator = new DungeonGenerator(width, height);
            }
            this.mapdata = this.mapgenerator.data;
            this.mapstr = this.genstr();
        }
        DrawMap(tm, bgImage) {
            const map = Map.instance;
            const mapwidth = map.width;
            const mapheight = map.height;
            for (let index = 0; index < map.mapdata.length; index++) {
                const layer = Math.floor(index / (mapwidth * mapheight));
                const loc = index % (mapwidth * mapheight);
                const rowindex = Math.floor(loc / mapwidth);
                const colindex = loc % mapwidth;
                const type = map.mapdata[index];
                if (layer < 4) {
                    if (type > 0 && type < 8192) {
                        bgImage.graphics.drawImage(tm.tiletextures[type], colindex * 48, rowindex * 48, 48, 48);
                    }
                }
            }
        }
        cleardeco() {
            this.mapgenerator.cleardeco();
            this.mapstr = this.genstr();
            this.mapdata = this.mapgenerator.data;
        }
        adddeco() {
            this.mapgenerator.cleardeco();
            this.mapgenerator.adddeco();
            this.mapstr = this.genstr();
            this.mapdata = this.mapgenerator.data;
        }
    }

    class saveFile {
        static get instance() {
            if (!saveFile._instance) {
                saveFile._instance = new saveFile();
            }
            return saveFile._instance;
        }
        tostring(map) {
            let str = `
        {
            "autoplayBgm": false,
            "autoplayBgs": false,
            "battleback1Name": "",
            "battleback2Name": "",
            "bgm": {
              "name": "",
              "pan": 0,
              "pitch": 100,
              "volume": 90
            },
            "bgs": {
              "name": "",
              "pan": 0,
              "pitch": 100,
              "volume": 90
            },
            "disableDashing": false,
            "displayName": "",
            "encounterList": [],
            "encounterStep": 30,
            "height": ${Map.instance.height},
            "note": "",
            "parallaxLoopX": false,
            "parallaxLoopY": false,
            "parallaxName": "",
            "parallaxShow": true,
            "parallaxSx": 0,
            "parallaxSy": 0,
            "scrollType": 0,
            "specifyBattleback": true,
            "tilesetId": ${Map.instance.tilesetId},
            "width":${Map.instance.width},
            "data":[${Map.instance.mapdata}],
            "events":[]
        }
        `;
            return str;
        }
        saveMap(value, type, name) {
            var blob;
            if (typeof window.Blob == "function") {
                blob = new Blob([value], { type: type });
            }
            else {
                var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
                var bb = new BlobBuilder();
                bb.append(value);
                blob = bb.getBlob(type);
            }
            var URL = window.URL || window.webkitURL;
            var bloburl = URL.createObjectURL(blob);
            var anchor = document.createElement("a");
            if ('download' in anchor) {
                anchor.style.visibility = "hidden";
                anchor.href = bloburl;
                anchor.download = name;
                document.body.appendChild(anchor);
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                anchor.dispatchEvent(evt);
                document.body.removeChild(anchor);
            }
            else if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, name);
            }
            else {
                location.href = bloburl;
            }
        }
    }

    class BgImage extends Laya.Image {
        static get instance() {
            if (!BgImage._instance) {
                BgImage._instance = new BgImage();
            }
            return BgImage._instance;
        }
        setscale(scale) {
            this.scaleX = this.scaleY = scale;
        }
        Move(delx, dely) {
            this.x += delx;
            this.y += dely;
            if (this.x > Laya.stage.width / 2 + this.width * this.scaleX / 2)
                this.x = Laya.stage.width / 2 + this.width * this.scaleX / 2;
            if (this.y > Laya.stage.height / 2 + this.height * this.scaleY / 2)
                this.y = Laya.stage.height / 2 + this.height * this.scaleY / 2;
            if (this.x < Laya.stage.width / 2 - this.width * this.scaleX / 2)
                this.x = Laya.stage.width / 2 - this.width * this.scaleX / 2;
            if (this.y < Laya.stage.height / 2 - this.height * this.scaleY / 2)
                this.y = Laya.stage.height / 2 - this.height * this.scaleY / 2;
        }
        reset(width, height) {
            this.width = 48 * width;
            this.height = 48 * height;
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.graphics.clear();
            this.graphics.drawRect(0, 0, this.width, this.height, "#000000");
        }
    }

    class DungeonBox extends Laya.Box {
        constructor() {
            super();
            this.dungeoncombo = new Laya.ComboBox("comp/combobox.png", "土洞穴(Dirt Cave),岩洞窟(Rock Cave),溶岩洞窟(Lava Cave),冰洞窟(Ice Cave),草迷宮(Grass Maze),水晶(Crystal),体内(In Body),魔界(Demonic World)");
            this.dungeoncombo.scrollBarSkin = "comp/vscroll.png";
            this.dungeoncombo.selectedIndex = 0;
            this.dungeoncombo.itemSize = 15;
            this.dungeoncombo.selectHandler = new Laya.Handler(this, () => {
                DungeonGenerator.dungeontype = this.dungeoncombo.selectedIndex;
            });
            this.visible = false;
            this.dungeondecobtn = new Laya.Button("comp/button.png", "生成装饰\nAdd Ornaments");
            this.dungeoncleardecobtn = new Laya.Button("comp/button.png", "清除装饰\nClear Ornaments");
            this.dungeondecobtn.on(Laya.Event.CLICK, this, () => {
                Map.instance.cleardeco();
                Map.instance.adddeco();
                Map.instance.DrawMap(TilesManager.instance, BgImage.instance);
                this.dungeondecobtn.label = "重新生成装饰\nRefresh Ornaments";
                this.dungeoncleardecobtn.visible = true;
            });
            this.dungeoncleardecobtn.on(Laya.Event.CLICK, this, () => {
                Map.instance.cleardeco();
                Map.instance.DrawMap(TilesManager.instance, BgImage.instance);
            });
            this.width = 150;
            this.y = 250;
            this.dungeoncombo.width = 180;
            this.dungeoncombo.height = 30;
            this.dungeondecobtn.y = 50;
            this.dungeoncleardecobtn.y = 100;
            this.dungeondecobtn.visible = false;
            this.dungeoncleardecobtn.visible = false;
            this.addChild(this.dungeoncombo);
            this.addChild(this.dungeondecobtn);
            this.addChild(this.dungeoncleardecobtn);
        }
        beforegen() {
            this.dungeondecobtn.label = "生成装饰\nAdd Ornaments";
            this.dungeoncleardecobtn.visible = false;
        }
        aftergen() {
            this.dungeondecobtn.visible = true;
        }
    }

    class MainUI {
        constructor(scene) {
            this.zoomscale = 1.0;
            const width = scene.width;
            const height = scene.height;
            this.saveBtn = new Laya.Button("comp/button.png", "保存地图\nSave map");
            this.genBtn = new Laya.Button("comp/button.png", "生成地图\nGenerate map");
            this.widthText = new Laya.TextInput();
            this.heightText = new Laya.TextInput();
            this.combo = new Laya.ComboBox("comp/combobox.png", "地牢(dungeon)");
            this.combo.itemSize = 15;
            this.widthlbl = new Laya.Label("地图宽度(Map width)");
            this.heightlbl = new Laya.Label("地图高度(Map height)");
            this.zoomOut = new Laya.Button("comp/button.png", "-");
            this.zoomlbl = new Laya.Label(Math.round(this.zoomscale * 100).toString() + "%");
            this.zoomlbl.fontSize = 15;
            this.zoomlbl.y = 18;
            this.zoomIn = new Laya.Button("comp/button.png", "+");
            this.zoomOut.labelSize = this.zoomIn.labelSize = 40;
            this.zoomIn.on(Laya.Event.CLICK, this, () => {
                this.zoomscale += 0.2;
                if (this.zoomscale < 0.01) {
                    this.zoomscale = 0.01;
                }
                if (this.zoomscale > 100) {
                    this.zoomscale = 100;
                }
                BgImage.instance.setscale(this.zoomscale);
                this.zoomlbl.text = (Math.round(this.zoomscale * 100).toString() + "%");
            });
            this.zoomOut.on(Laya.Event.CLICK, this, () => {
                this.zoomscale -= 0.2;
                if (this.zoomscale < 0.01) {
                    this.zoomscale = 0.01;
                }
                if (this.zoomscale > 100) {
                    this.zoomscale = 100;
                }
                BgImage.instance.setscale(this.zoomscale);
                this.zoomlbl.text = (Math.round(this.zoomscale * 100).toString() + "%");
            });
            this.widthlbl.color = "#ffffff";
            this.heightlbl.color = "#ffffff";
            this.widthText.skin = "comp/textinput.png";
            this.heightText.skin = "comp/textinput.png";
            this.combo.selectHandler = new Laya.Handler(this, this.onSelectCombo);
            this.dungeonBox = new DungeonBox();
            this.saveBtn.on(Laya.Event.CLICK, this, () => {
                if (Map.instance.mapstr === "") {
                    alert("首先，请生成地图。\nPlease generate a map first.");
                }
                else {
                    saveFile.instance.saveMap(saveFile.instance.tostring(Map.instance), 'application/json', "test");
                }
            });
            this.genBtn.on(Laya.Event.CLICK, this, () => {
                let width, height;
                width = parseInt(this.widthText.text);
                height = parseInt(this.heightText.text);
                if (!width || width <= 0 || width === NaN) {
                    alert("请输入有效的地图宽度\nPlease enter a valid map width");
                }
                else if (!height || height <= 0 || height === NaN) {
                    alert("请输入有效的地图高度\nPlease enter a valid map height");
                }
                else if (this.combo.selectedIndex < 0) {
                    alert("请选择有效的地图种类\nPlease select a valid map type");
                }
                else {
                    this.dungeonBox.beforegen();
                    Map.instance.init(width, height, this.combo.selectedIndex);
                    BgImage.instance.reset(width, height);
                    BgImage.instance.setscale(this.zoomscale);
                    Laya.timer.loop(100, this, () => {
                        if (TilesManager.instance.finished == 9) {
                            Map.instance.DrawMap(TilesManager.instance, BgImage.instance);
                            Laya.timer.clearAll(this);
                            this.dungeonBox.aftergen();
                        }
                    });
                }
            });
            this.widthText.type = "number";
            this.heightText.type = "number";
            this.widthText.restrict = "0123456789";
            this.heightText.restrict = "0123456789";
            this.genBtn.y = 50;
            this.widthlbl.y = 100;
            this.heightlbl.y = 150;
            this.widthText.y = 115;
            this.heightText.y = 165;
            this.combo.y = 200;
            this.combo.width = 130;
            this.combo.height = 30;
            this.zoomOut.x = 200;
            this.zoomOut.width = 40;
            this.zoomlbl.x = 250;
            this.zoomlbl.autoSize = true;
            this.zoomlbl.bgColor = "#ffffff";
            this.zoomIn.x = 300;
            this.zoomIn.width = 40;
            scene.addChild(BgImage.instance);
            scene.addChild(this.saveBtn);
            scene.addChild(this.genBtn);
            scene.addChild(this.widthlbl);
            scene.addChild(this.widthText);
            scene.addChild(this.heightlbl);
            scene.addChild(this.heightText);
            scene.addChild(this.combo);
            scene.addChild(this.dungeonBox);
            scene.addChild(this.zoomIn);
            scene.addChild(this.zoomlbl);
            scene.addChild(this.zoomOut);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }
        onMouseDown(e) {
            this.lastmouseX = Laya.stage.mouseX;
            this.lastmouseY = Laya.stage.mouseY;
            if (e.touches && e.touches.length == 2) {
                this.lastDistance = this.getDistance(e.touches);
            }
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        onMouseMove(e) {
            if (e.touches && e.touches.length == 2) {
                let distance = this.getDistance(e.touches);
                const factor = 0.01;
                this.zoomscale = (this.zoomscale + (distance - this.lastDistance) * factor);
                if (this.zoomscale < 0.01) {
                    this.zoomscale = 0.01;
                }
                if (this.zoomscale > 100) {
                    this.zoomscale = 100;
                }
                this.zoomlbl.text = (Math.round(this.zoomscale * 100).toString() + "%");
                BgImage.instance.setscale(this.zoomscale);
                this.lastDistance = distance;
            }
            else {
                BgImage.instance.Move((Laya.stage.mouseX - this.lastmouseX), (Laya.stage.mouseY - this.lastmouseY));
            }
            this.lastmouseX = Laya.stage.mouseX;
            this.lastmouseY = Laya.stage.mouseY;
        }
        onMouseUp() {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        getDistance(points) {
            let distance = 0;
            if (points && points.length == 2) {
                let dx = points[0].stageX - points[1].stageX;
                let dy = points[0].stageY - points[1].stageY;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        }
        onSelectCombo() {
            if (this.combo.selectedLabel === "地牢(dungeon)") {
                this.dungeonBox.visible = true;
            }
        }
    }

    class MainScene extends Laya.Scene {
        constructor() {
            super();
            this.width = Laya.stage.width = window.innerWidth;
            this.height = Laya.stage.height = window.innerHeight;
            this.mainui = new MainUI(this);
        }
    }

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
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            const ms = new MainScene();
            Laya.stage.addChild(ms);
        }
    }
    new Main();

}());

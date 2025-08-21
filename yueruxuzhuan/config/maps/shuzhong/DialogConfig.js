// 蜀中 - 对话配置
window.GameConfig.dialogs.shuzhong = {
    enemy_config_1: {
        name: "敌人配置1",
        avatar: "enemy.png",
        dialogs: [
            {
                id: "greeting",
                text: "石鬼头 小土鬼 跳跳蛙",
                options: [
                    { text: "了解", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    enemy_config_2: {
        name: "敌人配置2",
        avatar: "enemy.png",
        dialogs: [
            {
                id: "greeting",
                text: "五彩蜘蛛 紫凤鸟 树根",
                options: [
                    { text: "了解", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    enemy_config_3: {
        name: "敌人配置3",
        avatar: "enemy.png",
        dialogs: [
            {
                id: "greeting",
                text: "肥肥 猩猩 小独角",
                options: [
                    { text: "了解", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    ji_san_niang: {
        name: "姬三娘",
        avatar: "ji_san_niang.png",
        dialogs: [
            {
                id: "greeting",
                text: "一个女人从树上跳下，不偏不倚地砸到林月如身上。",
                speaker: " ",
                options: [
                    { text: "哎呦", action: "startStory", target: "chapter5" }
                ]
            }
        ]
    }
};

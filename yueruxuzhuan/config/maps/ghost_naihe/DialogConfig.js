// 奈河畔 - 对话配置
window.GameConfig.dialogs.ghost_naihe = {
    enemy_config_1: {
        name: "敌人配置1",
        avatar: "enemy.png",
        dialogs: [
            {
                id: "greeting",
                text: "开膛鬼 半截僵尸 飞头",
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
                text: "血口虫 蜥蜴 绿食火蟾",
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
                text: "青鬼 血云雾 红鬼",
                options: [
                    { text: "了解", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    huai_shu_pi: {
        name: "槐树皮",
        avatar: "item.png",
        dialogs: [
            {
                id: "greeting",
                text: "你采集了槐树皮。",
                options: [
                    { 
                        text: "收集", 
                        action: "collectItem", 
                        itemId: "huai_shu_pi",
                        nextDialog: null 
                    }
                ]
            }
        ]
    },
    
    wang_you_cao: {
        name: "忘忧草",
        avatar: "item.png",
        dialogs: [
            {
                id: "greeting",
                text: "你采集了忘忧草。",
                options: [
                    { 
                        text: "收集", 
                        action: "collectItem", 
                        itemId: "wang_you_cao",
                        nextDialog: null 
                    }
                ]
            }
        ]
    }
};

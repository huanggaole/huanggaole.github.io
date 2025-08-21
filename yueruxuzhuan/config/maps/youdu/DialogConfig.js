// 幽都 - 对话配置
window.GameConfig.dialogs.youdu = {
    gui_zu_a: {
        name: "鬼卒A",
        avatar: "gui_zu.png",
        dialogs: [
            {
                id: "greeting",
                text: "站住！你是什么人？怎么能随便进入幽都？",
                options: [
                    { text: "我是林月如，来寻找我的母亲", action: "none", nextDialog: "search_mother" },
                    { text: "我只是路过", action: "closeDialog", nextDialog: null }
                ]
            },
            {
                id: "search_mother",
                text: "寻找母亲？那你应该去阎罗殿查询生死簿。不过要小心，阎罗王脾气不好。",
                options: [
                    { text: "谢谢提醒", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    gui_zu_b: {
        name: "鬼卒B",
        avatar: "gui_zu.png",
        dialogs: [
            {
                id: "greeting",
                text: "这里是幽都，鬼界的都城。活人不应该出现在这里。",
                options: [
                    { text: "我有特殊的原因", action: "none", nextDialog: "special_reason" },
                    { text: "我马上就走", action: "closeDialog", nextDialog: null }
                ]
            },
            {
                id: "special_reason",
                text: "特殊原因？算了，不关我的事。只要你不在这里闹事就行。",
                options: [
                    { text: "我不会闹事的", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    bai_wu_chang: {
        name: "白无常",
        avatar: "bai_wu_chang.png",
        dialogs: [
            {
                id: "greeting",
                text: "咦？活人？你的阳寿还没到，怎么会来到幽都？",
                options: [
                    { text: "我是来寻找我的母亲", action: "none", nextDialog: "find_mother" },
                    { text: "我迷路了", action: "closeDialog", nextDialog: null }
                ]
            },
            {
                id: "find_mother",
                text: "寻找母亲...这种事情很常见。你可以去阎罗殿查询，那里有所有鬼魂的记录。",
                options: [
                    { text: "阎罗殿在哪里？", action: "none", nextDialog: "yanluo_location" }
                ]
            },
            {
                id: "yanluo_location",
                text: "就在幽都的中央，那座最高大的建筑就是。不过要小心，阎罗王不喜欢被打扰。",
                options: [
                    { text: "我会小心的", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    gui_ju_min: {
        name: "鬼居民",
        avatar: "gui_ju_min.png",
        dialogs: [
            {
                id: "greeting",
                text: "你好，姑娘。你看起来不像是这里的鬼魂，是新来的吗？",
                options: [
                    { text: "我是活人，来寻找我的母亲", action: "none", nextDialog: "living_person" },
                    { text: "是的，刚到这里", action: "closeDialog", nextDialog: null }
                ]
            },
            {
                id: "living_person",
                text: "活人？！那你一定要小心，幽都对活人来说很危险。建议你尽快找到你要找的人，然后离开这里。",
                options: [
                    { text: "谢谢你的关心", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    }
};

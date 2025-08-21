// 鬼界蜀山 - 对话配置
window.GameConfig.dialogs.ghost_shushan2 = {
    tianguihuang_guide: {
        name: "天鬼皇",
        avatar: "tianguihuang.png",
        dialogs: [
            {
                id: "greeting",
                text: "恩公，我们已经到达鬼界蜀山了。从这里前往鬼界苏州还需要一段路程。",
                options: [
                    { text: "鬼界看起来和人界很不一样", action: "none", nextDialog: "difference_explanation" },
                    { text: "我们现在就出发吧", action: "closeDialog", nextDialog: null }
                ]
            },
            {
                id: "difference_explanation",
                text: "是的，鬼界虽然与人界对应，但景象截然不同。这里的一切都带着阴森的气息，但对我们鬼族来说，这里就是家。",
                options: [
                    { text: "我明白了", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    jiang_qing: {
        name: "姜清",
        avatar: "jiang_qing.png",
        dialogs: [
            {
                id: "greeting",
                text: "后悔有期！",
                options: [
                    { text: "是，师父", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },

    scholar_ghost: {
        name: "学者鬼",
        avatar: "scholar_ghost.png",
        dialogs: [
            {
                id: "greeting",
                text: "此乃鬼界蜀山，与人间蜀山恰是一对 —— 你在阳世见过蜀山吗？",
                options: [
                    { text: "我就是从那死过来的。", action: "none", nextDialog: "mountain_comparison" }
                ]
            },
            {
                id: "mountain_comparison",
                text: "人间蜀山 '凌虚浮空'，鬼界蜀山便 '沉于渊薮'—— 你看这四面峭壁，像不像把人间的山峰倒过来按进了地里？南面的奈河支流，对应人间蜀山的青衣江。阳世江水绕峰走，清得能看见石缝里的鱼；这阴司河水穿崖过，带着忘川的阴气，摸上去凉得刺骨，流向也和阳世江水正好相反。",
                options: [
                    { text: "你这么一说……", action: "none", nextDialog: "scholarly_research" }
                ]
            },
            {
                id: "scholarly_research",
                text: "生前在翰林院编《山川考》，总疑心天地间有对称的理儿。如今成了鬼，倒得了验证 —— 人间有市集，鬼界便有忘川墟；阳世有日升月落，阴司便有晨昏交替。连这蜀山，都分得这般周正。",
                options: [
                    { text: "你倒是研究得仔细。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },

    shushan_ghost_a: {
        name: "蜀山鬼弟子A",
        avatar: "shushan_ghost.png",
        dialogs: [
            {
                id: "greeting",
                text: "我蜀山弟子向来心无挂碍，多半早早投了轮回井，盼着来世再入仙门。",
                options: [
                    { text: "那你怎么还在这儿打转？", action: "none", nextDialog: "waiting_friend" }
                ]
            },
            {
                id: "waiting_friend",
                text: "我在等一位莫逆之交。他剑法学得精绝，偏生嗜酒如命，整日醉醺醺的，行事不管章法，倒像个江湖浪子，半点不似修仙之人。",
                options: [
                    { text: "这般狂放不羁，蜀山竟容得下？", action: "none", nextDialog: "wine_god" }
                ]
            },
            {
                id: "wine_god",
                text: "他呀，最是奇特 —— 看似玩世不恭，偏自创了套 '酒神' 绝技，越喝越精神，剑招也越疯越烈；若是没酒，反倒蔫得像滩烂泥，倒头就醉。",
                options: [
                    { text: "听着…… 倒让我想起个疯疯癫癫的老伯。", action: "none", nextDialog: "situ_zhong" }
                ]
            },
            {
                id: "situ_zhong",
                text: "哦？你也识得司徒钟？",
                options: [
                    { text: "不认识，只是觉得这性子，倒有几分像。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    shushan_ghost_b: {
        name: "蜀山鬼弟子B",
        avatar: "shushan_ghost.png",
        dialogs: [
            {
                id: "greeting",
                text: "我原是见够了人间的勾心斗角，才投了蜀山 —— 听闻初代掌门太清真人得天帝接引，白日飞升，便也盼着有朝一日能修成仙体。",
                options: [
                    { text: "后来呢？", action: "none", nextDialog: "failed_cultivation" }
                ]
            },
            {
                id: "failed_cultivation",
                text: "嗨，别提了。出师未捷身先死，仙还没修成，命先没了。",
                options: [
                    { text: "那倒真是可惜了。", action: "none", nextDialog: "ghost_life" }
                ]
            },
            {
                id: "ghost_life",
                text: "却不成想做鬼也有做鬼的好，反倒清净 —— 没了贪嗔痴念，也没了那些你争我夺的破事。投胎？我是断断不肯的，尤其不愿投成什么鸡鸭猪羊，到头来还得被人宰了下锅。索性在鬼界安了家。",
                options: [
                    { text: "你觉得舒坦，便好。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    shushan_ghost_c: {
        name: "蜀山鬼弟子C",
        avatar: "shushan_ghost.png",
        dialogs: [
            {
                id: "greeting",
                text: "当年，掌门召集派中顶尖弟子，要布三十六天罡剑阵除魔尊，彻底荡平魔族势力。谁料大战前夜，姜清师兄突然疯了似的冲进锁妖塔…… 人数凑不齐，只得三十五位师兄拼了个残缺的天罡阵，我们三十五位弟子也因此与魔尊同归于尽……",
                options: [
                    { text: "怪不得蜀山派后来规定弟子不得擅入锁妖塔。", action: "none", nextDialog: "hatred" }
                ]
            },
            {
                id: "hatred",
                text: "刚死那阵，我们三十五人对他恨得牙痒痒。这些年，旁人了却尘缘，陆续投了轮回，我偏留下来 —— 就想问问他，当年到底是为了什么。",
                options: [
                    { text: "那现在…… 还恨吗？", action: "none", nextDialog: "forgiveness" }
                ]
            },
            {
                id: "forgiveness",
                text: "如今他也来了鬼界。说实话，这么多年过去，恨早淡了。见他魂魄那般模样才知，他早死了，在锁妖塔里成了地缚灵，被妖怪折腾得不成人形，困了足足十八年…… 罢了，这十八年的罪，权当是他赎了债。我也该去轮回了。",
                options: [
                    { text: "愿你投个好去处。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },

    yue_rou_xia: {
        name: "月柔霞",
        avatar: "yue_rou_xia.png",
        dialogs: [
            {
                id: "greeting",
                text: "如果有机会，一定要再来看我们。",
                options: [
                    { text: "一定会的。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    }
};

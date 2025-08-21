// 鬼门关 - 对话配置
window.GameConfig.dialogs.ghost_gate = {
    linyueru_self: {
        name: "林月如",
        avatar: "linyueru.png",
        dialogs: [
            {
                id: "greeting",
                text: "唔…… 这是哪里？黑沉沉的。",
                options: [
                    { text: "坐起", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    niutou: {
        name: "牛头",
        avatar: "niutou.png",
        dialogs: [
            {
                id: "greeting",
                text: "来者何人？报上名来！",
                options: [
                    { text: "我是当今南武林盟主林天南之女，林月如。", action: "none", nextDialog: "identity_check" }
                ]
            },
            {
                id: "identity_check",
                text: "哦……查到了。林月如，丙寅年生于苏州。奇了，你的阳寿明明还没尽，怎会闯到鬼界来？",
                speaker: "马面",
                options: [
                    { text: "鬼界？我…… 我已经死了？", action: "none", nextDialog: "explain_situation" }
                ]
            },
            {
                id: "explain_situation",
                text: "看这命格，怕是卷入了仙凡争斗，牵动了命数。",
                speaker: "牛头",
                options: [
                    { text: "怎么办？我还不想死！", action: "none", nextDialog: "comfort" }
                ]
            },
            {
                id: "comfort",
                text: "姑娘莫怕。鬼界虽听着唬人，也只是六界之一，有自己的规矩秩序，并非什么龙潭虎穴。",
                speaker: "马面",
                options: [
                    { text: "李大哥呢？灵儿妹子呢？", action: "none", nextDialog: "alone_arrival" }
                ]
            },
            {
                id: "alone_arrival",
                text: "我二人在此值守多年，这鬼门关你是独自来的，没有其他人跟你一起。",
                speaker: "牛头",
                options: [
                    { text: "太好了，他们没事……那我现在应该怎么办？", action: "none", nextDialog: "options_explanation" }
                ]
            },
            {
                id: "options_explanation",
                text: "许是事发仓促，没给你安排引路使者。这样吧，新来的魂魄通常有两条路：一是直接去轮回台，喝了孟婆汤，投胎转世，一切重来；二是在鬼界多待些时日，了却凡间未了的心愿，再去轮回也不迟。",
                speaker: "马面",
                options: [
                    { text: "未了的心愿？", action: "addNPC", npcId: "tianguihuang", nextDialog: "conversation_complete" }
                ]
            },
            {
                id: "conversation_complete",
                text: "就是你在人间还有什么放不下的事情，比如等待思念的亲人，想要算账的仇人，或者是履行一些未完成的承诺。鬼界给了这些魂魄一个机会，让他们能够处理这些心愿，获得真正的解脱。",
                options: [
                    { text: "我明白了", action: "setFlag", flagName: "ghost_gate_main_dialog_complete", flagValue: true, nextDialog: null }
                ]
            },
            {
                id: "simple_explanation",
                text: "新来的魂魄通常有两条路：一是直接去轮回台，喝了孟婆汤，投胎转世，一切重来；二是在鬼界多待些时日，了却凡间未了的心愿，再去轮回也不迟。",
                options: [
                    { text: "未了的心愿？", action: "none", nextDialog: "wish_explanation" }
                ]
            },
            {
                id: "wish_explanation",
                text: "就是你在人间还有什么放不下的事情，比如等待思念的亲人，想要算账的仇人，或者是履行一些未完成的承诺。鬼界给了这些魂魄一个机会，让他们能够处理这些心愿，获得真正的解脱。",
                options: [
                    { text: "我明白了", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    mamian: {
        name: "马面",
        avatar: "mamian.png",
        dialogs: [
            {
                id: "greeting",
                text: "来者何人？报上名来！",
                options: [
                    { text: "我是当今南武林盟主林天南之女，林月如。", action: "none", nextDialog: "identity_check" }
                ]
            },
            {
                id: "identity_check",
                text: "哦……查到了。林月如，丙寅年生于苏州。奇了，你的阳寿明明还没尽，怎会闯到鬼界来？",
                speaker: "马面",
                options: [
                    { text: "鬼界？我…… 我已经死了？", action: "none", nextDialog: "explain_situation" }
                ]
            },
            {
                id: "explain_situation",
                text: "看这命格，怕是卷入了仙凡争斗，牵动了命数。",
                speaker: "牛头",
                options: [
                    { text: "怎么办？我还不想死！", action: "none", nextDialog: "comfort" }
                ]
            },
            {
                id: "comfort",
                text: "姑娘莫怕。鬼界虽听着唬人，也只是六界之一，有自己的规矩秩序，并非什么龙潭虎穴。",
                speaker: "马面",
                options: [
                    { text: "李大哥呢？灵儿妹子呢？", action: "none", nextDialog: "alone_arrival" }
                ]
            },
            {
                id: "alone_arrival",
                text: "我二人在此值守多年，这鬼门关你是独自来的，没有其他人跟你一起。",
                speaker: "牛头",
                options: [
                    { text: "太好了，他们没事……那我现在应该怎么办？", action: "none", nextDialog: "options_explanation" }
                ]
            },
            {
                id: "options_explanation",
                text: "许是事发仓促，没给你安排引路使者。这样吧，新来的魂魄通常有两条路：一是直接去轮回台，喝了孟婆汤，投胎转世，一切重来；二是在鬼界多待些时日，了却凡间未了的心愿，再去轮回也不迟。",
                speaker: "马面",
                options: [
                    { text: "未了的心愿？", action: "addNPC", npcId: "tianguihuang", nextDialog: "conversation_complete" }
                ]
            },
            {
                id: "conversation_complete",
                text: "就是你在人间还有什么放不下的事情，比如等待思念的亲人，想要算账的仇人，或者是履行一些未完成的承诺。鬼界给了这些魂魄一个机会，让他们能够处理这些心愿，获得真正的解脱。",
                options: [
                    { text: "我明白了", action: "setFlag", flagName: "ghost_gate_main_dialog_complete", flagValue: true, nextDialog: null }
                ]
            },
            {
                id: "simple_explanation",
                text: "新来的魂魄通常有两条路：一是直接去轮回台，喝了孟婆汤，投胎转世，一切重来；二是在鬼界多待些时日，了却凡间未了的心愿，再去轮回也不迟。",
                options: [
                    { text: "未了的心愿？", action: "none", nextDialog: "wish_explanation" }
                ]
            },
            {
                id: "wish_explanation",
                text: "就是你在人间还有什么放不下的事情，比如等待思念的亲人，想要算账的仇人，或者是履行一些未完成的承诺。鬼界给了这些魂魄一个机会，让他们能够处理这些心愿，获得真正的解脱。",
                options: [
                    { text: "我明白了", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    
    tianguihuang: {
        name: "天鬼皇",
        avatar: "tianguihuang.png",
        dialogs: [
            {
                id: "greeting",
                text: "恩公！",
                options: [
                    { text: "嘿，你是锁妖塔坛子里出来的那个……", action: "none", nextDialog: "niutou_recognition" }
                ]
            },
            {
                id: "niutou_recognition",
                text: "咦？这不是天鬼族的首领吗？这么久不见，你跑哪儿去了？",
                speaker: "牛头",
                options: [
                    { text: "这说来话长了。", action: "none", nextDialog: "explanation" }
                ]
            },
            {
                id: "explanation",
                text: "我……因为某些缘由，被困到人间的锁妖塔里一阵子，多亏三位恩公，才把我从那鬼地方捞出来。",
                speaker: "天鬼皇",
                options: [
                    { text: "不用谢。你怎么也在鬼界？莫非你也？", action: "none", nextDialog: "ghost_nature" }
                ]
            },
            {
                id: "ghost_nature",
                text: "我们天鬼族本来就是鬼，来往于人鬼两界，自如得很！",
                speaker: "天鬼皇",
                options: [
                    { text: "那你…… 能不能帮我打探下李大哥和灵儿妹子的下落？", action: "none", nextDialog: "friends_safety" }
                ]
            },
            {
                id: "friends_safety",
                text: "恩公放宽心！我回蜀山，远远地看到那剑圣已经把你们仨都救出来了，另两位恩公既然不在这里，定是转危为安，错不了！",
                speaker: "天鬼皇",
                options: [
                    { text: "那就好……", action: "none", nextDialog: "apology" }
                ]
            },
            {
                id: "apology",
                text: "真该死！锁妖塔倒那会儿，大伙只顾着逃命，竟把三位恩公忘在脑后了！害得恩公……",
                speaker: "天鬼皇",
                options: [
                    { text: "你现在说这些也晚了罢，还不得向前看。", action: "none", nextDialog: "leadership_offer" }
                ]
            },
            {
                id: "leadership_offer",
                text: "我先前说过，谁能带大伙出塔，我就把这首领的位置让给谁。如今恩公就是我天鬼族的大哥，说一不二！",
                speaker: "天鬼皇",
                options: [
                    { text: "这我可不敢当。", action: "none", nextDialog: "future_plans" }
                ]
            },
            {
                id: "future_plans",
                text: "恩公现在有何打算吗？",
                speaker: "天鬼皇",
                options: [
                    { text: "我想……去找我的娘亲。", action: "none", nextDialog: "guide_offer" }
                ]
            },
            {
                id: "guide_offer",
                text: "这有何难！就让我给恩公当回引路使者，带你进入这鬼界。",
                speaker: "天鬼皇",
                options: [
                    { text: "这样…… 可以吗？", action: "addPartyMember", memberName: "天鬼皇", nextDialog: "mamian_permission" }
                ]
            },
            {
                id: "mamian_permission",
                text: "这位姑娘阳寿未尽，本就不归我阎罗殿管束。你们要走便走，不碍事。",
                speaker: "马面",
                options: [
                    { text: "谢谢", action: "addLocation", locationId: "ghost_entrance", nextDialog: "conversation_complete" }
                ]
            },
            {
                id: "conversation_complete",
                text: "恩公，鬼界入口已经为你开启了。",
                speaker: "天鬼皇",
                options: [
                    { text: "好的", action: "setFlag", flagName: "tianguihuang_main_dialog_complete", flagValue: true, nextDialog: null }
                ]
            },
            {
                id: "simple_reminder",
                text: "恩公，我们进鬼界入口吧。",
                options: [
                    { text: "好的", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    }
};

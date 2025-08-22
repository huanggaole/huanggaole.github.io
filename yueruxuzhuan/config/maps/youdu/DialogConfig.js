// 幽都 - 对话配置
window.GameConfig.dialogs.youdu = {
    enter_youdu:{
        name: "林月如",
        avatar: "linyueru.png",
        dialogs: [
            {
                id: "greeting",
                text: "咦？这女飞贼怎么走着走着不见了？",
                options: [
                    { text: "不管她", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },
    gui_zu_a: {
        name: "鬼卒A",
        avatar: "gui_zu.png",
        dialogs: [
            {
                id: "greeting",
                text: "这鬼界啊，在六界成形前，原是神界的一块地。伏羲那会儿挑了些上仙，封了神位，让他们在这儿建幽都，说白了就是管轮回的'衙门'。",
                options: [
                    { text: "这么说，鬼界早先也是神界的地盘？", action: "none", nextDialog: "ghost_history" }
                ]
            },
            {
                id: "ghost_history",
                text: "可不是。后来神人兽三族吵得凶，伏羲干脆把天地通道给断了，各管各的，三族分治。但是三族的轮回还是咱们这来掌控。阎王为了保证公正与独立，脱离神界自立为鬼界。阎王统领该界并辅以鬼王治理幽都，但天鬼、火鬼等族群逐渐脱离管制。",
                options: [
                    { text: "哎，要是没那么多争端就好了。", action: "none", nextDialog: "reincarnation_rules" }
                ]
            },
            {
                id: "reincarnation_rules",
                text: "生灵亡故后受阴气牵引至此，经阎罗鬼王审判偿还生前罪孽方可进入轮回。轮回无法掌控，转世后为人还是飞禽走兽都有可能。如在阳世做有损阴德之事，待到亡故后阎罗鬼王宣判，需将此世罪孽偿还之后，才可再入轮回。轮回的流转是绝对的存在，不受任何人包括十殿阎罗的控制，即使伏羲也无法左右。",
                options: [
                    { text: "原来，并不是多行善就能投好胎。", action: "none", nextDialog: "court_case" }
                ]
            },
            {
                id: "court_case",
                text: "对了，现在阎罗殿里正在审判一个案子，听说是个女妖怪杀人的案子，你要不要去看看？",
                options: [
                    { text: "好的", action: "closeDialog", nextDialog: null }
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
                text: "'翳影枝'？你咋知道这物件？那是我们勾魂时跨界用的法器，枝子一摇就能穿六界，专给公干用的——你从哪听来的？",
                options: [
                    { text: "还真有这种东西？我也是听人随口提过一句。", action: "none", nextDialog: "warning" }
                ]
            },
            {
                id: "warning",
                text: "嘘！这可不是能瞎念叨的！私自用翳影枝是大罪，上回有个小鬼偷拿枝子去人间看相好，被鬼王扒了三层魂皮，扔进炼魂炉里烤了七七四十九天，现在还没出来呢！",
                options: [
                    { text: "那'转轮镜台'呢", action: "none", nextDialog: "mirror_platform" }
                ]
            },
            {
                id: "mirror_platform",
                text: "我的娘哎！你咋连这禁地都知道？！那镜台是抓恶鬼用的，甭管藏在哪个角落，没投胎的魂魄都能在镜里显影——这可是阎罗王眼皮子底下的东西，没他手谕敢靠近，直接打入阿鼻地狱，永世不得超生！快别问了！再提这名字，被巡逻的无常听见，咱俩都得遭殃！",
                options: [
                    { text: "我就知道，姬三娘这个不靠谱的……", action: "closeDialog", nextDialog: null }
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
                text: "这里是幽都，鬼界的都城。",
                options: [
                    { text: "您是...白无常大人？", action: "none", nextDialog: "confirm_identity" }
                ]
            },
            {
                id: "confirm_identity",
                text: "正是。你有何事？",
                options: [
                    { text: "我想问问，您是否见过我母亲——柳静荷？", action: "none", nextDialog: "about_mother" }
                ]
            },
            {
                id: "about_mother",
                text: "柳静荷...让我想想...哦，那个为了封印鬼气裂缝而死的女侠？她当年还挺有名。",
                options: [
                    { text: "我娘原本可以不死的……", action: "none", nextDialog: "mother_sacrifice" }
                ]
            },
            {
                id: "mother_sacrifice",
                text: "但是她的死换来了更多苏州百姓的生。我们都很敬重她。没想到今天能见到她的女儿。我在幽都没有见过她投入轮回井。她目前应该还在鬼界。",
                options: [
                    { text: "谢谢白大人！", action: "closeDialog", nextDialog: null }
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
                text: "这位姑娘面生得很，是新来的？",
                options: [
                    { text: "是的，我刚到鬼界不久。", action: "none", nextDialog: "new_arrival" }
                ]
            },
            {
                id: "new_arrival",
                text: "看你这样子，应该是横死的吧？横死的最苦喽。我家那口子当年被塌房砸死，魂魄在这儿飘了五十年才排上轮回。姑娘要是有未了的心愿，趁早去求阎王查生死簿，看看是在鬼界常住还是短住。",
                options: [
                    { text: "多谢指点，我顺其自然就好。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    },

    hei_wu_chang: {
        name: "黑无常",
        avatar: "hei_wu_chang.png",
        dialogs: [
            {
                id: "greeting",
                text: "姑娘，你不怕我的长相吗？",
                options: [
                    { text: "有什么好怕的？", action: "none", nextDialog: "not_afraid" }
                ]
            },
            {
                id: "not_afraid",
                text: "哈哈，这说明你为人正义，光明磊落。做过亏心事的人会认为我面容凶悍，只要看到我的脸就怕得不行。还有人只要听到鬼就怕得不行。",
                options: [
                    { text: "我倒觉得鬼界跟人间没有太大差别。", action: "none", nextDialog: "ghost_world_comparison" }
                ]
            },
            {
                id: "ghost_world_comparison",
                text: "是的，而且阎罗王公私分明，明察秋毫，可比人间的官爷秉公无私多了。阎罗王对有罪者的惩罚，向来依罪孽轻重分阶论罚，轻则磨去戾气，重则打入十八层地狱受永劫之苦，目的是'以刑赎罪'，洗净罪孽后方能入轮回。",
                options: [
                    { text: "都有哪些惩罚呢？", action: "none", nextDialog: "punishments" }
                ]
            },
            {
                id: "punishments",
                text: "生前小过，如口角伤人、占小便宜、懒于尽孝等，罚在'悔罪所'或'忏悔谷'做生前错事的'反向劳作'，比如生前偷懒的，就得在阴司磨坊推磨；生前搬弄是非的，要在'缄口池'里洗嘴；针对欺善怕恶、欠债不还、滥用私刑等罪过，多在'十殿'各层受刑；针对杀人放火、叛国弑亲、修炼邪术等大罪，打入十八层，受永劫之苦。一旦判入，几乎无望轮回。",
                options: [
                    { text: "啧啧，真是瘆人。", action: "closeDialog", nextDialog: null }
                ]
            }
        ]
    }
};

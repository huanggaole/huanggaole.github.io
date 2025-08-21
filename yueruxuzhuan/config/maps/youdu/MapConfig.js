// 幽都 - 地图配置
window.GameConfig.maps.youdu = {
    mapId: "youdu",
    name: "幽都",
    backgroundImage: "youdu_map.jpg",
    backgroundColor: "#2F2F2F",
    backgroundMusic: "058颓城.ogg",
    description: "阴森恐怖的幽都，鬼界的都城，阎罗王统治的地方。",
    geometricElements: [
        {
            type: "rectangle",
            position: { x: "30%", y: "20%" },
            size: { width: "40%", height: "30%" },
            style: {
                backgroundColor: "#1C1C1C",
                border: "3px solid #8B0000",
                opacity: "0.8"
            }
        },
        {
            type: "circle",
            position: { x: "15%", y: "60%" },
            size: { width: "50px", height: "50px" },
            style: {
                backgroundColor: "#4B0082",
                borderRadius: "50%",
                opacity: "0.7"
            }
        },
        {
            type: "circle",
            position: { x: "80%", y: "70%" },
            size: { width: "40px", height: "40px" },
            style: {
                backgroundColor: "#8B0000",
                borderRadius: "50%",
                opacity: "0.6"
            }
        }
    ],
    locations: [
        {
            id: "to_shuzhong",
            name: "蜀中",
            type: "location",
            position: { x: "5%", y: "10%" },
            style: {
                width: "80px",
                height: "30px",
                backgroundColor: "#228B22",
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "3px solid #32CD32",
                fontSize: "0.9rem",
                fontWeight: "bold"
            },
            onClick: { action: "switchToMap", target: "shuzhong" },
            unlocked: true,
            description: "返回蜀中"
        },
        {
            id: "yanluo_dian",
            name: "阎罗殿",
            type: "location",
            position: { x: "45%", y: "35%" },
            style: {
                width: "100px",
                height: "30px",
                backgroundColor: "#8B0000",
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "3px solid #CD5C5C",
                fontSize: "0.9rem",
                fontWeight: "bold"
            },
            onClick: { action: "switchToMap", target: "yanluo_dian" },
            unlocked: true,
            description: "阎罗王的宫殿"
        }
    ],
    npcs: [
        {
            id: "gui_zu_a",
            name: "鬼卒A",
            type: "npc",
            position: { x: "25%", y: "50%" },
            style: {
                width: "80px",
                height: "28px",
                backgroundColor: "#2F4F4F",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #708090",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "gui_zu_a" },
            dialogFile: "youdu",
            description: "幽都的鬼卒，负责维持秩序"
        },
        {
            id: "gui_zu_b",
            name: "鬼卒B",
            type: "npc",
            position: { x: "70%", y: "45%" },
            style: {
                width: "80px",
                height: "28px",
                backgroundColor: "#2F4F4F",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #708090",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "gui_zu_b" },
            dialogFile: "youdu",
            description: "另一个幽都鬼卒"
        },
        {
            id: "bai_wu_chang",
            name: "白无常",
            type: "npc",
            position: { x: "50%", y: "60%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#F5F5F5",
                color: "#000000",
                borderRadius: "5px",
                border: "2px solid #DCDCDC",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "bai_wu_chang" },
            dialogFile: "youdu",
            description: "白无常，负责勾魂的鬼差"
        },
        {
            id: "gui_ju_min",
            name: "鬼居民",
            type: "npc",
            position: { x: "30%", y: "75%" },
            style: {
                width: "80px",
                height: "28px",
                backgroundColor: "#696969",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #A9A9A9",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "gui_ju_min" },
            dialogFile: "youdu",
            description: "居住在幽都的鬼魂"
        }
    ],
    onEnter: {
        action: "showAutoMessage",
        speaker: "林月如",
        text: "咦？这女飞贼怎么走着走着不见了？",
        buttonText: "不管她"
    }
};

// 蜀中 - 地图配置
window.GameConfig.maps.shuzhong = {
    mapId: "shuzhong",
    name: "蜀中",
    backgroundImage: "shuzhong_map.jpg",
    backgroundColor: "#228B22",
    backgroundMusic: "070灵山.ogg",
    description: "绿意盎然的蜀中大地，古树参天，生机勃勃。",
    geometricElements: [
        {
            type: "circle",
            position: { x: "15%", y: "25%" },
            size: { width: "60px", height: "60px" },
            style: {
                backgroundColor: "#006400",
                borderRadius: "50%",
                opacity: "0.8"
            }
        },
        {
            type: "circle",
            position: { x: "75%", y: "40%" },
            size: { width: "80px", height: "80px" },
            style: {
                backgroundColor: "#228B22",
                borderRadius: "50%",
                opacity: "0.7"
            }
        },
        {
            type: "circle",
            position: { x: "35%", y: "65%" },
            size: { width: "50px", height: "50px" },
            style: {
                backgroundColor: "#32CD32",
                borderRadius: "50%",
                opacity: "0.6"
            }
        },
        {
            type: "rectangle",
            position: { x: "60%", y: "20%" },
            size: { width: "40px", height: "100px" },
            style: {
                backgroundColor: "#8B4513",
                opacity: "0.9"
            }
        },
        {
            type: "rectangle",
            position: { x: "25%", y: "45%" },
            size: { width: "30px", height: "80px" },
            style: {
                backgroundColor: "#A0522D",
                opacity: "0.8"
            }
        }
    ],
    locations: [
        {
            id: "to_ghost_shushan2",
            name: "蜀山",
            type: "location",
            position: { x: "5%", y: "50%" },
            style: {
                width: "80px",
                height: "30px",
                backgroundColor: "#4169E1",
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "3px solid #0000FF",
                fontSize: "0.9rem",
                fontWeight: "bold"
            },
            onClick: { action: "switchToMap", target: "ghost_shushan2" },
            // onClick: { action: "endGame"},
            unlocked: true,
            description: "通往蜀山的道路"
        }
    ],
    npcs: [
        {
            id: "enemy_config_1",
            name: "敌人配置1",
            type: "npc",
            position: { x: "30%", y: "30%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#8B0000",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #CD5C5C",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "enemy_config_1" },
            dialogFile: "shuzhong",
            description: "一个敌人配置"
        },
        {
            id: "enemy_config_2",
            name: "敌人配置2",
            type: "npc",
            position: { x: "50%", y: "25%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#8B0000",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #CD5C5C",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "enemy_config_2" },
            dialogFile: "shuzhong",
            description: "另一个敌人配置"
        },
        {
            id: "enemy_config_3",
            name: "敌人配置3",
            type: "npc",
            position: { x: "70%", y: "35%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#8B0000",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #CD5C5C",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "enemy_config_3" },
            dialogFile: "shuzhong",
            description: "第三个敌人配置"
        },
        {
            id: "ji_san_niang",
            name: "姬三娘",
            type: "npc",
            position: { x: "45%", y: "55%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#FF69B4",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #FF1493",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "ji_san_niang" },
            dialogFile: "shuzhong",
            description: "一位美丽的女子，盘踞在树上"
        }
    ]
};

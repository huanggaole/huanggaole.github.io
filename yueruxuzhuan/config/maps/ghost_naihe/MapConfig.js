// 奈河畔 - 地图配置
window.GameConfig.maps.ghost_naihe = {
    mapId: "ghost_naihe",
    name: "奈河畔",
    backgroundImage: "ghost_naihe_map.jpg",
    backgroundColor: "#8B0000",
    backgroundMusic: "087孤雀无栖.ogg",
    description: "奈河畔，红色的天空下，黄色的奈河水缓缓流淌。",
    geometricElements: [
        {
            type: "rectangle",
            position: { x: "0%", y: "70%" },
            size: { width: "100%", height: "30%" },
            style: {
                backgroundColor: "#FFD700",
                opacity: "0.8",
                borderTop: "3px solid #FFA500"
            }
        }
    ],
    locations: [
    ],
    npcs: [
        {
            id: "enemy_config_1",
            name: "敌人配置1",
            type: "npc",
            position: { x: "20%", y: "30%" },
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
            dialogFile: "ghost_naihe",
            description: "一个敌人配置"
        },
        {
            id: "enemy_config_2",
            name: "敌人配置2",
            type: "npc",
            position: { x: "40%", y: "25%" },
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
            dialogFile: "ghost_naihe",
            description: "另一个敌人配置"
        },
        {
            id: "enemy_config_3",
            name: "敌人配置3",
            type: "npc",
            position: { x: "60%", y: "35%" },
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
            dialogFile: "ghost_naihe",
            description: "第三个敌人配置"
        },
        {
            id: "huai_shu_pi",
            name: "槐树皮",
            type: "npc",
            position: { x: "25%", y: "50%" },
            style: {
                width: "80px",
                height: "28px",
                backgroundColor: "#8B4513",
                color: "#F5DEB3",
                borderRadius: "5px",
                border: "2px solid #A0522D",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "huai_shu_pi" },
            dialogFile: "ghost_naihe",
            description: "奈河边的槐树皮，似乎有特殊的用途"
        },
        {
            id: "wang_you_cao",
            name: "忘忧草",
            type: "npc",
            position: { x: "75%", y: "55%" },
            style: {
                width: "80px",
                height: "28px",
                backgroundColor: "#228B22",
                color: "#F0FFF0",
                borderRadius: "5px",
                border: "2px solid #32CD32",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "wang_you_cao" },
            dialogFile: "ghost_naihe",
            description: "奈河边的忘忧草，据说能让人忘却烦恼"
        }
    ]
};

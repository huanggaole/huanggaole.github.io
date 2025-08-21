// 鬼门关 - 地图配置
window.GameConfig.maps.ghost_gate = {
    mapId: "ghost_gate",
    name: "鬼门关",
    backgroundImage: "ghost_gate_map.jpg",
    backgroundColor: "#8B0000",
    backgroundMusic: "058颓城.ogg",
    description: "阴森恐怖的鬼门关，连接阴阳两界的神秘之地。",
    autoTriggerDialog: {
        npcId: "linyueru_self",
        dialogFile: "ghost_gate"
    },
    geometricElements: [
                {
                    type: "gate_arch",
                    position: { x: "43%", y: "40%" },
                    size: { width: "120px", height: "80px" },
                    style: {
                        border: "4px solid #8B0000",
                        borderTop: "4px solid #8B0000",
                        borderRadius: "60px 60px 0 0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            ],
    locations: [],
    npcs: [
        {
            id: "niutou",
            name: "牛头",
            type: "npc",
            position: { x: "35%", y: "75%" },
            style: {
                width: "70px",
                height: "30px",
                backgroundColor: "#8B4513",
                color: "white",
                borderRadius: "5px",
                border: "2px solid #654321"
            },
            onClick: { action: "startDialog", target: "niutou" },
            dialogFile: "ghost_gate",
            description: "鬼门关的守卫牛头"
        },
        {
            id: "mamian",
            name: "马面",
            type: "npc",
            position: { x: "55%", y: "75%" },
            style: {
                width: "70px",
                height: "30px",
                backgroundColor: "#2F4F4F",
                color: "white",
                borderRadius: "5px",
                border: "2px solid #1C3A3A"
            },
            onClick: { action: "startDialog", target: "mamian" },
            dialogFile: "ghost_gate",
            description: "鬼门关的守卫马面"
        }
    ]
}
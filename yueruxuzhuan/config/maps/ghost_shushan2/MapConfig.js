// 鬼界蜀山 - 地图配置
window.GameConfig.maps.ghost_shushan2 = {
    mapId: "ghost_shushan2",
    name: "鬼界蜀山",
    backgroundImage: "ghost_shushan_map.jpg",
    backgroundColor: "#2F4F4F",
    backgroundMusic: "069看尽前尘.ogg",
    description: "阴森恐怖的鬼界蜀山，与人界蜀山截然不同的深邃之地。",
    geometricElements: [
        {
            type: "circle",
            position: { x: "15%", y: "20%" },
            size: { width: "40px", height: "40px" },
            style: {
                border: "2px solid #4B0082",
                backgroundColor: "rgba(75, 0, 130, 0.3)",
                borderRadius: "50%"
            }
        },
        {
            type: "triangle",
            position: { x: "80%", y: "15%" },
            size: { width: "0", height: "0" },
            style: {
                borderLeft: "25px solid transparent",
                borderRight: "25px solid transparent",
                borderBottom: "40px solid #2F0F2F"
            }
        },
        {
            type: "mountain",
            position: { x: "30%", y: "70%" },
            size: { width: "100px", height: "60px" },
            style: {
                backgroundColor: "#1A0A1A",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                border: "2px solid #4B0082"
            }
        },
        {
            type: "shushan_tower",
            position: { x: "50%", y: "10%" },
            size: { width: "60px", height: "80px" },
            style: {
                backgroundColor: "#2F2F2F",
                border: "3px solid #4B0082",
                borderRadius: "5px 5px 0 0",
                boxShadow: "0 0 10px rgba(75, 0, 130, 0.5)"
            }
        },
        {
            type: "ghost_circle",
            position: { x: "70%", y: "60%" },
            size: { width: "50px", height: "50px" },
            style: {
                border: "3px dashed #8A2BE2",
                backgroundColor: "rgba(138, 43, 226, 0.2)",
                borderRadius: "50%",
                animation: "pulse 2s infinite"
            }
        },
        {
            type: "spirit_path",
            position: { x: "10%", y: "50%" },
            size: { width: "80px", height: "20px" },
            style: {
                backgroundColor: "rgba(75, 0, 130, 0.4)",
                border: "1px solid #4B0082",
                borderRadius: "10px",
                transform: "rotate(30deg)"
            }
        },
        {
            type: "meditation_stone",
            position: { x: "85%", y: "70%" },
            size: { width: "35px", height: "35px" },
            style: {
                backgroundColor: "#483D8B",
                border: "2px solid #6A5ACD",
                borderRadius: "3px",
                transform: "rotate(45deg)"
            }
        }
    ],
    locations: [
        {
            id: "to_shuzhong",
            name: "蜀中",
            type: "location",
            position: { x: "80%", y: "20%" },
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
            description: "前往鬼界蜀中"
        }
    ],
    npcs: [
        {
            id: "jiang_qing",
            name: "姜清",
            type: "npc",
            position: { x: "25%", y: "35%" },
            style: {
                width: "120px",
                height: "28px",
                backgroundColor: "#2F4F4F",
                color: "#E0E0E0",
                borderRadius: "5px",
                border: "2px solid #708090",
                fontSize: "0.9rem"
            },
            onClick: { action: "startDialog", target: "jiang_qing" },
            dialogFile: "ghost_shushan2",
            description: "蜀山的鬼魂弟子，生前是蜀山剑派的一员"
        },
        {
            id: "shushan_ghost_a",
            name: "蜀山鬼弟子A",
            type: "npc",
            position: { x: "65%", y: "25%" },
            style: {
                width: "120px",
                height: "28px",
                backgroundColor: "#556B2F",
                color: "#F0F8FF",
                borderRadius: "5px",
                border: "2px solid #6B8E23",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "shushan_ghost_a" },
            dialogFile: "ghost_shushan2",
            description: "一位蜀山弟子的鬼魂，似乎在等待着一位莫逆之交"
        },
        {
            id: "shushan_ghost_b",
            name: "蜀山鬼弟子B",
            type: "npc",
            position: { x: "75%", y: "45%" },
            style: {
                width: "120px",
                height: "28px",
                backgroundColor: "#483D8B",
                color: "#F5F5DC",
                borderRadius: "5px",
                border: "2px solid #6A5ACD",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "shushan_ghost_b" },
            dialogFile: "ghost_shushan2",
            description: "一位蜀山弟子的鬼魂，看起来已经在鬼界安了家"
        },
        {
            id: "shushan_ghost_c",
            name: "蜀山鬼弟子C",
            type: "npc",
            position: { x: "20%", y: "65%" },
            style: {
                width: "120px",
                height: "28px",
                backgroundColor: "#8B4513",
                color: "#FFFAF0",
                borderRadius: "5px",
                border: "2px solid #A0522D",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "shushan_ghost_c" },
            dialogFile: "ghost_shushan2",
            description: "一位蜀山弟子的鬼魂，似乎对某位师兄有着复杂的情感"
        },
        {
            id: "scholar_ghost",
            name: "学者鬼",
            type: "npc",
            position: { x: "45%", y: "55%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#4B0082",
                color: "#E6E6FA",
                borderRadius: "5px",
                border: "2px solid #6A5ACD",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "scholar_ghost" },
            dialogFile: "ghost_shushan2",
            description: "一位学者的鬼魂，在记录着些什么"
        },
        {
            id: "yue_rou_xia",
            name: "月柔霞",
            type: "npc",
            position: { x: "30%", y: "30%" },
            style: {
                width: "100px",
                height: "28px",
                backgroundColor: "#FF69B4",
                color: "#FFFFFF",
                borderRadius: "5px",
                border: "2px solid #FF1493",
                fontSize: "0.8rem"
            },
            onClick: { action: "startDialog", target: "yue_rou_xia" },
            dialogFile: "ghost_shushan2",
            description: "一位神秘的女子，在安抚姜清"
        }
    ]
};

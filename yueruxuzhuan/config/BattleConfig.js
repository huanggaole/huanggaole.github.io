// 月如续传 - 战斗配置
window.GameConfig.battles = {
    encounters: {
        forest_encounter: {
            name: "森林遭遇战",
            description: "在森林深处遭遇了妖怪！",
            probability: 0.8,
            enemies: [{ templateId: "forest_slime", count: 1, level: 1 }],
            rewards: {
                exp: 25,
                gold: 20,
                items: [{ id: "herb", name: "治疗药草", probability: 0.6 }]
            }
        },
        forest_hard_encounter: {
            name: "森林强敌",
            description: "遭遇了强大的森林守护者！",
            probability: 0.3,
            enemies: [
                { templateId: "forest_guardian", count: 1, level: 3 },
                { templateId: "forest_slime", count: 2, level: 2 }
            ],
            rewards: {
                exp: 60,
                gold: 45,
                items: [
                    { id: "magic_herb", name: "灵芝", probability: 0.8 },
                    { id: "forest_crystal", name: "森林水晶", probability: 0.3 }
                ]
            }
        }
    },
    
    enemies: {
        forest_slime: {
            name: "森林史莱姆",
            description: "生活在森林中的温和史莱姆",
            baseStats: { health: 40, mp: 15, attack: 12, defense: 8, speed: 8 },
            skills: ["撞击", "弹跳"],
            aiPattern: "aggressive",
            sprite: "slime.png"
        },
        forest_guardian: {
            name: "森林守护者",
            description: "保护森林的强大树精",
            baseStats: { health: 120, mp: 60, attack: 25, defense: 20, speed: 12 },
            skills: ["藤蔓缠绕", "自然治愈", "树根攻击"],
            aiPattern: "defensive",
            sprite: "tree_guardian.png"
        },
        dungeon_guard: {
            name: "地牢守卫",
            description: "守护地牢的重装战士",
            baseStats: { health: 100, mp: 30, attack: 30, defense: 25, speed: 10 },
            skills: ["重击", "盾牌防御", "战吼"],
            aiPattern: "balanced",
            sprite: "dungeon_guard.png"
        }
    }
};

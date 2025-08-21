// 月如续传 - 主游戏配置
window.GameConfig = {
    // 游戏基本信息
    gameInfo: {
        title: "月如续传",
        version: "1.0.0",
        startingStory: "chapter1",
        startingMap: "ghost_gate"
    },
    
    // 游戏设置
    settings: {
        autoSave: true,
        defaultTransitionTime: 500,
        battleAnimationSpeed: 1000
    }
};

// 初始化其他配置对象
window.GameConfig.stories = {};
window.GameConfig.maps = {};
window.GameConfig.dialogs = {};
window.GameConfig.battles = {};

// 地图加载器 - 统一加载所有地图配置
// 初始化地图配置对象
window.GameConfig.maps = {};

// 地图配置文件列表
window.GameConfig.mapFiles = [
    'config/maps/ghost_shushan2/MapConfig.js',
    'config/maps/ghost_shushan/MapConfig.js',
    'config/maps/ghost_gate/MapConfig.js',
    'config/maps/world/MapConfig.js'
];

// 动态加载地图配置的函数
window.GameConfig.loadMapConfigs = function() {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalFiles = this.mapFiles.length;
        
        if (totalFiles === 0) {
            resolve();
            return;
        }
        
        this.mapFiles.forEach(filePath => {
            const script = document.createElement('script');
            script.src = filePath;
            script.onload = () => {
                loadedCount++;
                console.log(`地图配置已加载: ${filePath}`);
                if (loadedCount === totalFiles) {
                    console.log('所有地图配置加载完成');
                    resolve();
                }
            };
            script.onerror = () => {
                console.error(`地图配置加载失败: ${filePath}`);
                reject(new Error(`Failed to load map config: ${filePath}`));
            };
            document.head.appendChild(script);
        });
    });
};

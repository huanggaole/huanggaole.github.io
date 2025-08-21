// 配置管理器 - 处理游戏配置的加载和管理
class ConfigManager {
    constructor() {
        this.config = null;
        this.maps = new Map();
        this.dialogs = new Map();
        this.stories = new Map();
    }
    
    loadMainConfig() {
        if (!window.GameConfig) {
            throw new Error('游戏配置未找到，请确保game-config.js已正确加载');
        }
        
        this.config = window.GameConfig.gameInfo;
        console.log('主配置已加载:', this.config);
        return this.config;
    }
    
    async loadMap(mapId) {
        // 检查是否已经加载过
        if (this.maps.has(mapId)) {
            return this.maps.get(mapId);
        }
        
        // 从全局配置中获取地图数据
        const mapConfig = window.GameConfig.maps[mapId];
        if (!mapConfig) {
            throw new Error(`找不到地图: ${mapId}`);
        }
        
        // 深拷贝地图配置，避免修改原始配置
        const mapData = JSON.parse(JSON.stringify(mapConfig));
        
        // 缓存地图数据
        this.maps.set(mapId, mapData);
        
        console.log(`地图 ${mapId} 已加载`);
        return mapData;
    }
    
    loadDialogs(dialogFile) {
        // 检查是否已经加载过
        if (this.dialogs.has(dialogFile)) {
            return this.dialogs.get(dialogFile);
        }

        // 从全局配置中获取对话数据
        const dialogConfig = window.GameConfig.dialogs[dialogFile];
        if (!dialogConfig) {
            console.warn(`找不到对话文件: ${dialogFile}`);
            return {};
        }

        // 缓存对话数据
        this.dialogs.set(dialogFile, dialogConfig);

        console.log(`对话文件 ${dialogFile} 已加载`);
        return dialogConfig;
    }
    
    loadStory(storyId) {
        // 检查是否已经加载过
        if (this.stories.has(storyId)) {
            return this.stories.get(storyId);
        }
        
        // 从全局配置中获取剧情数据
        const storyConfig = window.GameConfig.stories[storyId];
        if (!storyConfig) {
            throw new Error(`找不到剧情: ${storyId}`);
        }
        
        // 缓存剧情数据
        this.stories.set(storyId, storyConfig);
        
        console.log(`剧情 ${storyId} 已加载`);
        return storyConfig;
    }
    
    getMapList() {
        return Object.keys(window.GameConfig.maps || {});
    }
    
    getDialogList() {
        return Object.keys(window.GameConfig.dialogs || {});
    }
    
    getStoryList() {
        return Object.keys(window.GameConfig.stories || {});
    }
    
    // 清除缓存
    clearCache() {
        this.maps.clear();
        this.dialogs.clear();
        this.stories.clear();
        console.log('配置缓存已清除');
    }
    
    // 预加载常用配置
    async preloadCommonConfigs() {
        try {
            // 预加载起始地图
            if (this.config && this.config.startingMap) {
                await this.loadMap(this.config.startingMap);
            }
            
            // 预加载起始剧情
            if (this.config && this.config.startingStory) {
                this.loadStory(this.config.startingStory);
            }
            
            console.log('常用配置预加载完成');
        } catch (error) {
            console.warn('预加载配置时出错:', error);
        }
    }
}

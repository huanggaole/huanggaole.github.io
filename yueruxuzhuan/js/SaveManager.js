// 存档管理器 - 处理游戏存档的保存和加载
class SaveManager {
    constructor(game) {
        this.game = game;
        this.saveKey = 'rpg-save';
    }
    
    saveGame() {
        try {
            // 收集动态地图元素
            const dynamicElements = this.getDynamicMapElements();
            
            // 确定游戏状态
            let gamestatus, storyId, currentDialogId;

            if (this.game.currentScene === 'story-scene' && this.game.currentStory && this.game.currentStoryId) {
                gamestatus = 'story';
                storyId = this.game.currentStoryId;  // 使用保存的剧情ID
                currentDialogId = this.game.gameData.story.currentDialog;
            } else {
                gamestatus = 'map';
                storyId = null;
                currentDialogId = null;
            }

            // 保存当前地图的动态状态
            const mapStates = {};
            if (this.game.currentMap) {
                mapStates[this.game.currentMap.mapId] = {
                    npcs: [...this.game.currentMap.npcs],
                    locations: [...this.game.currentMap.locations]
                };
            }

            // 构建存档数据
            const saveData = {
                gameData: this.game.gameData,
                dynamicMapElements: dynamicElements,
                mapStates: mapStates,
                currentMap: this.game.currentMap ? this.game.currentMap.mapId : null,
                gamestatus: gamestatus,
                storyId: storyId,
                currentDialogId: currentDialogId,
                timestamp: new Date().toISOString()
            };
            
            console.log('保存游戏数据:', {
                gameData: this.game.gameData,
                dynamicElements: dynamicElements,
                currentMap: saveData.currentMap
            });
            
            // 保存到localStorage
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('游戏已保存到localStorage');
            
            return true;
        } catch (error) {
            console.error('保存游戏失败:', error);
            alert('保存失败：' + error.message);
            return false;
        }
    }
    
    async loadGame() {
        try {
            const saveDataString = localStorage.getItem(this.saveKey);
            if (!saveDataString) {
                console.log('没有找到存档文件');
                return false;
            }
            
            const saveData = JSON.parse(saveDataString);
            console.log('加载游戏数据:', saveData);
            
            // 检查存档格式完整性
            if (!saveData.gameData || !saveData.gamestatus) {
                console.warn('存档格式不完整，按照没有存档处理');
                return false;
            }

            // 清理当前状态，包括清除geometricElements
            this.clearCurrentState();

            // 恢复游戏数据
            this.game.gameData = saveData.gameData;
            console.log('恢复游戏数据:', this.game.gameData);

            // 恢复动态地图元素
            this.restoreDynamicMapElements(saveData.dynamicMapElements || {});

            // 恢复地图状态
            if (saveData.mapStates) {
                this.game.savedMapStates = saveData.mapStates;
                console.log('恢复地图状态:', saveData.mapStates);
            }

            // 根据gamestatus标记恢复场景
            console.log('恢复游戏状态:', saveData.gamestatus);

            if (saveData.gamestatus === 'story') {
                // 剧情状态恢复
                if (saveData.storyId) {
                    await this.game.showStory(saveData.storyId);
                    // 定位到具体的对话位置
                    if (saveData.currentDialogId !== null && saveData.currentDialogId !== undefined) {
                        this.game.gameData.story.currentDialog = saveData.currentDialogId;
                        this.game.displayStoryDialog();
                    }
                } else {
                    console.warn('剧情ID不完整，返回主菜单');
                    this.game.showScene('main-menu');
                }
            } else if (saveData.gamestatus === 'map') {
                // 地图状态恢复
                if (saveData.currentMap) {
                    await this.game.showMap(saveData.currentMap);
                } else {
                    console.warn('地图信息不完整，返回主菜单');
                    this.game.showScene('main-menu');
                }
            } else {
                console.warn('未知的游戏状态，返回主菜单');
                this.game.showScene('main-menu');
            }
            
            console.log('游戏已加载');
            return true;
        } catch (error) {
            console.error('加载游戏失败:', error);
            alert('加载失败：存档文件可能已损坏');
            return false;
        }
    }
    
    getDynamicMapElements() {
        // 收集所有地图中动态添加的元素
        const dynamicElements = {};
        
        // 检查当前地图的动态元素
        if (this.game.currentMap) {
            const mapId = this.game.currentMap.mapId;
            const originalMap = window.GameConfig.maps[mapId];
            
            if (originalMap) {
                // 找出动态添加的NPC
                const dynamicNPCs = this.game.currentMap.npcs.filter(npc =>
                    !originalMap.npcs.some(originalNpc => originalNpc.id === npc.id)
                );
                
                // 找出动态添加的地点
                const dynamicLocations = this.game.currentMap.locations.filter(location =>
                    !originalMap.locations.some(originalLocation => originalLocation.id === location.id)
                );
                
                if (dynamicNPCs.length > 0 || dynamicLocations.length > 0) {
                    dynamicElements[mapId] = {
                        npcs: dynamicNPCs,
                        locations: dynamicLocations
                    };
                }
            }
        }
        
        // 遍历所有已加载的地图
        if (this.game.configManager && this.game.configManager.maps) {
            this.game.configManager.maps.forEach((map, mapId) => {
                // 跳过当前地图，因为已经处理过了
                if (this.game.currentMap && mapId === this.game.currentMap.mapId) {
                    return;
                }
                
                const originalMap = window.GameConfig.maps[mapId];
                if (originalMap && map) {
                    // 找出动态添加的NPC
                    const dynamicNPCs = map.npcs.filter(npc =>
                        !originalMap.npcs.some(originalNpc => originalNpc.id === npc.id)
                    );
                    
                    // 找出动态添加的地点
                    const dynamicLocations = map.locations.filter(location =>
                        !originalMap.locations.some(originalLocation => originalLocation.id === location.id)
                    );
                    
                    if (dynamicNPCs.length > 0 || dynamicLocations.length > 0) {
                        dynamicElements[mapId] = {
                            npcs: dynamicNPCs,
                            locations: dynamicLocations
                        };
                    }
                }
            });
        }
        
        return dynamicElements;
    }
    
    restoreDynamicMapElements(dynamicElements) {
        // 恢复动态添加的地图元素
        Object.keys(dynamicElements).forEach(mapId => {
            const elements = dynamicElements[mapId];
            
            // 尝试从配置中获取地图
            let map = null;
            if (this.game.configManager.maps.has(mapId)) {
                map = this.game.configManager.maps.get(mapId);
            } else if (window.GameConfig.maps[mapId]) {
                // 如果地图还未加载到configManager中，直接修改原始配置
                map = window.GameConfig.maps[mapId];
            }
            
            if (map) {
                // 恢复动态NPC
                if (elements.npcs) {
                    elements.npcs.forEach(npc => {
                        // 检查是否已存在，避免重复添加
                        if (!map.npcs.some(existingNpc => existingNpc.id === npc.id)) {
                            map.npcs.push(npc);
                        }
                    });
                }
                
                // 恢复动态地点
                if (elements.locations) {
                    elements.locations.forEach(location => {
                        // 检查是否已存在，避免重复添加
                        if (!map.locations.some(existingLocation => existingLocation.id === location.id)) {
                            map.locations.push(location);
                        }
                    });
                }
            }
        });
        
        console.log('动态地图元素已恢复');
    }

    clearCurrentState() {
        // 清理当前地图状态
        this.game.currentMap = null;

        // 清理对话状态
        this.game.currentDialogData = null;
        this.game.currentNpcId = null;
        this.game.currentDialogId = null;

        // 清理剧情状态
        this.game.currentStory = null;
        this.game.currentStoryId = null;
        this.game.currentStoryDialog = 0;

        // 清理所有geometricElements（地图容器中的所有元素）
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = '';
        }

        // 清理地图背景中的所有元素
        const mapBackground = document.getElementById('map-background');
        if (mapBackground) {
            // 清除所有动态添加的按钮和元素
            const dynamicElements = mapBackground.querySelectorAll('.map-btn, .location-btn, .npc-btn');
            dynamicElements.forEach(element => element.remove());
        }

        // 隐藏对话框
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.classList.add('hidden');
        }

        console.log('当前状态和geometricElements已清理');
    }



    hasSaveData() {
        return localStorage.getItem(this.saveKey) !== null;
    }
    
    deleteSaveData() {
        localStorage.removeItem(this.saveKey);
        console.log('存档已删除');
    }
    
    getSaveInfo() {
        try {
            const saveDataString = localStorage.getItem(this.saveKey);
            if (!saveDataString) return null;
            
            const saveData = JSON.parse(saveDataString);
            return {
                timestamp: saveData.timestamp || '未知时间',
                currentMap: saveData.currentMap || '未知地点',
                playerLevel: saveData.gameData?.player?.level || 1,
                gold: saveData.gameData?.player?.gold || 0
            };
        } catch (error) {
            console.error('获取存档信息失败:', error);
            return null;
        }
    }
}

# 地图配置文件夹结构

每个地图都有自己的文件夹，包含相关的配置文件。

## 文件夹结构

```
maps/
├── ghost_shushan/          # 鬼界蜀山
│   ├── MapConfig.js        # 地图配置
│   └── README.md           # 地图说明
├── ghost_gate/             # 鬼门关
│   ├── MapConfig.js        # 地图配置
│   └── README.md           # 地图说明
├── world/                  # 仙剑世界
│   ├── MapConfig.js        # 地图配置
│   └── README.md           # 地图说明
└── README.md               # 本文件
```

## 添加新地图

1. 创建新的地图文件夹，如 `new_map/`
2. 在文件夹中创建 `MapConfig.js` 文件
3. 按照现有格式配置地图数据
4. 在 `index.html` 中添加对应的 script 标签
5. 可选：创建 README.md 说明文件

## 地图配置格式

每个 MapConfig.js 文件应该包含：

```javascript
window.GameConfig.maps.mapId = {
    mapId: "地图ID",
    name: "地图名称",
    backgroundImage: "背景图片",
    backgroundMusic: "背景音乐",
    description: "地图描述",
    geometricElements: [], // 几何装饰元素
    locations: [],         // 可访问的地点
    npcs: []              // NPC配置
};
```

## 注意事项

- 每个地图的 mapId 必须唯一
- 文件夹名称应该与 mapId 保持一致
- 所有路径都相对于项目根目录
- 修改地图配置后需要刷新页面才能生效

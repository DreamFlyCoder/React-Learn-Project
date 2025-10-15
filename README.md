# React 学习项目

一个全面的React学习项目，通过实际示例和交互式组件帮助开发者掌握React的核心概念和最佳实践。

## 🚀 项目特色

- **15+ 个React示例** - 涵盖从基础到高级的各种React概念
- **交互式学习** - 每个示例都可以直接运行和体验
- **响应式设计** - 支持桌面端和移动端访问
- **TypeScript支持** - 包含TypeScript在React中的应用示例
- **现代工具链** - 使用Vite + React 19 + React Router

## 📚 学习内容

### 🎮 游戏示例
- **井字棋游戏** (`/game`) - 复杂的状态管理和交互逻辑
- **中国象棋** (`/chess`) - 更复杂的游戏状态和规则实现

### 🔧 基础组件
- **按钮组件** (`/button`) - 可复用组件的设计和实现
- **计数器** (`/counter`) - 状态管理的基础示例
- **产品表格** (`/product`) - 数据展示和列表渲染

### ⚡ React Hooks
- **React.memo** (`/memo`) - 组件性能优化
- **useMemo** (`/use-memo`) - 计算值缓存
- **useCallback** (`/use-callback`) - 函数缓存
- **useEffect** (`/use-effect`) - 副作用处理
- **useRef** (`/use-ref`) - DOM引用和值保持

### 📝 TypeScript
- **事件类型** (`/event-types`) - React事件处理的类型定义
- **子元素类型** (`/children-types`) - 组件children的类型处理

## 🛠️ 技术栈

- **React 19.1.1** - 最新版本的React框架
- **React Router 7.9.3** - 客户端路由管理
- **TypeScript** - 类型安全的JavaScript
- **Vite 7.1.2** - 快速的构建工具
- **ESLint** - 代码质量检查

## 🚀 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
cd react-first
npm install
```

### 启动开发服务器
```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
react-first/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 图片等资源文件
│   ├── Layout.tsx         # 主布局组件
│   ├── Home.tsx           # 首页组件
│   ├── main.jsx           # 应用入口
│   ├── index.css          # 全局样式
│   ├── App.jsx            # 基础App组件
│   ├── Game.jsx           # 井字棋游戏
│   ├── Chess.jsx          # 象棋游戏
│   ├── Product.tsx        # 产品表格
│   ├── MyButton.tsx       # 按钮组件
│   ├── Counter.tsx        # 计数器
│   ├── memo-learn.jsx     # React.memo示例
│   ├── useMemo-learn.tsx  # useMemo示例
│   ├── use-callback.jsx   # useCallback示例
│   ├── use-effect.jsx     # useEffect示例
│   ├── use-ref.jsx        # useRef示例
│   ├── event-types.tsx    # 事件类型示例
│   └── children-types.tsx # 子元素类型示例
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
└── eslint.config.js       # ESLint配置
```

## 🎯 学习路径建议

1. **基础概念** - 从 `first` 和 `button` 开始，了解React的基本语法
2. **状态管理** - 学习 `counter` 和 `product` 中的状态使用
3. **游戏开发** - 通过 `game` 和 `chess` 理解复杂的状态管理
4. **性能优化** - 学习 `memo`、`use-memo`、`use-callback` 等优化技巧
5. **副作用处理** - 掌握 `use-effect` 和 `use-ref` 的使用
6. **TypeScript** - 学习 `event-types` 和 `children-types` 中的类型定义

## 💡 学习提示

- 每个示例都包含详细的注释和说明
- 建议在浏览器开发者工具中查看组件状态变化
- 可以修改代码来实验不同的实现方式
- 注意观察控制台输出，了解React的工作机制

## 🔧 开发说明

### 代码规范
- 使用ESLint进行代码检查
- 遵循React最佳实践
- 组件命名使用PascalCase
- 文件命名使用kebab-case

### 添加新示例
1. 在 `src/` 目录下创建新的组件文件
2. 在 `Layout.tsx` 中添加导航项
3. 在 `main.jsx` 中添加路由配置
4. 确保组件可以独立运行

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个学习项目！

---

**开始你的React学习之旅吧！** 🎉

import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', component: 'App' },
    { path: '/first', label: '基础示例', component: 'MyApp' },
    { path: '/game', label: '井字棋', component: 'Game' },
    { path: '/chess', label: '象棋', component: 'Chess' },
    { path: '/product', label: '产品表格', component: 'Product' },
    { path: '/button', label: '按钮组件', component: 'MyButton' },
    { path: '/counter', label: '计数器', component: 'Counter' },
    { path: '/memo', label: 'Memo学习', component: 'MemoLearn' },
    { path: '/simple-memo', label: '简单Memo', component: 'SimpleMemo' },
    { path: '/use-memo', label: 'UseMemo学习', component: 'UseMemoLearn' },
    { path: '/use-callback', label: 'UseCallback学习', component: 'UseCallbackLearn' },
    { path: '/use-effect', label: 'UseEffect学习', component: 'EffectLearn' },
    { path: '/use-ref', label: 'UseRef学习', component: 'UseRefLearn' },
    { path: '/event-types', label: '事件类型', component: 'EventTypes' },
    { path: '/children-types', label: '子元素类型', component: 'ChildrenTypes' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>
        {`
          /* 自定义滚动条样式 */
          nav::-webkit-scrollbar {
            width: 6px;
          }
          nav::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
          nav::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
          nav::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          
          /* 移动端响应式样式 */
          @media (max-width: 768px) {
            .mobile-menu-btn {
              display: block !important;
            }
            nav {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            nav.mobile-open {
              transform: translateX(0);
            }
            main {
              margin-left: 0 !important;
              width: 100% !important;
            }
          }
          
          @media (min-width: 769px) {
            .mobile-menu-btn {
              display: none !important;
            }
          }
        `}
      </style>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 移动端菜单按钮 */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'none'
        }}
      >
        {isMobileMenuOpen ? '✕ 关闭' : '☰ 菜单'}
      </button>

      {/* 侧边导航栏 */}
      <nav 
        className={isMobileMenuOpen ? 'mobile-open' : ''}
        style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        zIndex: 1000,
        // 自定义滚动条样式
        scrollbarWidth: 'thin',
        scrollbarColor: '#c1c1c1 #f5f5f5'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>React 学习项目</h2>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '8px' }}>
              <Link
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#007bff' : '#333',
                  backgroundColor: isActive(item.path) ? '#e3f2fd' : 'transparent',
                  borderRadius: '4px',
                  border: isActive(item.path) ? '1px solid #007bff' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#2e7d32'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>💡 提示</h4>
          <p style={{ margin: '0', lineHeight: '1.4' }}>
            点击左侧菜单可以切换不同的React学习示例。每个示例都展示了不同的React概念和用法。
          </p>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main style={{ 
        marginLeft: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
        width: 'calc(100% - 250px)'
      }}>
        <Outlet />
      </main>
      </div>
    </>
  );
}

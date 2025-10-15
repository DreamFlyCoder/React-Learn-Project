import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: '🎮 游戏示例',
      description: '井字棋和象棋游戏，展示复杂的状态管理和交互逻辑',
      links: [
        { to: '/game', label: '井字棋游戏' },
        { to: '/chess', label: '中国象棋' }
      ]
    },
    {
      title: '🔧 基础组件',
      description: '按钮、计数器等基础组件的实现和使用',
      links: [
        { to: '/button', label: '按钮组件' },
        { to: '/counter', label: '计数器' },
        { to: '/product', label: '产品表格' }
      ]
    },
    {
      title: '⚡ React Hooks',
      description: '各种React Hooks的详细示例和最佳实践',
      links: [
        { to: '/memo', label: 'React.memo' },
        { to: '/use-memo', label: 'useMemo' },
        { to: '/use-callback', label: 'useCallback' },
        { to: '/use-effect', label: 'useEffect' },
        { to: '/use-ref', label: 'useRef' }
      ]
    },
    {
      title: '📝 TypeScript',
      description: 'TypeScript在React中的应用，类型定义和事件处理',
      links: [
        { to: '/event-types', label: '事件类型' },
        { to: '/children-types', label: '子元素类型' }
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#333', 
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          React 学习项目
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '20px' 
        }}>
          通过实际项目学习React的各种概念和最佳实践
        </p>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          🚀 包含15+个React示例
        </div>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        {features.map((feature, index) => (
          <div key={index} style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          >
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '15px', 
              color: '#333' 
            }}>
              {feature.title}
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '20px', 
              lineHeight: '1.5' 
            }}>
              {feature.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {feature.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  to={link.to}
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#007bff';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
          💡 学习建议
        </h4>
        <p style={{ margin: '0', color: '#856404', lineHeight: '1.5' }}>
          建议按照左侧菜单的顺序学习，从基础概念开始，逐步深入到高级特性。
          每个示例都包含了详细的注释和说明，帮助您理解React的核心概念。
        </p>
      </div>
    </div>
  );
}

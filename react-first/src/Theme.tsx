import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. 定义 Context 值的类型
type Theme = "light" | "dark" | "system";
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// 2. 创建 Context，并提供一个合理的默认值（或 undefined 并在消费时检查）
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. 自定义 Hook 用于消费 Context，并添加错误检查
const useGetTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useGetTheme must be used within a ThemeProvider');
  }
  return context;
};

// 4. 主题样式工具函数
export const getThemeStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
    margin: '10px'
  },
  button: {
    backgroundColor: theme === 'dark' ? '#007bff' : '#f8f9fa',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    border: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
    margin: '5px',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  text: {
    color: theme === 'dark' ? '#ffffff' : '#000000'
  }
});

// 5. 主题切换按钮组件
export function ThemeToggle() {
  const { theme, setTheme } = useGetTheme();
  const styles = getThemeStyles(theme);

  return (
    <div style={{ marginTop: '10px' }}>
      <button 
        style={styles.button}
        onClick={() => setTheme('light')}
      >
        浅色主题
      </button>
      <button 
        style={styles.button}
        onClick={() => setTheme('dark')}
      >
        深色主题
      </button>
    </div>
  );
}

// 6. 导出自定义 Hook 供其他组件使用
export { useGetTheme };

// 7. 主题提供者组件
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
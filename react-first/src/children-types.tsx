import React from 'react';

// 1. React.ReactNode - 最宽泛的子元素类型
interface BoxProps {
  title: string;
  children: React.ReactNode; // 可以接受任何类型的子元素
}

function Box({ title, children }: BoxProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// 2. React.ReactElement - 只接受 JSX 元素
interface CardProps {
  title: string;
  children: React.ReactElement; // 只接受 JSX 元素，不接受字符串或数字
}

function Card({ title, children }: CardProps) {
  return (
    <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// 3. 具体的子元素类型
interface ListProps {
  items: string[];
  children: (item: string, index: number) => React.ReactNode; // 函数作为子元素
}

function List({ items, children }: ListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{children(item, index)}</li>
      ))}
    </ul>
  );
}

export default function ChildrenTypes() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React 子元素类型示例</h1>
      
      {/* React.ReactNode 示例 */}
      <Box title="React.ReactNode 示例">
        <p>这是一个段落</p>
        <button>这是一个按钮</button>
        <span>这是文字</span>
        {/* 可以接受任何类型的子元素 */}
        <div>直接放字符串: {"Hello World"}</div>
        <div>直接放数字: {123}</div>
        <div>直接放布尔值: {true}</div>
      </Box>

      {/* React.ReactElement 示例 */}
      <Card title="React.ReactElement 示例">
        <div>
          <p>只能接受 JSX 元素</p>
          <button>按钮</button>
        </div>
        {/* 注意：不能直接放字符串或数字，必须包装在 JSX 元素中 */}
      </Card>

      {/* 函数作为子元素 */}
      <div style={{ margin: "10px 0" }}>
        <h3>函数作为子元素</h3>
        <List items={["苹果", "香蕉", "橙子"]}>
          {(item, index) => (
            <span style={{ color: "green" }}>
              {index + 1}. {item}
            </span>
          )}
        </List>
      </div>

      {/* 类型对比说明 */}
      <div style={{ margin: "20px 0", padding: "15px", backgroundColor: "#f5f5f5" }}>
        <h3>类型对比：</h3>
        <ul>
          <li><strong>React.ReactNode:</strong> 最宽泛，可以接受字符串、数字、JSX元素、null、undefined等</li>
          <li><strong>React.ReactElement:</strong> 只接受JSX元素，不接受字符串、数字等原始类型</li>
          <li><strong>函数子元素:</strong> 可以接受函数作为子元素，用于渲染逻辑</li>
        </ul>
      </div>
    </div>
  );
}

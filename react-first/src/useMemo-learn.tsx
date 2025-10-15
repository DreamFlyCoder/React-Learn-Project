import React, { useState, useMemo } from "react";

// 模拟复杂计算函数
function expensiveCalculation(n: number): number {
  console.log("🔥 执行复杂计算...");
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
}

// 模拟数据过滤函数
function filterUsers(users: User[], searchTerm: string): User[] {
  console.log("🔍 执行用户过滤...");
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// 用户类型定义
interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

// 模拟用户数据
const mockUsers: User[] = [
  { id: 1, name: "张三", age: 25, city: "北京" },
  { id: 2, name: "李四", age: 30, city: "上海" },
  { id: 3, name: "王五", age: 28, city: "广州" },
  { id: 4, name: "赵六", age: 35, city: "深圳" },
  { id: 5, name: "钱七", age: 22, city: "杭州" },
  { id: 6, name: "孙八", age: 27, city: "成都" },
  { id: 7, name: "周九", age: 31, city: "武汉" },
  { id: 8, name: "吴十", age: 29, city: "西安" },
];

export default function UseMemoLearn() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [number, setNumber] = useState(10);

  // ❌ 没有使用 useMemo - 每次渲染都会重新计算
  const expensiveValue = expensiveCalculation(number);

  // ✅ 使用 useMemo - 只有当 number 变化时才重新计算
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  // ❌ 没有使用 useMemo - 每次渲染都会重新过滤
  const filteredUsersWithoutMemo = filterUsers(mockUsers, searchTerm);

  // ✅ 使用 useMemo - 只有当 searchTerm 或 mockUsers 变化时才重新过滤
  const filteredUsersWithMemo = useMemo(() => {
    return filterUsers(mockUsers, searchTerm);
  }, [searchTerm]);

  // ✅ 使用 useMemo 计算统计信息
  const userStats = useMemo(() => {
    console.log("📊 计算用户统计信息...");
    const total = filteredUsersWithMemo.length;
    const avgAge = total > 0 
      ? filteredUsersWithMemo.reduce((sum, user) => sum + user.age, 0) / total 
      : 0;
    const cities = [...new Set(filteredUsersWithMemo.map(user => user.city))];
    
    return {
      total,
      avgAge: Math.round(avgAge * 100) / 100,
      cities: cities.length
    };
  }, [filteredUsersWithMemo]);

  // ✅ 使用 useMemo 创建样式对象
  const containerStyle = useMemo(() => ({
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto"
  }), []);

  const cardStyle = useMemo(() => ({
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px 0",
    backgroundColor: "#f9f9f9"
  }), []);

  return (
    <div style={containerStyle}>
      <h1>React.useMemo 学习示例</h1>
      <p>观察控制台输出，了解 useMemo 的缓存机制</p>

      {/* 计数器部分 */}
      <div style={cardStyle}>
        <h2>1. 复杂计算示例</h2>
        <div style={{ margin: "10px 0" }}>
          <label>
            计算数字: 
            <input 
              type="number" 
              value={number} 
              onChange={(e) => setNumber(Number(e.target.value))}
              style={{ margin: "0 10px", padding: "5px" }}
            />
          </label>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ margin: "0 10px", padding: "5px 10px" }}
          >
            触发重新渲染: {count}
          </button>
        </div>
        
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <h3>❌ 没有 useMemo</h3>
            <p>结果: {expensiveValue}</p>
            <p style={{ color: "red", fontSize: "12px" }}>
              每次渲染都重新计算
            </p>
          </div>
          <div>
            <h3>✅ 使用 useMemo</h3>
            <p>结果: {memoizedValue}</p>
            <p style={{ color: "green", fontSize: "12px" }}>
              只有 number 变化时才重新计算
            </p>
          </div>
        </div>
      </div>

      {/* 用户搜索部分 */}
      <div style={cardStyle}>
        <h2>2. 数据过滤示例</h2>
        <div style={{ margin: "10px 0" }}>
          <label>
            搜索用户: 
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入姓名搜索..."
              style={{ margin: "0 10px", padding: "5px", width: "200px" }}
            />
          </label>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ margin: "0 10px", padding: "5px 10px" }}
          >
            触发重新渲染: {count}
          </button>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>❌ 没有 useMemo</h3>
            <p style={{ color: "red", fontSize: "12px" }}>
              每次渲染都重新过滤
            </p>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredUsersWithoutMemo.map(user => (
                <div key={user.id} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>
                  {user.name} - {user.age}岁 - {user.city}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3>✅ 使用 useMemo</h3>
            <p style={{ color: "green", fontSize: "12px" }}>
              只有搜索词变化时才重新过滤
            </p>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredUsersWithMemo.map(user => (
                <div key={user.id} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>
                  {user.name} - {user.age}岁 - {user.city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 统计信息部分 */}
      <div style={cardStyle}>
        <h2>3. 派生状态示例</h2>
        <p>基于过滤结果计算的统计信息（使用 useMemo）</p>
        <div style={{ display: "flex", gap: "20px", margin: "10px 0" }}>
          <div>
            <strong>总用户数:</strong> {userStats.total}
          </div>
          <div>
            <strong>平均年龄:</strong> {userStats.avgAge}
          </div>
          <div>
            <strong>涉及城市:</strong> {userStats.cities}
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div style={cardStyle}>
        <h2>4. useMemo 使用说明</h2>
        <ul style={{ lineHeight: "1.6" }}>
          <li><strong>语法:</strong> <code>useMemo(() =&gt; computation, [dependencies])</code></li>
          <li><strong>作用:</strong> 缓存计算结果，避免不必要的重复计算</li>
          <li><strong>依赖数组:</strong> 只有当依赖项变化时才重新计算</li>
          <li><strong>适用场景:</strong> 复杂计算、数据过滤、派生状态、对象/数组创建</li>
          <li><strong>注意事项:</strong> 不要过度使用，简单的计算不需要 memoization</li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";

export default function SimpleMemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 模拟一个计算
  function calculate() {
    console.log("计算中...");
    return count * 2;
  }

  // ❌ 没有 useMemo - 每次渲染都计算
  const result1 = calculate();

  // ✅ 有 useMemo - 只有 count 变化时才计算
  const result2 = useMemo(() => {
    return calculate();
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>简单的 useMemo 示例</h1>
      
      <div>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名字"
        />
      </div>
      
      <div>
        <button onClick={() => setCount(count + 1)}>
          增加计数: {count}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>没有 useMemo 的结果: {result1}</p>
        <p>有 useMemo 的结果: {result2}</p>
      </div>

      <p style={{ color: "gray", fontSize: "14px" }}>
        打开控制台，输入名字时观察"计算中..."的打印次数
      </p>
    </div>
  );
}

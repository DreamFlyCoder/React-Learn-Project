import { memo, useState } from "react";

// 没有使用 memo 的组件
function ChildWithoutMemo() {
  console.log("❌ ChildWithoutMemo 组件渲染了");
  return (
    <div style={{ border: "2px solid red", padding: "10px", margin: "5px" }}>
      <h3>没有 memo 的子组件</h3>
    </div>
  );
}

// 使用 memo 的组件  Child 只是一个内部函数名，完全可以改成任何您喜欢的名字，或者直接省略
const ChildWithMemo = memo(function Child() {
  console.log("✅ ChildWithMemo 组件渲染了");
  return (
    <div style={{ border: "2px solid green", padding: "10px", margin: "5px" }}>
      <h3>使用 memo 的子组件</h3>
    </div>
  );
});

// 接收 props 的 memo 组件
const ChildWithProps = memo(function Child({ name }) {
  console.log(`🔵 ChildWithProps (${name}) 组件渲染了`);
  return (
    <div style={{ border: "2px solid blue", padding: "10px", margin: "5px" }}>
      <h3>接收 props 的 memo 组件: {name}</h3>
    </div>
  );
});

function MemoLearn() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("初始名称");

  console.log("🟡 MemoLearn 父组件渲染了");

  return (
    <div style={{ padding: "20px" }}>
      <h1>React.memo 学习示例</h1>
      <p>点击按钮观察控制台输出，看看哪些组件重新渲染了</p>

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setCount(count + 1)} style={{ margin: "5px" }}>
          增加计数: {count}
        </button>
        <button onClick={() => setName(name + "!")} style={{ margin: "5px" }}>
          修改名称: {name}
        </button>
      </div>

      <div>
        <ChildWithoutMemo />
        <ChildWithMemo />
        <ChildWithProps name={name} />
      </div>
    </div>
  );
}

export default MemoLearn;

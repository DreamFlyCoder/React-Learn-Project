import { useCallback, useState, memo } from "react";

// 使用 memo 包装子组件，只有当 props 真正改变时才重新渲染，props是一个函数现在，所以不会重新渲染
const Child = memo(function Child({ name }) {
    console.log("Child组件渲染了");
    return <input type="text" onChange={(e) => name(e.target.value)} />;
});

function UseCallbackLearn() {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    
    // 使用 useCallback 来优化函数，避免不必要的重新渲染
    const printChild = useCallback((inputValue) => {
        console.log(inputValue);
        setValue(inputValue);
    }, []);
    
    return (
        <div>
            <h1>UseCallbackLearn</h1>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <Child name={printChild} />
            <p>输入的值: {value}</p>
        </div>
    );
}

export default UseCallbackLearn;
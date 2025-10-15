import React, { useState } from "react";
import MyButton from "./MyButton.tsx";
import { ThemeProvider, useGetTheme, getThemeStyles, ThemeToggle } from "./Theme.tsx";

// 计数器组件（使用主题）
function CounterWithTheme() {
    const [count, setCount] = useState(0);
    const { theme } = useGetTheme();
    const styles = getThemeStyles(theme);

    function addFive() {
        setCount(count + 5);
    }

    function reset() {
        setCount(0);
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.text}>计数器</h2>
            <p style={styles.text}>当前主题：{theme}</p>
            <h1 style={styles.text}>计数：{count}</h1>
            <div>
                <MyButton title="+5" disabled={false} onClick={addFive} />
                <MyButton title="重置" disabled={false} onClick={reset} />
            </div>
            <ThemeToggle />
        </div>
    );
}

// 主组件（提供主题上下文）
export default function Counter() {
    return (
        <ThemeProvider>
            <CounterWithTheme />
        </ThemeProvider>
    );
}
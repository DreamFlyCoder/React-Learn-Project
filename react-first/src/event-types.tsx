import React, { useState } from 'react';

export default function EventTypes() {
  const [inputValue, setInputValue] = useState("");
  const [buttonText, setButtonText] = useState("点击我");

  // 1. 输入框事件 - React.ChangeEvent<HTMLInputElement>
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("输入框值变化:", event.currentTarget.value);
    setInputValue(event.currentTarget.value);
  }

  // 2. 按钮点击事件 - React.MouseEvent<HTMLButtonElement>
  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    setButtonText("已点击！");
    console.log("按钮被点击了", event);
  }

  // 3. 表单提交事件 - React.FormEvent<HTMLFormElement>
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止默认提交行为
    console.log("表单提交了");
  }

  // 4. 通用事件 - React.SyntheticEvent
  function handleGenericEvent(event: React.SyntheticEvent) {
    console.log("通用事件触发");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>React DOM 事件类型示例</h1>
      
      {/* 输入框事件 */}
      <div style={{ margin: "10px 0" }}>
        <h3>1. 输入框事件</h3>
        <input 
          type="text" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入文字"
        />
        <p>输入的值: {inputValue}</p>
      </div>

      {/* 按钮点击事件 */}
      <div style={{ margin: "10px 0" }}>
        <h3>2. 按钮点击事件</h3>
        <button onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>

      {/* 表单提交事件 */}
      <div style={{ margin: "10px 0" }}>
        <h3>3. 表单提交事件</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="用户名" />
          <button type="submit">提交</button>
        </form>
      </div>

      {/* 通用事件 */}
      <div style={{ margin: "10px 0" }}>
        <h3>4. 通用事件</h3>
        <div 
          onClick={handleGenericEvent}
          style={{ 
            padding: "10px", 
            backgroundColor: "#f0f0f0", 
            cursor: "pointer",
            border: "1px solid #ccc"
          }}
        >
          点击这个div
        </div>
      </div>
    </div>
  );
}

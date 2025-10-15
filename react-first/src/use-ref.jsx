import { useRef, useState } from "react";

function UseRefLearn() {
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState("");
  
  const handleInputChange = () => {
    if (inputRef.current) {
      setDisplayValue(inputRef.current.value);
    }
  };
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div>
      <h1>UseRefLearn</h1>
      <input 
        type="text" 
        ref={inputRef} 
        onChange={handleInputChange}
        placeholder="输入一些内容"
      />
      <button onClick={focusInput}>聚焦输入框</button>
      <p>输入的值: {displayValue}</p>
      <p>ref.current: {inputRef.current ? inputRef.current.value : "null"}</p>
    </div>
  );
}
export default UseRefLearn;

import './App.css'
import { useMemo, useState } from 'react'


function calculate(n) {
  console.log("计算函数执行了！")
  return n*n
}

function App() {
  //useMemo
  const [count1,setCount1] = useState(0)
  const [count2,setCount2] = useState(0)
  
//  const result = calculate(count1)
const result = useMemo(() =>{
  return calculate(count1)
},[count1])
  console.log("组件重新渲染了！")
  return (
    <>
<button onClick={()=>setCount1(count1+1)}>{count1}</button>
<button onClick={()=>setCount2(count2+1)}>{count2}</button>
<p>计算结果：{result}</p>
    </>
  )
}

export default App

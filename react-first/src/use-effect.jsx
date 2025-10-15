import { useEffect, useState } from "react";

function Son() {
  useEffect(() => {
    console.log("Son组件渲染了");
    const timer = setInterval(() => {
      console.log("Son组件定时器执行了");
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("Son组件卸载了");
    };
  }, []);
  return <div>this is son</div>;
}

function EffectLearn() {
  const [state, setState] = useState(false);
  return (
    <div>
      <h1>EffectLearn</h1>
      <button onClick={() => setState(!state)}>{state ? "true" : "false"}</button>
      {state && <Son />}
    </div>
  );
}

export default EffectLearn;

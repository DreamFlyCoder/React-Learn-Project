import { useState } from "react";

const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];

function MyApp() {
  const [count, setCount] = useState(0);
  const list = products.map((item) => <li key={item.id}>{item.title}</li>);
  function handleClick() {
    setCount(count + 1)
    alert("点击事件");
  }

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
          handleClick();
        }}
      >
        +1
      </button>
      <Share count={count} onClick={handleClick}></Share>
      <Share count={count} onClick={handleClick}></Share>
      {list}
      {count}
    </div>
  );

  function Share({ count, onClick }) {
    return (<button onClick={onClick}>
        点击次数：{count}
    </button>
    )
  }
}

export default MyApp;

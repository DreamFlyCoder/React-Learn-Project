import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// 导入布局组件
import Layout from "./Layout.tsx";
import Home from "./Home.tsx";

// 导入所有学习组件
import App from "./App.jsx";
import MemoLearn from "./memo-learn.jsx";
import EffectLearn from "./use-effect.jsx";
import UseCallbackLearn from "./use-callback.jsx";
import UseRefLearn from "./use-ref.jsx";
import Game from "./Game.jsx";
import Chess from "./Chess.jsx";
import MyApp from "./first.jsx";
import MyGame from "./MyGame.jsx";
import Product from "./Product.tsx";
import MyButton from "./MyButton.tsx";
import Counter from "./counter.tsx";
import UseMemoLearn from "./useMemo-learn.tsx";
import SimpleMemo from "./simple-memo.tsx";
import EventTypes from "./event-types.tsx";
import ChildrenTypes from "./children-types.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="first" element={<MyApp />} />
          <Route path="game" element={<Game />} />
          <Route path="chess" element={<Chess />} />
          <Route path="product" element={<Product />} />
          <Route path="button" element={<MyButton />} />
          <Route path="counter" element={<Counter />} />
          <Route path="memo" element={<MemoLearn />} />
          <Route path="simple-memo" element={<SimpleMemo />} />
          <Route path="use-memo" element={<UseMemoLearn />} />
          <Route path="use-callback" element={<UseCallbackLearn />} />
          <Route path="use-effect" element={<EffectLearn />} />
          <Route path="use-ref" element={<UseRefLearn />} />
          <Route path="event-types" element={<EventTypes />} />
          <Route path="children-types" element={<ChildrenTypes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

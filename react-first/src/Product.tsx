import React, { useState } from "react";
import MyButton from "./MyButton";

// 类型定义
interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
}

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

interface ProductCategoryRowProps {
  category: string;
}

interface ProductRowProps {
  product: Product;
}

const PRODUCTS: Product[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <MyButton title="按钮adfd" disabled={false}></MyButton>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  //弹性 垂直 间距10
  //文本输入框
  //复选框   {}是空格  label使得点击文字也可以勾选
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    //-1为找不到
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  //列跨度
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td style={{ padding: "20px 0" }}>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

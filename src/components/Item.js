import React from "react";

function Item({ item, onUpdateItem, setItems }) {

  function handleDeleteClick () {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    //.then((r) => r.json())
    .then(() => handleDeleteItem(item));
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = item.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems)
  }

  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application"
      },
      body: JSON.stringify({
        isIncart: !item.isInCart,
      }),
    })
    .then((r) => r.json())
    .then((updatedItem) => onUpdateItem(updatedItem))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;

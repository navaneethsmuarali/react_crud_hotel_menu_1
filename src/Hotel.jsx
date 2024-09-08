// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import FoodMenu from '../src/Food_menu.json'; // Ensure the path to your JSON file is correct.

function Menu() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.name === item.name);

    if (itemInCart) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove items from the cart (decrement quantity)
  const decrementQuantity = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === item.name && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  // Function to remove items from the cart completely
  const removeFromCart = (item) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.name !== item.name)
    );
  };

  return (
    <>
      
      <div className="cart">
        <h2>Added Items</h2>
        {cart.length === 0 ? (
          <p>No items added.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="added-item">
              <p>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </p>
              <button
                className="remove-button"
                onClick={() => decrementQuantity(item)}
              >
                Remove Quantity
              </button>
              <button
                className="remove-completely-button"
                onClick={() => removeFromCart(item)}
              >
                Remove Completely
              </button>
            </div>
          ))
        )}
      </div>
    
      <div className="Main_div">
        <h1>Food Menu</h1>
        <div className="menu_con">
          {FoodMenu.map((item, index) => (
            <div key={index} className="card">
              <img
                src={item.image}
                alt={item.name}
                className="card-image"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h4 className="card-name">{item.name}</h4>
              <p className="card-category">{item.category}</p>
              <p className="card-description">{item.description}</p>
              <p className="card-price">${item.price.toFixed(2)}</p>
              <button className="add-button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;

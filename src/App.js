import React, { useState, useEffect } from "react";
import Home from "./views/Home";
import Nav from "./components/Nav";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import ToDoList from "./views/ToDoList";
import ToDoItem from "./components/ToDoItem";
import SingleProduct from "./views/SingleProduct";
import "./App.css";
import Shop from "./views/Shop";
import Cart from "./views/Cart";

import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem("user");
    if (foundUser) {
      return JSON.parse(foundUser);
    }
    return {};
  };

  const [user, setUser] = useState(getUserFromLocalStorage());
  const [cart, setCart] = useState([]);

  const logMeIn = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logMeOut = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const newCart = [...cart];
    for (let i = cart.length - 1; i >= 0; i--) {
      if (product.id === cart[i].id) {
        newCart.splice(i, 1);
        break;
      }
    }
    setCart(newCart);
  };

  const getCart = async (user) => {
    if (user.token) {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "ok") {
        setCart(data.cart);
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    getCart(user);
  }, [user]);

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} cart={cart} logMeOut={logMeOut} />
      </div>
      <header className="App-header">
        <div>
          {/* {BLOCK CONTENT} */}

          <Routes>
            <Route path="/" element={<Home age={22} />} />
            <Route path="/login" element={<Login logMeIn={logMeIn} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/todoitem" element={<ToDoItem />} />
            <Route
              path="/shop"
              element={<Shop addToCart={addToCart} user={user} />}
            />
            <Route path="/shop/:productId" element={<SingleProduct />} />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} removeFromCart={removeFromCart} user={user} />
              }
            />
          </Routes>

          {/* {BLOCK CONTENT} */}
        </div>
      </header>
    </BrowserRouter>
  );
}

// -- To Do List Code Below --
// import React from 'react';
// import './App.css';
// import ToDoList from './ToDoList';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

// library.add(faTrash)

// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       items:[],
//       currentItem:{
//         text:'',
//         key:''
//       }
//     }
//     this.addItem = this.addItem.bind(this);
//     this.handleInput = this.handleInput.bind(this);
//     this.deleteItem = this.deleteItem.bind(this);
//     this.setUpdate = this.setUpdate.bind(this);
//   }
//   addItem(e){
//     e.preventDefault();
//     const newItem = this.state.currentItem;
//     if(newItem.text !==""){
//       const items = [...this.state.items, newItem];
//     this.setState({
//       items: items,
//       currentItem:{
//         text:'',
//         key:''
//       }
//     })
//     }
//   }

//   handleInput(e){
//     this.setState({
//       currentItem:{
//         text: e.target.value,
//         key: Date.now()
//       }
//     })
//   }

//   deleteItem(key){
//     const filteredItems= this.state.items.filter(item =>
//       item.key!==key);
//     this.setState({
//       items: filteredItems
//     })

//   }
//   setUpdate(text,key){
//     console.log("items:"+this.state.items);
//     const items = this.state.items;
//     items.map(item=>{
//       if(item.key===key){
//         console.log(item.key +"    "+key)
//         item.text= text;
//       }
//     })
//     this.setState({
//       items: items
//     })

//   }

//  render(){
//   return (
//     <div className="App">
//       <header>
//         <form id="to-do-form" onSubmit={this.addItem}>
//           <input type="text" placeholder="To Do List" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
//           <button type="submit">Add</button>
//         </form>
//         <p>{this.state.items.text}</p>
//           <ToDoList items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
//       </header>
//     </div>

//   );
//  }
// }

// export default App;

// -- Shop Below --

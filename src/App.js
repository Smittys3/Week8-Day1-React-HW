// import React, { Component } from 'react';
// import Contact from './Contact';
// import Home from './Home';
// import Nav from './Nav';
// import Register from './Register';
// import ToDoList from './ToDoList';
// import {Routes, Route, BrowserRouter} from 'react-router-dom';
// import './App.css';
// -- DAY 1 CODE ABOVE -- 


// -- To Do List Code Below --
import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })   
   
  }

 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="To Do List" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>
        <p>{this.state.items.text}</p>
          <ToDoList items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
      </header>
    </div>

  );
 }
}


export default App;





// -- DAY 1 CODE BELOW --


// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       posts: [],
//       user: {},
//       name: 'Stephen',
//       age: 100
//     }
//   }

//   subtractFromAge = () => {
//     this.setState({age: this.state.age - 1}) 
//   }

//   render() {
//     return (
//       <BrowserRouter>
//         <div>
//           <Nav />
//         </div>
//         <header className="App-header">
//           <div>
            
//             <button onClick={this.subtractFromAge} type="button" class="btn btn-info">Countdown</button>

//             {/* {BLOCK CONTENT} */}
//             <Routes>
//               <Route path='/' element={<Home name={this.state.name}  age={this.state.age}/>}/>
//               <Route path='/contact' element={<Contact/>}/>
//               <Route path='/register' element={<Register/>}/>
//               <Route path='/todo' element={<ToDoList/>}/>
//             </Routes>
//             {/* {BLOCK CONTENT} */}

//           </div>
//         </header>
//       </BrowserRouter>
//     )
//   }
// }


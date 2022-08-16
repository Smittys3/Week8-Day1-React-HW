import React, { Component } from 'react';
import Contact from './Contact';
import Home from './Home';
import Nav from './Nav';
import Register from './Register';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
      name: 'Stephen',
      age: 100
    }
  }

  subtractFromAge = () => {
    this.setState({age: this.state.age - 1}) 
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
        </div>
        <header className="App-header">
          <div>
            
            
            <button onClick={this.subtractFromAge} type="button" class="btn btn-info">Countdown</button>

            
            {/* {BLOCK CONTENT} */}
            <Routes>
              <Route path='/' element={<Home name={this.state.name}  age={this.state.age}/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
            {/* {BLOCK CONTENT} */}

          </div>
        </header>
      </BrowserRouter>
    )
  }
}


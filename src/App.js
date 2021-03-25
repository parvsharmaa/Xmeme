import React, { Component } from 'react'
import './App.css'
import Form from './components/Form'
import PostList from './components/PostList'



function App() {
  return (
    <div className="App">
    <div className="title">
        <h1> XMeme </h1>
        <hr/>
     </div>
     <h1> Meme Stream </h1>
       <Form />
       <br/>
       <h2> Post your Memes here! </h2>
       <PostList />
    </div>
  );
}

export default App;

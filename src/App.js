import React from 'react';
import 'normalize.css';
import './App.css';
import Header from "./components/Header";
import Order from "./components/Order";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Order/>
        </div>
    );
}

export default App;

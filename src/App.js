import React from 'react';
import 'normalize.css';
import './App.css';
import Header from './components/Header';
import Order from './components/Order/Order';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Order />
            <Footer />
        </div>
    );
};

export default App;

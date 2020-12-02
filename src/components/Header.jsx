import React from 'react';
import logo from '../assets/images/logo.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="headerLeft">
                    <a href="/">
                        <img src={logo} alt="logo" className="logo" />
                    </a>

                    <nav className="menu">
                        <ul>
                            <li><a href="/">Про нас</a></li>
                            <li><a href="/">Ціни</a></li>
                            <li><a href="/">Редактори</a></li>
                            <li><a href="/">Блог</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="buttonWrap">
                    <a href="/" className="button">Перевірити текст</a>
                </div>
            </div>

        </header>
    );
};

export default Header;

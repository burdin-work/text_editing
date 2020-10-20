import React, {useState} from 'react';
import classnames from 'classnames';


const OrderLanguage = () => {

    const [show, setShow] = useState({ua: false, ru: false, en: false});

    const toggleClass = (key) => {
        setShow({
            ...show,
            [key]: !show[key]
        });
    };

    return (
        <div className="order__language">
            <h3>Мова</h3>
            <div className="radioButtons">

                <div  className={classnames('radioButton', { 'active': show })}>
                    <div className="circle"/>
                    <input type="checkbox" name="ua" value="ua" />
                        <label>Українська</label>
                </div>

                <div id="ru" className="radioButton">
                    <div className="circle"/>
                    <span>Російська</span>
                </div>
                <div id="en" className="radioButton">
                    <div className="circle"/>
                    <span>Англійська</span>
                </div>
            </div>
        </div>
    );
};

export default OrderLanguage;
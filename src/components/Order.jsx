import React from 'react';
import OrderEditing from "./OrderEditing";
import OrderLanguage from "./OrderLanguage";

const Order = () => {


    return (
        <form className="order container">
            <div className="orderLeft">
                <OrderEditing/>
                <OrderLanguage/>


                <div className="order__comment">
                    <div className="inputWrap">
                        <input type="text" className="input" placeholder="Стислий коментар або покликання"/>
                    </div>
                </div>

            </div>

            <div className="orderRight">
                <div className="order__submit">
                    <div className="price">
                        <span>0,00</span><span>грн</span>
                    </div>
                    <div className="buttonWrap">
                        <button href="/" className="button">Замовити</button>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default Order;
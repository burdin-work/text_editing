import React from 'react';

const OrderSubmit = ({orderPrice}) => {



    return (
        <div className="order__submit">
            <div className="price">
                <span>{orderPrice.toFixed(2).split('.').join(',')}</span><span>грн</span>
            </div>
            <div className="buttonWrap">
                <button href="/" className="button">Замовити</button>
            </div>
        </div>
    );
};

export default OrderSubmit;
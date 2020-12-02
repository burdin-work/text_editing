import React from 'react';
import PeriodExecution from './PeriodExecution';

const OrderSubmit = ({ orderPrice, leadTime }) => {
    return (
        <div className="order__submit">
            <div className="price">
                <span>{orderPrice.toFixed(2).split('.').join(',')}</span>
                <span>грн</span>
            </div>

            { !!orderPrice && <PeriodExecution leadTime={leadTime} /> }

            <div className="buttonWrap">
                <a href="/" type="button" className="button">Замовити</a>
            </div>
        </div>
    );
};

export default OrderSubmit;

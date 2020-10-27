import React from 'react';
import PeriodExecution from "./PeriodExecution";

const OrderSubmit = ({orderPrice, leadTime}) => {


    return (
        <div className="order__submit">
            <div className="price">
                <span>{orderPrice.toFixed(2).split('.').join(',')}</span><span>грн</span>
            </div>

            { !!orderPrice && <PeriodExecution leadTime={leadTime}/> }

            <div className="buttonWrap">
                <button href="/" className="button">Замовити</button>
            </div>
        </div>
    );
};

export default OrderSubmit;
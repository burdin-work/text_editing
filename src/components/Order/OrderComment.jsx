import React from 'react';

const OrderComment = () => {
    return (
        <div className="order__comment">
            <div className="inputWrap">
                <input type="text" className="input" placeholder="Стислий коментар або покликання"/>
            </div>
        </div>
    );
};

export default OrderComment;
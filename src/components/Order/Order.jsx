import React, { useEffect, useState } from 'react';
import OrderEditing from './OrderEditing/OrderEditing';
import OrderLanguage from './OrderLanguage';
import OrderComment from './OrderComment';
import OrderSubmit from './OrderSubmit/OrderSubmit';
import { countTime, priceCalculation } from './functions';

const Order = () => {
    const [d, setData] = useState({
        language: '',
        extension: '',
        areaText: '',
        orderPrice: 0,
        leadTime: '',
    });

    const toggleLanguageRadio = (key) => {
        setData({
            ...d,
            language: key,
        });
    };

    const selectExtension = (e) => {
        setData({
            ...d,
            extension: e.target.value,
        });
    };

    const getAreaText = (e) => {
        setData({
            ...d,
            areaText: e.target.value,
        });
    };

    useEffect(() => {
        if (d.language) {
            if (d.areaText.length > 0) {
                setData({
                    ...d,
                    orderPrice: priceCalculation(
                        d.language,
                        d.extension,
                        d.areaText.length,
                    ),
                    leadTime: countTime(
                        d.language,
                        d.extension,
                        d.areaText.length,
                    ),
                });
            } else {
                setData({
                    ...d,
                    orderPrice: 0,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [d.areaText, d.language, d.extension, d.orderPrice]);

    return (
        <div className="main-content">
            <form className="order container">
                <div className="orderLeft">
                    <OrderEditing
                        selectExtension={selectExtension}
                        getAreaText={getAreaText}
                        areaText={d.areaText}
                        extension={d.extension}
                        data={d}
                        setData={setData}
                    />

                    <OrderLanguage
                        toggleLanguageRadio={toggleLanguageRadio}
                        activeRadio={d.language}
                    />
                    <OrderComment />
                </div>

                <div className="orderRight">
                    <OrderSubmit
                        orderPrice={d.orderPrice}
                        leadTime={d.leadTime}
                    />
                </div>
            </form>
        </div>
    );
};

export default Order;

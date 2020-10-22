import React, {useEffect, useState} from 'react';
import OrderEditing from "./OrderEditing/OrderEditing";
import OrderLanguage from "./OrderLanguage";
import OrderComment from "./OrderComment";
import OrderSubmit from "./OrderSubmit";

const priceCalculation = (language, extension, areaText) => {
    let min_price, unit_cost, price;

    language === 'en' ? min_price = 120 : min_price = 50;

    if(areaText.length < 1000) {
         price = min_price;
    } else {
        language === 'en' ? unit_cost = 0.12 : unit_cost = 0.05;
        price = unit_cost * areaText.length;
        console.log('price= ' + price)
    }

    if (extension === 'other') {
        return price + price / 100 * 20;
    }
    console.log('price= ' + price)
    return price;
}


const Order = () => {

    const [d, setData] = useState({
        language: '',
        extension: '',
        areaText: '',
        orderPrice: 0
    });

    const toggleLanguageRadio = (key) => {
        setData({
            ...d,
            language: key
        })
    }

    const selectExtension = (e) => {
            setData({
                ...d,
                extension: e.target.value
            });
    }

    const getAreaText = (e) => {
        setData({
            ...d,
            areaText: e.target.value
        });
    }

    useEffect(() => {
        if (d.language) {

            if (d.areaText.length > 0) {
                setData({
                    ...d,
                    orderPrice: priceCalculation(d.language, d.extension, d.areaText)
                })
            } else {
                setData({
                    ...d,
                    orderPrice: 0
                })
            }

        }
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
                        setData={setData}/>

                    <OrderLanguage toggleLanguageRadio={toggleLanguageRadio} activeRadio={d.language}/>
                    <OrderComment/>
                </div>

                <div className="orderRight">
                    <OrderSubmit orderPrice={d.orderPrice}/>
                </div>

            </form>
        </div>
    );
};

export default Order;
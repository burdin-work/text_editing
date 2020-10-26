import React, {useEffect, useState} from 'react';
import OrderEditing from "./OrderEditing/OrderEditing";
import OrderLanguage from "./OrderLanguage";
import OrderComment from "./OrderComment";
import OrderSubmit from "./OrderSubmit/OrderSubmit";
import moment from 'moment'
import 'moment-timezone';
import 'moment-weekday-calc';


const priceCalculation = (language, extension, textLength) => {
    let min_price, unit_cost, price;

    language === 'en'  ?  min_price = 120  :  min_price = 50;

    if(textLength < 1000) {
         price = min_price;
    } else {
        language === 'en'  ?  unit_cost = 0.12  :  unit_cost = 0.05;
        price = unit_cost * textLength;
    }

    if (extension === 'other') {
        return price + price / 100 * 20;
    }

    return price;
}


const countTime = (language, extension, textLength) => {

    let speed, workHoursToday, numHoursAllTime, numDays, numHoursAndMinutes, numHours, numMinutes;

    const startDate = moment(new Date(),).utc().tz("Europe/Kiev");
    const date = new Date();

    // get timeNow (9:45 -> 9.75)
    const hoursNow = +(((date.getHours() * 60 + date.getMinutes()) / 60).toFixed(2));

    hoursNow > 17.5 || moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7
        ? workHoursToday = 0
        : workHoursToday = 19 - hoursNow;

    language === 'en' ? speed = 333 : speed = 1333;

    // searching numHoursAllTime
    textLength > speed
        ? numHoursAllTime = textLength / speed + 0.5
        : numHoursAllTime = 0.5;

    if (extension === 'other') numHoursAllTime = numHoursAllTime + numHoursAllTime/100*20;

    console.log('numHoursAllTime= ' + numHoursAllTime);
    console.log('workHoursToday= ' + workHoursToday);

    // searching numDays
    if (numHoursAllTime > workHoursToday) {

        numHoursAllTime - workHoursToday > 9
            ? numDays = Math.floor((numHoursAllTime - workHoursToday) / 9) + 1
            : numDays = 1;

        numHoursAndMinutes = (numHoursAllTime - workHoursToday) % 9;
    } else {
        numDays = 0;


        numHoursAndMinutes = 9 - (workHoursToday - numHoursAllTime);
    }

    // searching numHours & numMinutes
    console.log('numHoursAndMinutes= ' + numHoursAndMinutes)
    if (textLength < speed) {
        numHours = 1;
        numMinutes = '30';
    } else {

        if (numHoursAndMinutes <= 0.5) {
            numHours = 0;
            numMinutes = '30';
        } else {
            numHours = Math.round(numHoursAndMinutes);
            if (+(String(numHoursAndMinutes).split('.')[1][0]) >= 5) {
                numMinutes = '00';
            } else {
                numMinutes = '30';
            }
        }
    }

    // moment.js plugin allows to define date by iterating over weekdays only
    let desiredDate = moment(startDate).isoAddWeekdaysFromSet({
        'workdays': numDays,
        'weekdays': [1, 2, 3, 4, 5],
        'exclusions': []
    }).format('DD.MM.YY');

    return 'Термін виконання: ' + desiredDate + '  о ' + (numHours + 10) + ':' + numMinutes;
}


const Order = () => {

    const [d, setData] = useState({
        language: '',
        extension: '',
        areaText: '',
        orderPrice: 0,
        leadTime: ''
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
                    orderPrice: priceCalculation(d.language, d.extension, d.areaText.length),
                    leadTime:countTime(d.language, d.extension, d.areaText.length)
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
                    <OrderSubmit orderPrice={d.orderPrice} leadTime={d.leadTime}/>
                </div>

            </form>
        </div>
    );
};

export default Order;
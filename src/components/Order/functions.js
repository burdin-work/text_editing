import moment from 'moment'
import 'moment-timezone';
import 'moment-weekday-calc';

export const priceCalculation = (language, extension, textLength) => {
    let min_price, unit_cost, price;

    min_price = (language === 'en') ? 120 : 50 ;

    if(textLength < 1000) {
        price = min_price;
    } else {
        unit_cost = (language === 'en')  ?  0.12 :  0.05;
        price = unit_cost * textLength;
    }

    if (extension === 'other') {
        return price + price / 100 * 20;
    }

    return price;
}


export const countTime = (language, extension, textLength, date = new Date()) => {

    let speed, workHoursToday, numHoursAllTime, numDays, numHoursAndMinutes, numHours, numMinutes;

    const startDate = moment(date).utc().tz("Europe/Kiev");

    // get timeNow (9:45 -> 9.75)
    const hoursNow = +(((date.getHours() * 60 + date.getMinutes()) / 60).toFixed(2));

    workHoursToday = (hoursNow > 17.5 || moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7)
        ? 0
        : 19 - hoursNow;

    speed = (language === 'en') ? 333 : 1333;

    // searching numHoursAllTime
    numHoursAllTime = (textLength > speed)
        ? textLength / speed + 0.5
        : 0.5;

    if (extension === 'other') numHoursAllTime = numHoursAllTime + numHoursAllTime/100*20;

    // searching numDays & numHoursAndMinutes
    if (numHoursAllTime > workHoursToday) {

        numDays = (numHoursAllTime - workHoursToday > 9)
            ? Math.floor((numHoursAllTime - workHoursToday) / 9) + 1
            : 1;

        numHoursAndMinutes = (numHoursAllTime - workHoursToday) % 9;
    } else {
        numDays = 0;
        numHoursAndMinutes = 9 - (workHoursToday - numHoursAllTime);
    }

    // searching numHours & numMinutes
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
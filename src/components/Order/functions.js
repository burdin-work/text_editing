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


export const countTime = (language, extension, textLength, date = undefined, debugInfo = undefined) => {
    let startDate, speed, workHoursToday, numHoursAllTime, numDays, hoursAfter10, numHours, numMinutes;

    // For testing a function with a different date
    startDate  =  date  ?  moment(new Date(date))  :  moment(new Date()).utc().tz("Europe/Kiev");

    // get time now (9:45 -> 9.75)
    const hoursNow = +( (( startDate.hours() * 60 + startDate.minutes() ) / 60).toFixed(2) );

    workHoursToday = (hoursNow >= 19 || moment(startDate).isoWeekday() === 6 || moment(startDate).isoWeekday() === 7)
        ? 0
        : hoursNow < 10
            ? 9
            : 19 - hoursNow;

    speed = (language === 'en') ? 333 : 1333;

    // searching numHoursAllTime
    numHoursAllTime = ( textLength > speed  )
        ? textLength / speed + 0.5
        : 0.99;// for getting (9>5) & numMinutes = '00'

    if (extension === 'other' && numHoursAllTime !== 0.99) numHoursAllTime = numHoursAllTime + numHoursAllTime/100*20;

    // searching numDays & hoursAfter10
    if (numHoursAllTime > workHoursToday) {

        numDays = (numHoursAllTime - workHoursToday > 9)
            ? Math.floor((numHoursAllTime - workHoursToday) / 9) + 1
            : 1;
        hoursAfter10 = (numHoursAllTime - workHoursToday) % 9;

    }
    // -- do all work today
    else {
        numDays = 0;
        hoursAfter10 = (hoursNow > 10 && hoursNow < 19)
        ? (hoursNow-10) + numHoursAllTime
        : 9 - (workHoursToday - numHoursAllTime);
    }
    // searching numHours & numMinutes
        numHours = Math.round(hoursAfter10);

        if (+(String(hoursAfter10).split('.')[1][0]) >= 5) {
            numMinutes = '00';
        } else {
            numMinutes = '30';
        }

    // moment.js plugin allows to define date by iterating over weekdays only
    let desiredDate = moment(startDate).isoAddWeekdaysFromSet({
        'workdays': numDays,
        'weekdays': [1, 2, 3, 4, 5],
        'exclusions': []
    }).format('DD.MM.YY');

    debugInfo && console.log(`
    startDate =${startDate.format('DD.MM.YY/HH:mm ')}
    textLength = ${textLength}
    speed = ${speed}
    hoursNow = ${hoursNow}
    numDays = ${numDays}
    workHoursToday = ${workHoursToday}
    numHoursAllTime = ${numHoursAllTime}
    hoursAfter10 = ${hoursAfter10}
    ///
    return ${desiredDate + '/' + (numHours + 10) + ':' + numMinutes}
    `);

    return desiredDate + '/' + (numHours + 10) + ':' + numMinutes;
}
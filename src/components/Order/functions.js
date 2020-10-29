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


export const countTime = (language,
                          extension,
                          textLength = undefined,
                          date = undefined,
                          debugInfo = undefined,
                          durationHours = undefined) => {

    let startDate, speed, workHoursToday, numHoursAllTime, numDays, hoursAfter10, numHours, numMinutes;

    // conversion for testing
    if(date && date.includes(', ')) {

        date = moment(date, 'DD/MM/YYYY, HH:mm ddd').format('MMMM DD, YYYY HH:mm:ss');
    }

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

    // searching numHoursAllTime (depending on the received data: $textLength or $durationHours)
    if(textLength){
        numHoursAllTime = ( textLength > speed  )
            ? textLength / speed + 0.5
            : 0.99;
    } else {
        numHoursAllTime = durationHours;
    }

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
    if(hoursAfter10 < 0.5) hoursAfter10 = 0.5;

    const positionMinutes = String(hoursAfter10 + 0.00001).split('.')[1][0];
    numHours = (+positionMinutes >=9) ? Math.round(hoursAfter10) : Math.floor(hoursAfter10);
    const closerTo0 = '019';
    const closerTo15 = '23';
    const closerTo30 = '456';
    if(closerTo0.includes(positionMinutes)){
        numMinutes = '00';
    } else if(closerTo30.includes(positionMinutes)){
        numMinutes = '30';
    } else if(closerTo15.includes(positionMinutes)){
        numMinutes = '15';
    } else {
        numMinutes = '45';
    }

    // moment.js plugin allows to define date by iterating over weekdays only
    let desiredDate = moment(startDate).isoAddWeekdaysFromSet({
        'workdays': numDays,
        'weekdays': [1, 2, 3, 4, 5],
        'exclusions': []
    });

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
    return ${desiredDate.format('YYYY-MM-DD') + '/' + (numHours + 10) + ':' + numMinutes}
    `);

    // fork for testing
    if(textLength) {
        return desiredDate.format('DD.MM.YY') + '/' + (numHours + 10) + ':' + numMinutes;
    } else {
        const newDate = new Date(desiredDate.format('YYYY-MM-DD') + 'T' + (numHours + 10) + ':' + numMinutes);
        return moment(newDate).format('DD/MM/YYYY, HH:mm dddd');
    }
}


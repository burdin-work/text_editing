import {priceCalculation, countTime} from './components/Order/functions.js'


describe('Price Calculation function:', () => {
    /* All possible data options:
        (language === 'en') || (language !== 'en')
    (extension === 'other') || (extension !== 'other')
        (textLength > 1000) || (textLength < 1000)
    */
    const more1000 = 3062;
    const less1000 = 876;

    // (language === 'en') & (extension !== 'other')
    test("(language === 'en') & (extension !== 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('en', 'doc', more1000 )).toBe(367.44)
    });
    test("(language === 'en') & (extension !== 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('en', 'doc', less1000 )).toBe(120.00)
    });

    // (language === 'en') & (extension === 'other')
    test("(language === 'en') & (extension === 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('en', 'other', more1000 )).toBe(440.928)
    });
    test("(language === 'en') & (extension === 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('en', 'other', less1000 )).toBe(144.00)
    });

    // (language !== 'en') & (extension !== 'other')
    test("(language @== 'en') & (extension === 'docx') & (textLength > 1000)", () => {
        expect(priceCalculation('ru', 'docx', more1000 )).toBe(153.1)
    });
    test("(language !== 'en') & (extension === 'rtf') & (textLength < 1000)", () => {
        expect(priceCalculation('ua', 'rtf', less1000 )).toBe(50.00)
    });

    // (language !== 'en') & (extension === 'other')
    test("(language !== 'en') & (extension === 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('ru', 'other', more1000 )).toBe(183.72)
    });
    test("(language !== 'en') & (extension === 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('ua', 'other', less1000 )).toBe(60.00)
    });
});


describe('Count Time function:', () => {
    /* All possible data options:
            (language === 'en') || (language !== 'en')
        (extension === 'other') || (extension !== 'other')
           (textLength > speed) || (textLength < speed)
           (hoursNow = ** & holiday) || (hoursNow < 10 & working day)
           || ( (hoursNow > 10 & hoursNow < 19) & working day)
           || (hoursNow > 19 & working day)
           || (hoursNow > 18 & hoursNow < 19 & working day)
    */
    const less333 = 276;
    const more333 = 2150;
    const less1333 = 988;
    const more1333 = 4980;

    // any time is suitable at holiday
    const fullDateHoliday = '2020-10-25T15:15';

    const dayWorking = '2020-10-14';
    const timeLess10 = 'T06:35';
    const time10to19 = 'T15:24';
    const timeMore19 = 'T22:44';

    const toggleInfo = undefined;

    // (language === 'en') & (extension === 'other') & (textLength > speed)
    test("(language === 'en') & (extension === 'other') & (textLength > speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('en', 'other', more333, fullDateHoliday, toggleInfo )).toBe('26.10.20/18:15')
    });
    test("(language === 'en') & (extension === 'other') & (textLength > speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('en', 'other', more333, (dayWorking + timeLess10), toggleInfo)).toBe('14.10.20/18:15')
    });
    test("(language === 'en') & (extension === 'other') & (textLength > speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('en', 'other', more333, (dayWorking + time10to19), toggleInfo )).toBe('15.10.20/14:45')
    });
    test("(language === 'en') & (extension === 'other') & (textLength > speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('en', 'other', more333, (dayWorking + timeMore19), toggleInfo )).toBe('15.10.20/18:15')
    });
    
    // (language === 'en') & (extension === 'other') & (textLength < speed)
    test("(language === 'en') & (extension === 'other') & (textLength < speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('en', 'other', less333, fullDateHoliday, toggleInfo )).toBe('26.10.20/11:00')
    });
    test("(language === 'en') & (extension === 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('en', 'other', less333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/11:00')
    });
    test("(language === 'en') & (extension === 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('en', 'other', less333, (dayWorking+time10to19), toggleInfo )).toBe('14.10.20/16:15')
    });
    test("(language === 'en') & (extension === 'other') & (textLength < speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('en', 'other', less333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/11:00')
    });

    // (language === 'en') & (extension !== 'other') & (textLength > speed)
    test("(language === 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('en', 'doc', more333, fullDateHoliday, toggleInfo )).toBe('26.10.20/17:00')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('en', 'docx', more333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/17:00')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('en', 'rtf', more333, (dayWorking+time10to19), toggleInfo )).toBe('15.10.20/13:15')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('en', 'doc', more333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/17:00')
    });

    // (language === 'en') & (extension !== 'other') & (textLength < speed)
    test("(language === 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('en', 'doc', less333, fullDateHoliday, toggleInfo )).toBe('26.10.20/11:00')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('en', 'docx', less333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/11:00')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('en', 'rtf', less333, (dayWorking+time10to19), toggleInfo )).toBe('14.10.20/16:15')
    });
    test("(language === 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('en', 'doc', less333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/11:00')
    });


    // (language !== 'en') & (extension === 'other') & (textLength > speed)
    test("(language !== 'en') & (extension === 'other') & (textLength > speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('ua', 'other', more1333, fullDateHoliday, toggleInfo )).toBe('26.10.20/15:00')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength > speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('ru', 'other', more1333, (dayWorking + timeLess10), toggleInfo)).toBe('14.10.20/15:00')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength > speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('ua', 'other', more1333, (dayWorking + time10to19), toggleInfo )).toBe('15.10.20/11:30')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength > speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('ru', 'other', more1333, (dayWorking + timeMore19), toggleInfo )).toBe('15.10.20/15:00')
    });

    // (language !== 'en') & (extension === 'other') & (textLength < speed)
    test("(language !== 'en') & (extension === 'other') & (textLength < speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('ua', 'other', less1333, fullDateHoliday, toggleInfo)).toBe('26.10.20/11:00')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('ru', 'other', less1333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/11:00')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('ua', 'other', less1333, (dayWorking+time10to19), toggleInfo )).toBe('14.10.20/16:15')
    });
    test("(language !== 'en') & (extension === 'other') & (textLength < speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('ru', 'other', less1333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/11:00')
    });

    // (language !== 'en') & (extension !== 'other') & (textLength > speed)
    test("(language !== 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('ua', 'doc', more1333, fullDateHoliday, toggleInfo )).toBe('26.10.20/14:15')
    });
    test("(language !== 'ru') & (extension !== 'other') & (textLength > speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('ru', 'rtf', more1333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/14:15')
    });
    test("(language !== 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('ua', 'docx', more1333, (dayWorking+time10to19), toggleInfo )).toBe('15.10.20/10:30')
    });
    test("(language !== 'en') & (extension !== 'other') & (textLength > speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('ru', 'doc', more1333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/14:15')
    });

    // (language !== 'en') & (extension !== 'other') & (textLength < speed)
    test("(language !== 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow = ** & holiday)", () => {
        expect(countTime('ru', 'doc', less1333, fullDateHoliday, toggleInfo )).toBe('26.10.20/11:00')
    });
    test("(language !== 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow < 10 & working day)", () => {
        expect(countTime('ua', 'docx', less1333, (dayWorking+timeLess10), toggleInfo )).toBe('14.10.20/11:00')
    });
    test("(language !== 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow > 10 & hoursNow < 19 & working day)", () => {
        expect(countTime('ru', 'rtf', less1333, (dayWorking+time10to19), toggleInfo )).toBe('14.10.20/16:15')
    });
    test("(language !== 'en') & (extension !== 'other') & (textLength < speed) & (hoursNow > 19 & working day)", () => {
        expect(countTime('ua', 'doc', less1333, (dayWorking+timeMore19), toggleInfo )).toBe('15.10.20/11:00')
    });

    test("(hoursNow > 18:00 & hoursNow < 19:00 & working day", () => {
        expect(countTime('ua', 'doc', less1333, (dayWorking+'T18:06'), toggleInfo )).toBe('15.10.20/10:30')
    });


});

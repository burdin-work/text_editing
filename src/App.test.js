import {priceCalculation, countTime} from './components/Order/functions.js'


describe('Price Calculation function:', () => {
    /* All possible input data options:
        (language === 'en') || (language !== 'en')
    (extension === 'other') || (extension !== 'other')
        (textLength > 1000) || (textLength < 1000) */

    const more1000 = 3062;
    const less1000 = 876;

    // (language === 'en') & (extension !== 'other')
    test("(language === 'en') & (extension !== 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('en', 'doc', more1000 )).toBe(367.44)
    })
    test("(language === 'en') & (extension !== 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('en', 'doc', less1000 )).toBe(120.00)
    })

    // (language === 'en') & (extension === 'other')
    test("(language === 'en') & (extension === 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('en', 'other', more1000 )).toBe(440.928)
    })
    test("(language === 'en') & (extension === 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('en', 'other', less1000 )).toBe(144.00)
    })

    // (language !== 'en') & (extension !== 'other')
    test("(language === 'ru') & (extension === 'docx') & (textLength > 1000)", () => {
        expect(priceCalculation('ru', 'docx', more1000 )).toBe(153.1)
    })
    test("(language === 'ua') & (extension === 'rtf') & (textLength < 1000)", () => {
        expect(priceCalculation('ua', 'rtf', less1000 )).toBe(50.00)
    })

    // (language !== 'en') & (extension === 'other')
    test("(language !== 'en') & (extension === 'other') & (textLength > 1000)", () => {
        expect(priceCalculation('ru', 'other', more1000 )).toBe(183.72)
    })
    test("(language !== 'en') & (extension === 'other') & (textLength < 1000)", () => {
        expect(priceCalculation('ua', 'other', less1000 )).toBe(60.00)
    })
})


describe('Count Time function:', () => {

});

import each from "jest-each";
import {countTime} from './components/Order/functions.js'

const toggleInfo = undefined;
each`
    startTime                        | durationHours | expectedResult
    ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
    ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
    ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
    ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
    ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
    ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
    ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
    ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
    ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
    ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
    ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
    ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
    ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
`.test('returns $expectedResult when using $startTime and durationHours', ({startTime, durationHours, expectedResult}) => {
    expect(countTime('ru', 'doc', undefined, startTime, toggleInfo, durationHours)).toBe(expectedResult);
});


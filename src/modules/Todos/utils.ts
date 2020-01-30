import big from 'big.js';
import moment from 'moment';
import { ITodo } from './models';

export function isTodoDone (todo: ITodo): boolean {
    return big(todo.doneTime || '0').gte(moment().isoWeekday(todo.weekDay).format('x'));
}

export function calculateTodoDoneTime (accomplishTime: ITodo['accomplishTime']): string {
    const doneSeconds = accomplishTime.reduce((accumulator: any, currentValue) => {
        return accumulator.plus(currentValue.endTime || moment().format('x')).minus(currentValue.startTime);
    }, big('0'));
    console.log(doneSeconds / 1000)

    return convertSecondsToHours(Math.round(doneSeconds.toFixed(0) / 1000));
}


function convertSecondsToHours (seconds: number | string): string {
    const derivedHours: string = big(seconds).div(60 * 60).round(0, 0).toFixed(0);
    const derivedMins: string = big(seconds).div(60).minus(big(derivedHours).mul(60)).round(0, 0).toFixed(0);
    const derivedSecs: string = big(seconds).minus(big(derivedHours).mul(60).mul(60)).minus(big(derivedMins).mul(60)).round(0, 0).toFixed(0);
    
    return `${addLeadingZero(derivedHours)}:${addLeadingZero(derivedMins)}:${addLeadingZero(derivedSecs)}`;
}

function addLeadingZero (value: string | number): string {
    return ('0' + value).slice(-2);
}

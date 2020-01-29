import big from 'big.js';
import moment from 'moment';
import { ITodo } from './models';

export function isTodoDone (todo: ITodo): boolean {
    return big(todo.doneTime || '0').gte(moment().isoWeekday(todo.weekDay).format('x'));
}

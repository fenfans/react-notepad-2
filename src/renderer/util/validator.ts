import * as moment from 'moment';

export function lteToday (rule, value, callback) {
  if (!value || value.isBefore(moment().add(1, 'days').format('YYYY-MM-DD'))) {
    callback();
  } else {
    callback(new Error('该日期不得晚于当日'));
  }
}
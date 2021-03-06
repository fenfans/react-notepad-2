import * as moment from 'moment';

export default {
  number2Date(num) {
    if (num) {
      return moment(num).format('YYYY-MM-DD');
    } else {
      return '';
    }
  },

  number2Currency(num) {
    if (num) {
      return Number.parseFloat((num / 100).toFixed(2));
    } else {
      return null;
    }
  },

  currency2Number(num) {
    if (num != null && num != undefined) {
      return num * 100;
    } else {
      return null;
    }
  },

  moment2Milliseconds(date) {
    if (date) {
      return date.toDate().getTime();
    } else {
      return null
    }
  },

  string2moment(string) {
    if (string) {
      return moment(string);
    } else {
      return null;
    }
  },

  iso2sqlDateString(string) {
    let result = '';
    if (string) {
      result = moment(new Date(string)).format('YYYY-MM-DD HH:mm:ss Z');
    }
    return result;
  }
};
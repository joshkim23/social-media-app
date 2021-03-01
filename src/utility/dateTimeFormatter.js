import * as moment from 'moment';

// calculates the amount of time elapsed since a date
export function getTimeSinceDate(date) {
  return moment(date).fromNow(true);
}

// format a date from ex: "2000-08-09T12:00:00.000Z" to DD MMM YYY
export function formatDate(date) {
  return moment(date).format('DD MMM YYYY');
}

export function formatDateTime(date) {
  return moment(date).format('DD MMM YYYY [at] h:mm a');
}
const moment = require('moment');

module.exports = {
  format_date: (date) => {
    // Use Moment.js to format the date as MM/DD/YYYY
    return moment(date).format('MM/DD/YYYY');
  }
};

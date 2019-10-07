'use strict';

// Helper to add or remove slashes from date string
const FormatDate = {
  applyFormat: (date) => {
    return date.replace(/^(\d\d)(\d\d)(\d\d\d\d)$/, "$1/$2/$3");
  },
  removeFormat: (date) => {
    return date.split('/').join('');
  }
}

export default FormatDate
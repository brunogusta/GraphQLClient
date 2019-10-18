module.exports = url => {
  if (url.indexOf('list') !== -1) {
    return 'List';
  } else if (url.indexOf('search') !== -1) {
    return 'Search';
  } else if (url.indexOf('new') !== -1) {
    return 'New';
  } else if (url.indexOf('update') !== -1) {
    return 'Update';
  } else if (url.indexOf('delete') !== -1) {
    return 'Delete';
  } else {
    return 'List';
  }
};

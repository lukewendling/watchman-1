'use strict';

var app = require('../server/server');
var FeedObject = app.models.FeedObject;

module.exports = {
  // obj: any object with a guid and extractType
  add: obj => {
    delete obj['dc:date.taken']; //invalid for mongo, so remove. we can use another property
    return FeedObject.find(
      { where: { guid: obj.guid, extractType: obj.extractType } }
    )
    .then(docs => {
      if (docs.length) {
        return;
      } else {
        return FeedObject.create(obj)
        .then(obj => console.log('added item', obj.guid));
      }
    })
    // .then(console.log)
    .catch(console.error);
  }
};

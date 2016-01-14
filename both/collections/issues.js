Issues = new Mongo.Collection('issues');

Issues.helpers({

});

Issues.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

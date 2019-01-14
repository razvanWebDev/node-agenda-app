var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete', function(req, res, next) {
  var phoneToRemove = req.query.phone;
  var phone = req.query.phone;

  var fs = require('fs');
  var content = fs.readFileSync('public/contacts.json');
  var contacts = JSON.parse(content);
 

  var remainingContacts = contacts.filter(function(contact){
    return contact.phone != phone;
  });

 content = JSON.stringify(remainingContacts, null, 2);
  fs.writeFileSync('public/contacts.json' , remainingContacts);

  res.send(remainingContacts);

  
});
module.exports = router;

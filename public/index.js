function displayContacts(contacts) {
    var resultTable = document.querySelector('#agenda tbody');

    var rows = contacts.map(function (contact) {
        return `<tr>
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.phone}</td>
                    <td><a href="/contacts/delete?phone=${contact.phone}">delete</a></td>
                </tr>`
    });
    rows.push(getNewRow());
    resultTable.innerHTML = rows.join("");
}

function getNewRow() {
    return `<tr>
                    <td><input type="text" name="firstName" placeholder="first Name"/></td>
                    <td><input type="text" name="lastName" placeholder="last Name"/></td>
                    <td><input type="text" name="phone" placeholder="phone"/></td>
                    <td><button onclick="saveContact()">Save</button></td>
                </tr>`
}

function saveContact(){
 var firstName = $('input[name=firstName]').val();
 var lastName = $('input[name=lastName]').val();
 var phone = document.querySelector('input[name=phone]').value;

 console.log('save contact', firstName, lastName, phone);
 $.post('contacts/create', {
     firstName, //shortcut from ES6 (key is the same as value variable name)
     lastName: lastName,
     phone: phone
 }).done(function(response){
     console.warn('done create contact');
     if (response.success){
         loadContacts();
     }
 })
}

function loadContacts() {
    $.ajax('contacts.json').done(function (contacts) {
        displayContacts(contacts);
    })
}

loadContacts();
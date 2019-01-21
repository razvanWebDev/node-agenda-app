var phoneToEdit = '';

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

    var actionUrl = phoneToEdit ? 'contacts/update?phone= ' + phoneToEdit : "contacts/create";
 
 $.post(actionUrl, {
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
        window.globalContacts = contacts;
        displayContacts(contacts);
    })
}

function displayContacts(contacts) {
    var resultTable = document.querySelector('#agenda tbody');

    var rows = contacts.map(function (contact) {
        return `<tr>
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <a href="/contacts/delete?phone=${contact.phone}">&#10006</a>
                        <a href = "#" class="edit" data-id="${contact.phone}" >&#9998</a>
                    </td>
                </tr>`
    });
    rows.push(getNewRow());
    resultTable.innerHTML = rows.join("");
}

function initEvents(){
    $( "tbody" ).delegate( "a.edit", "click", function() {
        phoneToEdit = this.getAttribute('data-id');
        var contact = globalContacts.find(function(contact){
            return contact.phone == phoneToEdit;
            })
        $('input[name=firstName]').val(contact.firstName);
        $('input[name=lastName]').val(contact.lastName);
        document.querySelector('input[name=phone]').value = contact.phone;

        
      });
}

loadContacts();
initEvents();
function displayContacts(contacts) {
    var resultTable = document.querySelector('#agenda tbody');

    var rows = contacts.map(function (contact) {
        return `<tr>
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.phone}</td>
                    <td><a href="/contacts/delete?phone=${contact.phone}">delete</a></td>
                </tr>`
    })
    resultTable.innerHTML = rows.join("");
}

function loadContacts() {
    $.ajax('contacts.json').done(function (contacts) {
        displayContacts(contacts);
    })
}

loadContacts();
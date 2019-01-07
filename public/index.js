function displayAgenda(contacts) {
    var resultTable = document.querySelector('#agenda tbody');

    var contact = contacts.map(function (contact) {
        return `<tr>
                    <td>${contact.firstName}</td> <td>${contact.lastName}</td> <td>${contact.phoneNr}</td>
                </tr>`
    })
    resultTable.innerHTML = contact.join("");
}

function initAgenda() {
    $.ajax('contacts.json').done(function (contacts) {
        displayAgenda(contacts);
    })
}

initAgenda();
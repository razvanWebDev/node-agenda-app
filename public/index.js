function displayAgenda(agenda) {
    var resultTable = document.querySelector('#contacts tbody');

    var contacts = agenda.map(function (agenda) {
        return `<tr>
                    <td>${agenda.firstName}</td> <td>${agenda.lastName}</td> <td>${agenda.phoneNr}</td>
                </tr>`
    })
    resultTable.innerHTML = contacts.join("");
}

function initAgenda() {
    $.ajax('agenda.json').done(function (agenda) {
        displayAgenda(agenda);
    })
}


initAgenda();
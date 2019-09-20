var phoneToEdit = "";

var API_URL = {
    CREATE: "contacts/create",
    READ: "data/contacts.json",
    UPDATE: "contacts/update",
    DELETE: "contacts/delete"
};

function loadContacts() {
    $.ajax("data/contacts.json").done(function(contacts) {
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}

function saveContact() {
    var firstName = firstName_input.value;
    var lastName = lastName_input.value;
    var phone = phone_input.value;
    var inputs = document.querySelectorAll("table tfoot tr td input");

    if (firstName == "" || lastName == "" || phone == "") {
        inputs.forEach(input => {
            if (input.value == "") {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
        });
    } else {
        inputs.forEach(input => (input.style.border = "none"));
        var actionUrl = phoneToEdit
            ? "contacts/update?phone=" + phoneToEdit
            : "contacts/create";

        $.post(actionUrl, {
            firstName, // shortcut from ES6 (key is the same as value variable name)
            lastName,
            phone: phone // ES5 (key = value)
        }).done(function(response) {
            phoneToEdit = "";
            firstName_input.value = "";
            lastName_input.value = "";
            phone_input.value = "";

            if (response.success) {
                loadContacts();
            }
        });
    }
}

function displayContacts(contacts) {
    var rows = contacts.map(function(contact) {
        return `<tr data-id="${contact.phone}">
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td>
            <a href="/contacts/delete?phone=${contact.phone}">&#10006;</a>
                <a href="#" class="edit" data-id="${contact.phone}">&#9998;</a>
            </td>
        </tr>`;
    });

    document.querySelector("tbody").innerHTML = rows.join("");
}

function initEvents() {
    //Update conact
    $("tbody").delegate("a.edit", "click", function() {
        phoneToEdit = this.getAttribute("data-id");

        var contact = globalContacts.find(function(contact) {
            return contact.phone == phoneToEdit;
        });
        console.log("edit", phoneToEdit, contact);

        document.querySelector("input[name=firstName]").value =
            contact.firstName;
        $("input[name=lastName]").val(contact.lastName);
        $("input[name=phone]").val(contact.phone);
    });

    document.getElementById("search").addEventListener("input", dosearch);
}

function dosearch() {
    var value = this.value.toLowerCase();

    var filteredContacts = globalContacts.filter(function(contact) {
        return (
            contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value) ||
            contact.phone.toLowerCase().includes(value)
        );
    });

    displayContacts(filteredContacts);
}

// - start app

loadContacts();
initEvents();

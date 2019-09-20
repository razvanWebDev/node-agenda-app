let phoneToEdit = "";
const firstName_input = document.querySelector("input[name=firstName]");
const lastName_input = document.querySelector("input[name=lastName]");
const phone_input = document.querySelector("input[name=phone]");
const requiredInputs = document.querySelectorAll(".required");

const loadContacts = () => {
    $.ajax("data/contacts.json").done(contacts => {
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
};

const saveContact = () => {
    const firstName = firstName_input.value;
    const lastName = lastName_input.value;
    const phone = phone_input.value;

    if (firstName == "" || phone == "") {
        requiredInputs.forEach(input => {
            if (input.value == "") {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
        });
    } else {
        requiredInputs.forEach(input => (input.style.border = "none"));
        const actionUrl = phoneToEdit
            ? "contacts/update?phone=" + phoneToEdit
            : "contacts/create";

        $.post(actionUrl, {
            firstName,
            lastName,
            phone
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
};

const confirmDelete = delUrl => {
    if (confirm("Are you sure you want to delete contact")) {
        document.location = delUrl;
    } else {
        loadContacts();
    }
};

const editContact = phoneNr => {
    const contact = globalContacts.find(contact => contact.phone == phoneNr);
    firstName_input.value = contact.firstName;
    lastName_input.value = contact.lastName;
    phone_input.value = contact.phone;
};

const displayContacts = contacts => {
    const rows = contacts.map(contact => {
        return `<tr data-id="${contact.phone}">
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <a href=javascript:confirmDelete("/contacts/delete?phone=${contact.phone}") title="delete">&#10006;</a>
                        <a href="#" onclick="editContact('${contact.phone}')" title="edit">&#9998;</a>
                    </td>
                </tr>`;
    });

    document.querySelector("tbody").innerHTML = rows.join("");
};

const initEvents = () => {
    //Search event listener
    document.getElementById("search").addEventListener("input", dosearch);
};

const dosearch = () => {
    const value = this.value.toLowerCase();

    const filteredContacts = globalContacts.filter(contact => {
        return (
            contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value) ||
            contact.phone.toLowerCase().includes(value)
        );
    });

    displayContacts(filteredContacts);
};

// - start app
loadContacts();
initEvents();

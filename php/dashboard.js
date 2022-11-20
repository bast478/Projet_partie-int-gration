// VARIABLES
const deconnect = document.getElementById('button-deconnect');
const formDeconnection = document.getElementById('deconnection');

const tbody = document.querySelector('tbody');
const template = document.querySelector('template');

// ACTION

function deleteEmail () {
    const formData = new FormData()
    formData.append('delete_email', this.dataset.id);

    fetch('email.php', {
        body: formData,
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data === true) {
            this.parentNode.remove();
        } else {
            this.firstChild.style.backgroundColor = 'red';
            this.textContent = 'Erreur Supp';
        }
    })
    .catch(error => {
        console.log('Il ya eu un problème avec l\'opération fetch: ' + error.message);
        this.firstChild.style.backgroundColor = 'red';
        this.textContent = 'Prob Conn';
    });
}

const formData = new FormData()
formData.append('get_emails', true);

fetch('email.php', {
    body: formData,
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    console.log(data);
    for (const x of data) {
        console.log(x);
        const clone = document.importNode(template.content, true);
        const td = clone.querySelectorAll('td');
        console.log(td);
        td[0].textContent = x['subscriber_email'];
        td[1].textContent = x['subscribe_date'];
        td[2].dataset.id = x['subscriber_ID'];
        td[2].addEventListener('click', deleteEmail);
        tbody.appendChild(clone);
    }
})
.catch(error => {
    console.log('Il ya eu un problème avec l\'opération fetch: ' + error.message);
});
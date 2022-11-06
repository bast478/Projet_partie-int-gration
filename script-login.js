// VARIABLES
const h1 = document.querySelector('h1');
const message = document.getElementById('connection-message');
const form = document.getElementById('form-back');
const errorUtil = document.querySelector('.error-util');
const inputName = document.querySelector("input[type='text']");
const messageError = document.getElementById('connection-error');
const labelMdp = document.querySelector("label[for='mdp']");
const errorMdp = document.querySelector('.error-mdp');

// ACTION
form.addEventListener('submit', submitForm);
function submitForm(e) {
    e.preventDefault();
    const name = this["nom-utilisateur"].value;
    const password = this["mdp"].value;

    // Erreur champ vide
    if (name == '' || password == '') {
        if (name == '') {
            if (errorUtil.classList.contains('hidden')) {
                errorUtil.classList.remove('hidden');
            }
        } else {
            if (!errorUtil.classList.contains('hidden')) {
                errorUtil.classList.add('hidden');
            }
        }

        if (password == '') {
            if (errorMdp.classList.contains('hidden')) {
                errorMdp.classList.remove('hidden');
            }
        } else {
            if (!errorMdp.classList.contains('hidden')) {
                errorMdp.classList.add('hidden');
            }
        }

        return;
    }

    // Remettre les class pour style
    if (!errorUtil.classList.contains('hidden')) {
        errorUtil.classList.add('hidden');
    }
    if (!errorMdp.classList.contains('hidden')) {
        errorMdp.classList.add('hidden');
    }

    const formData = new FormData(form);

    fetch('php/login.php', {
        body: formData,
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        message.textContent = data.message;

        if (!message.classList.contains('collection')) {
            h1.classList.add('connection');
        }

        if (message.classList.contains('rotate')) {
            message.classList.remove('rotate');
            message.offsetWidth = message.offsetWidth;
        }

        if (!message.classList.contains('connection')) {
            message.classList.add('connection');
        }

        message.classList.add('rotate');

        if (data.success === true) {
            if (inputName.classList.contains('showConnError') && messageError.classList.contains('showConnError') && labelMdp.classList.contains('showConnError')) {
                inputName.classList.remove('showConnError');
                messageError.classList.remove('showConnError');
                labelMdp.classList.remove('showConnError');
                inputName.classList.add('success');
                labelMdp.classList.add('success');
            }
            location.assign('php/dashboard.php');
        } else {
            messageError.textContent = data.error;
            if (!inputName.classList.contains('showConnError') && !messageError.classList.contains('showConnError') && !labelMdp.classList.contains('showConnError')) {
                if (inputName.classList.contains('success') && labelMdp.classList.contains('success')) {
                    inputName.classList.remove('success');
                    labelMdp.classList.remove('success');
                }
                inputName.classList.add('showConnError');
                messageError.classList.add('showConnError');
                labelMdp.classList.add('showConnError');
            }
        }
    })
    .catch(error => {
        console.log('Il ya eu un problème avec l\'opération fetch: ' + error.message);
    });

}
'use strict'
import{Names as Names} from '../../config.js'

export function renderAuth(parent) {
    renderHead(parent);

    
    const divBlock = createDivAndInsertInParent(parent, 'registerDiv');
    divBlock.classList.add('registerDiv');

    const form = document.createElement('form');
    form.classList.add('form');
    
    const emailText = createLabel('emailLabel', "Email", null);
    const emailInput = createInput('email', 'Email', 'email');
    emailInput.classList.add('input-field');
    
    const passwordText = createLabel('passwordLabel', "Password", null);
    const passwordInput = createInput('password', 'Password', 'password');
    passwordInput.classList.add('input-field');

    const forgotText = document.createElement('a');
    forgotText.textContent = "Forgot password?";
    forgotText.name = 'forgot';
    forgotText.style.textDecoration = 'underline';

    forgotText.addEventListener('click', (e) => {
        e.preventDefault();
        // todo create func to restore password
        alert("Forgot password")
    });

    const submitBtn = createSpanButton('send-button', 'Login');

    const regSuggest = createLabel('register', "Doesnt have accout?", null);
    const regButton = createSpanButton('send-button', `Register in ${Names.nameOfApp}`);
    regButton.name = 'registerButton';

    insertIntoElement(createDivAndInsertInParent(form), emailText, emailInput);
    
    const passwordDiv = createDivAndInsertInParent(form);
    insertIntoElement(passwordDiv, passwordText, passwordInput);
    passwordDiv.style.paddingBottom = 10;

    insertIntoElement(createDivAndInsertInParent(form),forgotText, submitBtn);

    form.appendChild(document.createElement('hr'));

    insertIntoElement(createDivAndInsertInParent(form), regSuggest, regButton);

    form.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.type === 'register' && e.target.name === 'forgot') {
            alert('Change passwd');
        }

        if (!(e.target.type === 'submit')) {
            return;
        }
        
        if (e.target.name === 'registerButton') {
            alert('Register');
            goToPage(config.signup);
            return;
        }
        alert('login');
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        // todo validate email and pass

        ajax(
            'POST',
            '/login',
            {email, password},
            status => {
                if (status === 200) {
                    goToPage(config.profile);
                    return;
                }

                alert('Неверный емейл или пароль');
            }
        )
    });

    parent.appendChild(divBlock);
    divBlock.appendChild(form);
};

function createLabel(type, text, ...classes) {
    const label = document.createElement('p');
    label.type = type;
    label.textContent = text;
    
    for (let cl in classes) {
        label.classList.add(cl);
    }

    return label;
};

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
};

function createDivAndInsertInParent(parent, ...classes) {
    const divBlock = document.createElement('div');
    classes.forEach((cl) => {
        divBlock.classList.add(cl);
    });
    
    parent.appendChild(divBlock);
    return divBlock;
}

function insertIntoElement(parent, ...elements) {
    elements.forEach((el) => {
        parent.appendChild(el);
    });
}

function renderHead(parent) {
const labelText = document.createElement('p');
    labelText.textContent = Names.nameOfApp;
    
    const img = document.createElement('p');
    img.innerHTML = '<img src="../../static/auth/spotifyLabel.png" width = "50" height = "50" >'
    insertIntoElement(createDivAndInsertInParent(parent, 'head'), img, labelText);
    insertIntoElement(parent, document.createElement('hr'));
}

function createSpanButton(clas, text, type = 'submit') {
    const button = document.createElement('span');
    
    button.classList.add(clas);
    button.textContent = text;
    button.type = type;
    
    return button;
}
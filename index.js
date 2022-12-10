//regex validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const NUMBER_REGEX = /^[0-9]{6,16}$/;

//Selectors
const countries = document.querySelector('#countries');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneCode = document.querySelector('#phone-code');

//Validations
let usernameValidation = false;
let emailValidation = false;

//Function

const validation = (e, validation, element) => {
    const information = e.target.parentElement.children[1];
    if (validation) {
        element.classList.add('correct');
        element.classList.remove('incorrect');
        information.classList.remove('show-information');
    } else {
        element.classList.add('incorrect');
        element.classList.remove('correct');
        information.classList.add('show-information');
    }
}

[...countries].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

usernameInput.addEventListener('input', e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(e, usernameValidation, usernameInput);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(e, emailValidation, emailInput);
});

countries.addEventListener('input', e => {
    const optionSelected = [...e.target.children].find(option => option.selected);
    phoneCode.innerHTML = `+${optionSelected.value}`;
});





//regex validation
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const NUMBER_REGEX = /^[0-9]{10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;

//Selectors
const countries = document.querySelector('#countries');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneCode = document.querySelector('#phone-code');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');


//Validations
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countriesValidation = false;

//Function

const validation = (validation, element) => {
    const information = element.parentElement.children[1];
    formBtn.disabled = !usernameValidation || !emailValidation || !phoneValidation || !passwordValidation || !confirmPasswordValidation || !countriesValidation ? true : false;
    
    if(element.value === ''){
        element.classList.remove('incorrect');
        element.classList.remove('correct');
        information.classList.remove('show-information');
    } else if (validation) {
        element.classList.add('correct');
        element.classList.remove('incorrect');
        information.classList.remove('show-information');
    } else if (!validation){
        element.classList.add('incorrect');
        element.classList.remove('correct');
        information.classList.add('show-information');
    }
}

const reset = () => {
    //set false to all validations
    usernameValidation = false;
    emailValidation = false;
    phoneValidation = false;
    passwordValidation = false;
    confirmPasswordValidation = false;

    //set input to empty
    usernameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

    //reset validations
    validation(usernameValidation,usernameInput);
    validation(emailValidation,emailInput);
    validation(phoneValidation,phoneInput);
    validation(passwordValidation,passwordInput);
    validation(confirmPasswordValidation,confirmPasswordInput);

}

[...countries].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

usernameInput.addEventListener('input', e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(usernameValidation, usernameInput);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(emailValidation, emailInput);
});

countries.addEventListener('input', e => {
    const optionSelected = [...e.target.children].find(option => option.selected);
    phoneCode.innerHTML = `+${optionSelected.value}`;
    countriesValidation = optionSelected.value === '' ? false : true;
    countries.classList.add('correct');
    phoneCode.classList.add('correct');
    validation(countriesValidation, countries);
});

phoneInput.addEventListener('input', e => {
    phoneValidation = NUMBER_REGEX.test(e.target.value);
    const information = e.target.parentElement.parentElement.children[1];
    if (phoneValidation) {
        phoneInput.classList.add('correct');
        phoneInput.classList.remove('incorrect');
        information.classList.remove('show-information');
    } else {
        phoneInput.classList.add('incorrect');
        phoneInput.classList.remove('correct');
        information.classList.add('show-information');
    }
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    confirmPasswordValidation = confirmPasswordInput.value === e.target.value;
    validation(passwordValidation, passwordInput);
    validation(confirmPasswordValidation, confirmPasswordInput);
});

confirmPasswordInput.addEventListener('input', e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation(confirmPasswordValidation, confirmPasswordInput);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        phone: `${phoneCode.innerHTML} ${phoneInput.value}`,
        password: passwordInput.value
    }
    console.log(user);
    reset();
    
});

//https://api.geoapify.com/v1/ipinfo?apiKey=YOUR_API_KEY
//API KEY: df01505355204127856562d8a543cb18


const getCountry = async () => {
    //fetch
    try {
        const data = await (await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=df01505355204127856562d8a543cb18', {method: 'GET'})).json();
        //const response = await data.json();
    
        const isoCode = data.country.iso_code;
        const country = [...countries.children].find(option => option.getAttribute('data-countryCode') === isoCode);
        country.selected = true;
        phoneCode.innerHTML = `+${country.value}`;
        countries.classList.add('correct');
        phoneCode.classList.add('correct');
        countriesValidation = country.value !== '' ? true:false;
        validation(countriesValidation, countries);

    } catch (error) {
        alert('No tienes internet');
    }
}

getCountry();
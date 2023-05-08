import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
                });
    }

    validate(e) {
        const elm = e.target;
        const emailInput = elm.querySelector('input[name="email"]');
        const passwordInput = elm.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid E-mail.');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert('Password must be between 3 and 50 caracters.');
            error = true;
        }

        if(!error) elm.submit();

    }


}
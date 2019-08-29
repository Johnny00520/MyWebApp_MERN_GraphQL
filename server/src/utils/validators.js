export const validateRegisterInput = (firstname, lastname, email, password, confirmPassword) => {
    const errors = {};

    if(firstname.trim() === "") errors.firstname = "Firstname must not empty";
    if(lastname.trim() === "") errors.lastname = "Firstname must not empty";
    if(email.trim() === "") errors.email = "Email must not be empty";

    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!email.match(regEx)) {
        errors.email = "Email needs to be a valid email address";
    }

    if(password.trim() === "") {
        errors.password = "Password can not be empty";
    }
    if(password !== confirmPassword) {
        errors.confirmPassword = "Password must match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validateAdminCreateInput = (firstname, lastname, email, password) => {
    const errors = {};

    if(firstname.trim() === "") errors.firstname = "Firstname must not empty";
    if(lastname.trim() === "") errors.lastname = "Firstname must not empty";
    if(email.trim() === "") errors.email = "Email must not be empty";

    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!email.match(regEx)) {
        errors.email = "Email needs to be a valid email address";
    }

    if(password.trim() === "") {
        errors.password = "Password can not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
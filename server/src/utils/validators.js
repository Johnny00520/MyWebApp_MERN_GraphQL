export const validateRegisterInput = (firstname, lastname, email, password, confirmPassword) => {
    const errors = {};

    if(firstname.trim() === "") errors.firstname = "First name must not empty";
    if(lastname.trim() === "") errors.lastname = "Last name must not empty";
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

    if(firstname.trim() === "") errors.firstname = "First name must not empty";
    if(lastname.trim() === "") errors.lastname = "Last name must not empty";
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
        errors.email = 'Email must not be empty';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

export const validateEmailInput = (email) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

export const validatePasswordResetInput = (password, confirmPassword) => {
    const errors = {};
    if(password.trim() === "") {
        errors.password = "Password can not be empty";
    }
    if(confirmPassword.trim() === "") {
        errors.confirmPassword = "Confirm password can not be empty";
    }
    if(password !== confirmPassword) {
        errors.mismatch = "Password must match";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

export const validateContactPageInput = (firstname, lastname, email, content) => {
    const errors = {};
    if(firstname.trim() === "") errors.firstname = "First name must not empty";
    if(lastname.trim() === "") errors.lastname = "Last name must not empty";
    if(email.trim() === "") errors.email = "Email must not be empty";
    if(content.trim() === "") errors.content = "Email must not be empty";

    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!email.match(regEx)) errors.email = "Email needs to be a valid email address";
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
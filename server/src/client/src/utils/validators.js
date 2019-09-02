export const loginValidatorsInput = (values) => {
    let ferrors = {};
    console.log(values)
    if(!values.email) ferrors.email = "Email is required!";
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!regEx.test(values.email)) ferrors.email = "Email needs to be a valid email address";

    if(!values.password) ferrors.password = "Password is required!";

    return ferrors;
}

export const forgotPasswordValidatorInput = (values) => {
    let ferrors = {};
    if(!values.email) ferrors.email = "Email is required!";

    return ferrors;
}

export const contactPageValidatorInput = (values) => {
    let ferrors = {};
    if(!values.firstname) ferrors.firstname = "First name is required!";
    if(!values.lastname) ferrors.lastname = "Last name is required!";
    if(!values.email) ferrors.email = "Email is required!";
    if(!values.content) ferrors.content = "Content is required!";

    return ferrors;
}

module.exports = (
    firstname,
    lastname,
    email,
    content
) => {
    return `
        <html>
            <body>
                <h3>Query details from ${firstname + ' ' +lastname}</h3>
                <ul>
                    <li>Name: ${firstname + ' ' + lastname}</li>
                    <li>Email: ${email}</li>
                </ul>
                <h4>${content}</h4>
            </body>
        </html>
    `
};
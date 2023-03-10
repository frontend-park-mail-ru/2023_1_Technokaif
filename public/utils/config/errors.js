/**
 * All errors that register can output
 */
export const ERRORS_REG = {
    email: 'Incorrect email address',
    confirmEmail: 'Incorrect confirmation',
    password: 'Incorrect password. Big letters, small letters and digits required. Length 8-30. Quotes, points and space forbidden',
    username: 'Incorrect username. Contains letters, digits and "_". Length 4-20',
    firstName: 'Your firstname',
    lastName: 'Your lastname',
    day: 'Incorrect day',
    month: 'Incorrect month',
    year: 'Incorrect year',
    sex: 'Choose your gender.'
};

/**
 * All errors that login can output
 */
export const ERRORS_LOG = {
    password: 'Incorrect password. Big letters, small letters and digits required. Length 8-30. Quotes, points and space forbidden',
    email: 'Enter a correct email address.',
    username: 'Incorrect username. Contains letters, digits and "_". Length 4-20'
};

/**
 * All errors that register can output
 */
export const ERRORS_REG = {
    email: 'Enter a correct email address.',
    confirmEmail: 'Your email and confirm email is different or incorrect.',
    password: 'Your password is incorrect or empty. Forbiden: \' \" space \:. One big letter, one small letter, one digit minimum. Length 8-30',
    username: 'Your username is incorrect. Contains letters, digits, _ and length 4-20',
    firstName: 'Your first name is incorrect. Contains letters. Length 2-30',
    lastName: 'Your last name is incorrect. Contains letters. Length 2-30',
    day: 'Your day is incorrect.',
    month: 'Your month is incorrect.',
    year: 'Your year is incorrect.',
    sex: 'Choose your gender.'
};

/**
 * All errors that login can output
 */
export const ERRORS_LOG = {
    password: 'Your password is incorrect or empty. Forbiden: \' \" space \:. One big letter, one small letter, one digit minimum. Length 8-30',
    email: 'Enter a correct email address.',
    username: 'Your username is incorrect. Contains (a-z), (0-9), _ and length 8-30'
};

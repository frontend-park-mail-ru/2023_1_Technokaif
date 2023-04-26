/**
 * What errors return in getError messages
 */
export const ERRORS_VALIDATE = {
    password: 'password',
    email: 'email',
    emailConf: 'emailConf',
    username: 'username',
    name: 'Name',
    day: 'day',
    month: 'month',
    year: 'year',
};

/** Error of password */
export const PASSWORD_ERROR = {
    empty_field: 'Empty password',
    forbidden_symbols: 'Don\'t use \\ \' \" space :',
    length: 'Password must be between 8 and 30 symbols, lower case, upper case, and numbers required\n',
    letters: 'Must be big letters, small letters, digits',
};

/** Errors of username */
export const USERNAME_ERROR = {
    empty_field: 'Empty username',
    letters: 'Only contain letters, digits or \'_\'',
    length: 'Username must be more than 4 and less than 20',
};

/** Name of validation */
export const NAME_OF_VALIDATION = {
    email: 'email',
    password: 'password',
    confPassword: 'confPassword',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    day: 'day',
    month: 'month',
    year: 'year',
    validate_register: 'validate_register',
};

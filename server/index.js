'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());

const users = {
    'd.dorofeev@corp.mail.ru': {
        email: 'd.dorofeev@corp.mail.ru',
        password: 'password',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        date: '2022-04-12',
        sex: 'M'

    },
    's.volodin@corp.mail.ru': {
        email: 's.volodin@corp.mail.ru',
        password: 'password',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        date: '2022-04-12',
        sex: 'M'
    },
    'aleksandr.tsvetkov@corp.mail.ru': {
        email: 'aleksandr.tsvetkov@corp.mail.ru',
        password: 'password',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        date: '2022-04-12',
        sex: 'M'
    },
    'aostapenko@mail.ru': {
        email: '2002marsic@mail.ru',
        password: 'Pass25Dword',
        username: 'Use24rname',
        firstName: 'firstName',
        lastName: 'lastName',
        date: '2022-04-12',
        sex: 'M'
    }
};

const originalJwt = 'falksfasasfasfasf';

app.post('/auth/signup', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const date = req.body.date;
    const sex = req.body.sex;

    if (
        !password || !email ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/)
    ) {
        return res.status(400).json({ error: 'Не валидные данные пользователя' });
    }
    if (users[email]) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    users[email] = { password, email, username, firstName, lastName, date, sex };

    res.status(200).json({ id: 5 });
});

app.post('/auth/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({ error: 'Не верный E-Mail и/или пароль' });
    }

    res.headers.Authorization = originalJwt;
    res.status(200).json({ jwt: originalJwt });
});

app.get('/feed', (req, res) => {
    const jwt = req.headers.Authorization;
    if (jwt === undefined || jwt !== originalJwt) {
        res.status(200).json({
                tracks: [
                    {
                        name: 'Там где нас нет',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    },
                    {
                        name: 'Там где нас нет',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    },
                    {
                        name: 'Там где нас нет',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    }
                ],
                albums: [
                    {
                        name: 'Горгород',
                        description: 'Известный артист читает известные треки',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    }
                ],
                artists: [
                    {
                        name: 'Oxxxxy',
                        id: 5
                    },
                    {
                        name: 'Oxxxxy',
                        id: 5
                    }
                ]
        });
    } else {
        res.status(200).json({
                tracks: [
                    {
                        name: 'Там где нас нет',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    },
                    {
                        name: 'Там где нас нет',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    }
                ],
                albums: [
                    {
                        name: 'Горгород',
                        description: 'Известный артист читает известные треки',
                        id: 1,
                        artists: [
                            {
                                name: 'Oxxxxy',
                                id: 5
                            }
                        ]
                    }
                ],
                artists: [
                    {
                        name: 'Oxxxxy',
                        id: 5
                    },
                    {
                        name: 'Oxxxxy',
                        id: 5
                    }
                ]
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});

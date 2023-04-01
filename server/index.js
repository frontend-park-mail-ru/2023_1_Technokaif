const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
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
        birthDate: '2022-04-12',
        sex: 'M',

    },
    's.volodin@corp.mail.ru': {
        email: 's.volodin@corp.mail.ru',
        password: 'password',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        birthDate: '2022-04-12',
        sex: 'M',
    },
    'aleksandr@mail.ru': {
        email: 'aleksandr@mail.ru',
        password: '321Kruto',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        birthDate: '2022-04-12',
        sex: 'M',
    },
    '2002marsic@mail.ru': {
        email: '2002marsic@mail.ru',
        password: 'PassDword32',
        username: 'Username',
        firstName: 'firstName',
        lastName: 'lastName',
        birthDate: '2022-04-12',
        sex: 'M',
    },
};

const originalJwt = 'falksfasasfasfasf';

app.post('/api/auth/signup', (req, res) => {
    const { password } = req.body;
    const { email } = req.body;
    const { username } = req.body;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { date } = req.body;
    const { sex } = req.body;

    if (
        !password || !email
        || !password.match(/^\S{4,}$/)
        || !email.match(/@/)
    ) {
        return res.status(400).json({ message: 'Non valid user data' });
    }
    if (users[email]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users[email] = {
        password, email, username, firstName, lastName, date, sex,
    };

    res.status(200).json({ id: 5 });
});

app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    const email = req.body.username;
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({ message: 'Non valid E-Mail and/or password' });
    }

    res.status(200).json({ jwt: 'fdfksldsdgsgs82358afs' });
});

app.get('/api/auth/logout', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.get('/api/feed', (req, res) => {
    const jwt = req.headers.Authorization;
    if (jwt === undefined || jwt !== originalJwt) {
        res.status(200).json({
            tracks: [
                {
                    name: 'Там где нас нет',
                    id: 1,
                    cover: '/artists/instasamka.jpeg',
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
                {
                    name: 'Там где нас нет',
                    id: 1,
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
                {
                    name: 'Там где нас нет',
                    id: 1,
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
            ],
            albums: [
                {
                    name: 'Горгород',
                    description: 'Известный артист читает известные треки',
                    id: 1,
                    cover: '/artists/instasamka.jpeg',
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
            ],
            artists: [
                {
                    name: 'Oxxxxy',
                    id: 5,
                    cover: '/artists/instasamka.jpeg',
                },
                {
                    name: 'Oxxxxy',
                    id: 5,
                },
            ],
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
                            id: 5,
                        },
                    ],
                },
                {
                    name: 'Там где нас нет',
                    id: 1,
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
            ],
            albums: [
                {
                    name: 'Горгород',
                    description: 'Известный артист читает известные треки',
                    id: 1,
                    artists: [
                        {
                            name: 'Oxxxxy',
                            id: 5,
                        },
                    ],
                },
            ],
            artists: [
                {
                    name: 'Oxxxxy',
                    id: 5,
                },
                {
                    name: 'Oxxxxy',
                    id: 5,
                },
            ],
        });
    }
});

app.get(/^((?!\/(static|api)).)*$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening port ${port}`);
});

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
		sex: 'M',

	},
	's.volodin@corp.mail.ru': {
		email: 's.volodin@corp.mail.ru',
		password: 'password',
		username: 'username',
		firstName: 'firstName',
		lastName: 'lastName',
		date: '2022-04-12',
		sex: 'M',
	},
	'aleksandr.tsvetkov@corp.mail.ru': {
		email: 'aleksandr.tsvetkov@corp.mail.ru',
		password: 'password',
		username: 'username',
		firstName: 'firstName',
		lastName: 'lastName',
		date: '2022-04-12',
		sex: 'M',
	},
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		username: 'username',
		firstName: 'firstName',
		lastName: 'lastName',
		date: '2022-04-12',
		sex: 'M',
	},
};
const originalJwt = 'falksfasasfasfasf';

app.post('/auth/signup', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const age = req.body.age;
	if (
		!password || !email || !age ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/) ||
		!(typeof age === 'number' && age > 10 && age < 100)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {password, email, age, images: []};
	ids[id] = email;
	users[email] = user;

	res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/auth/login',  (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	res.headers['Authorization'] = originalJwt;

	res.status(200).json();
});

// app.get('/me', (req, res) => {
// 	const id = req.cookies['podvorot'];
// 	const email = ids[id];
// 	if (!email || !users[email]) {
// 		return res.status(401).end();
// 	}
//
// 	res.json(users[email]);
// });

app.get('/feed', (req, res) => {
	const id = req.headers['Authorization'];
	const emailSession = ids[id];
	if (!emailSession || !users[emailSession]) {
		return res.status(401).end();
	}

	const result = Object
		.values(users)
		.filter(({email}) => email !== emailSession)
		.map(user => user.images)
		.filter(Boolean)
	;

	res.json(result.flat());
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});

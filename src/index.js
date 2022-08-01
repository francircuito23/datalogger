const express = require('express');
const path = require('path');

const app = express();
const PUERTO = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./db/db')

app.listen(PUERTO, () => {
    console.log(`Servidor conectado al puerto ${PUERTO}`);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
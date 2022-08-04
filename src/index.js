const express = require('express');
const path = require('path');
var mysql = require('mysql');

const app = express();
const PUERTO = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//renderizado del css
app.use(express.static(path.join(__dirname, 'public/css')));
//renderizado del js
app.use(express.static(path.join(__dirname, 'public/web')));

//BBDD
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "prueba",
    user: "fgarcia",
    password: "hola3000"
});

//Conexión a la BBDD
con.connect(function(err) {
if(err){
    throw err;
}else{
    console.log("BBDD Conectada.");
}
});

//Iniciando el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor conectado al puerto ${PUERTO}`);
});

//Endpoints

//ruta del login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//ruta de la web
app.get('/combox', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/web/interfaz.html'));
});

//ruta para validar el login
app.post('/auth', (req, res) => {

	let nombre = req.body.nombre;
	let password = req.body.password;

	if (nombre && password) {

		con.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', [nombre, password], (error, results, fields) => {

			if (error) throw error;

			if (results.length > 0) {

				res.redirect('/combox');

                //res.send('Bienvenido.');

			} else {
				res.send('Contraseña o usuario incorrecto.');
			}			
			res.end();
		});
        
	} else {
		res.send('Complete los campos.');
		res.end();
	}
});

//API
//Ruta para get de buses
const Buses = require('./buses/getBuses').buses;
app.get('/buses', (req, res) => Buses(req,res,con));

//Hacer script para bloquear acceso directamente a /combox
const express = require('express');
const path = require('path');
var mysql = require('mysql');

const app = express();
const PUERTO = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PUERTO, () => {
    console.log(`Servidor conectado al puerto ${PUERTO}`);
});

//Endpoints

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/auth', function(req, res) {

	let nombre = req.body.nombre;
	let password = req.body.password;

	if (nombre && password) {

		con.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', [nombre, password], function(error, results, fields) {

			if (error) throw error;

			if (results.length > 0) {

				//res.redirect('/login');

                res.send('Bienvenido.');

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
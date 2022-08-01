var mysql = require('mysql');

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
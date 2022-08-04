//GET buses
const buses = (req, res, con) => {

    let sql = "SELECT * FROM prueba_bus";
    
    con.query(sql, function (err, result){
        if (err) throw err;

        if(result.length > 0){
            return res.json(result);
        }
        else{
            res.json(result);
        }
        
    });
}
exports.buses = buses;
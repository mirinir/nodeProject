var sql = require("mssql")
var config = require('../config/config.json')

sql.connect(config.development);
var request = new sql.Request();

const getAllClients = async (req, res) => {
    try {
       request.query('select name,id from clients',function (err, allClients) {
            let nameList = "";
            console.log('the all Clients: ', allClients);
            allClients.recordset.forEach((el) => {
                // nameList += `<li>${el.name}</li>`;
                nameList += el.name + " ";
            });
        //   res.send(nameList)
            res.status(200).json({ nameList: allClients });
        });
   } 
    catch (error) {
        res.status(400).send(error)
    }
}

const getInvestmentPoolmName = async (req, res) => {
    try {
         
        let  {cId} = req.params
        request.query(`SELECT distinct investment_pool.id as IPI,investment_pool.name,clients.id as clientId
        FROM  investment_pool
        FULL OUTER JOIN client_pool 
        ON client_pool.investment_pool_id = investment_pool.id INNER JOIN clients 
        ON client_pool.client_id=clients.id
        where client_pool.client_id = ${cId}
        or (${cId} is null)`
            , function (err, data) {
                let CPool = "";
                console.log('the all data: ', data);
                data.recordset.forEach((cp) => {
                    // nameList += `<li>${el.name}</li>`;
                    CPool += cp.name + " ";
                });
                // res.send(data)
                res.status(200).json({ CPool: data });
            });
    }
    catch (error) {
        res.status(400).send(error)
    }
}

const getStoresNames = async (req, res) => {
    try {
        let {IPI,cId} = req.params
     
        request.query(`SELECT stores.name,client_pool.amount_invested
        FROM  stores
        INNER JOIN investment_pool 
        ON investment_pool.id = stores.investment_pool_id
        INNER JOIN client_pool 
        ON client_pool.investment_pool_id=investment_pool.id
        where client_pool.client_id =${cId}
        AND ( client_pool.investment_pool_id=${IPI})`
            , function (err, data) {
                let CPool = "";
                console.log('the all data: ', data);
                data.recordset.forEach((stores) => {
                    // nameList += `<li>${el.name}</li>`;
                    CPool += stores.name + " ";
                });
                // res.send(CPool)
                res.status(200).json({ stores: data });
            });
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getAllClients,
    getInvestmentPoolmName,
    getStoresNames
}

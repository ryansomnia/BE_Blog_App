const mysql = require("../config/mysql");
const redis = require("../config/redis");

let user = {
    getAllData : async(req, res) => {
        try {
            let qry = 'SELECT * FROM user';
            let hasil = await mysql.exec(qry)
            console.log('asas',hasil);

            let response = {
                code: 200,
                status:'success',
                message: 'data berhasil didapat',
                data:hasil 
            }
            console.log(response);

            res.status(response.code).send(response)
            return hasil;

        } catch (error) {
            console.log('eee', error);
            let response = {
                code: 500,
                status:'error',
                message: error.TypeError,
                data:null 
            }
            res.status(response.code).send(response)
        }
    
},
setOneDataByRedis : async(req, res) => {
    try {
        let key = req.body.key
        const val = req.body.value
    await redis.setRedis(key, val)
        let response =  {
            code: 200,
            status:'success',
            message: 'data berhasil di set',
            data:{key : val}
        }
        return res.send(response).status(200);
    } catch (error) {
        let response = {
            code: 500,
            status:'error',
            message: error.message,
            data:null 
        }
        res.status(response.code).send(response)
    }

},
getOneDataByRedis : async(req, res) => {
    try {
        let key = req.body.key

        let value = await redis.getRedis(key);
        console.log(value);
        let response = {
            code: 200,
            status:'success',
            message: 'data berhasil didapat',
            data:value 
        }
        console.log(response);

      return res.status(response.code).send(response)
     

    } catch (error) {
        let response = {
            code: 500,
            status:'error',
            message: error,
            data:null 
        }
      return  res.status(response.code).send(response)
        
    }

},
    addData : async(req, res) => {
        let idRegis = req.body.idRegis
        let username = req.body.username
        let password = req.body.password
        let fullName = req.body.fullName
        let sex = req.body.sex
        let role = req.body.role
        let address = req.body.address
        let email = req.body.email
        let handphone = req.body.handphone
        let status = req.body.status

        try {
            let qry = `INSERT INTO user(idRegis, username, password, fullName, sex,
                 role, address, email, handphone, status) 
            VALUES ('${idRegis}', '${username}', '${password}', '${fullName}', '${sex}',
             '${role}', '${address}', '${email}', '${handphone}', '${status}');
            `
                let hasil = await mysql.exec(qry);
                console.log(hasil);
            let response = {
                code: 200,
                status:'success',
                message: 'data berhasil didapat',
                data:req.body 
            }
            console.log(response);

            res.status(response.code).send(response)
            return response;
        } catch (e) {
            let response = {
                code: 500,
                status:'error',
                message: error.TypeError,
                data:null 
            }
            console.log(response);

            res.status(response.code).send(response)
            return response;
        }
    }
}
module.exports = user;
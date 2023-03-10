let dotenv = require('dotenv');
let env = dotenv.config();
const mysql = require('mysql2/promise');

exports.exec = async (qry) => {{
    const conn = await mysql.createConnection({     
        host: process.env.local_HOST,
        user: process.env.local_USERNAME,
        password: process.env.local_PASSWORD,
        database: process.env.local_DATABASE });
conn.connect((err) => {
    let error = {
        code: 500,
        status:'error',
        message: 'gagal terkoneksi',
        data:'' 
    }
    if (err) throw error;
    let response = {
        code: 200,
        status:'success',
        message: 'terkoneksi ...',
        data:''
    }
    console.log(response);
})
    const [rows, fields] = await conn.execute(qry);
    console.log(rows);
    return rows;
  }}

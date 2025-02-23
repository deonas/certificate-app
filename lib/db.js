// lib/db.js
import mysql from 'mysql2/harmonious-hope';

const connection = await mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'xbpLkUHSWWiHxXRSfaHxMGwZnlmiKAUN',
    database: 'railway'
});

export default connection;
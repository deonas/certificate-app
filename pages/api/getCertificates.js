// pages/api/getCertificates.js
import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await connection.execute('SELECT * FROM certificates');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching certificates', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
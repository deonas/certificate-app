// pages/api/certificates.js
import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, issuer, date_issued, certificate_url } = req.body;

        try {
            const [result] = await connection.execute(
                'INSERT INTO certificates (name, issuer, date_issued, certificate_url) VALUES (?, ?, ?, ?)',
                [name, issuer, date_issued, certificate_url]
            );

            res.status(200).json({ message: 'Certificate added successfully!', id: result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Error adding certificate', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
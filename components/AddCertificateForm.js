// components/AddCertificateForm.js new
import { useState } from 'react';

export default function AddCertificateForm() {
    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [dateIssued, setDateIssued] = useState('');
    const [certificateUrl, setCertificateUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/certificates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, issuer, date_issued: dateIssued, certificate_url: certificateUrl }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Issuer"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Date Issued"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
                required
            />
            <input
                type="url"
                placeholder="Certificate URL"
                value={certificateUrl}
                onChange={(e) => setCertificateUrl(e.target.value)}
                required
            />
            <button type="submit">Add Certificate</button>
            {message && <p>{message}</p>}
        </form>
    );
}

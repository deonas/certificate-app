// components/CertificateList.js
import { useEffect, useState } from 'react';

export default function CertificateList() {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetch('/api/getCertificates')
            .then((response) => response.json())
            .then((data) => setCertificates(data));
    }, []);

    return (
        <div>
            <h2>Certificates</h2>
            <ul>
                {certificates.map((certificate) => (
                    <li key={certificate.id}>
                        <h3>{certificate.name}</h3>
                        <p>Issuer: {certificate.issuer}</p>
                        <p>Date Issued: {certificate.date_issued}</p>
                        <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer">
                            View Certificate
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
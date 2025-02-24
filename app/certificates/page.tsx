// "use client";
// import { useEffect, useState } from "react";

// // ✅ Define the expected type of a Certificate
// type Certificate = {
//   id: string;
//   certificateId: string;
//   name: string;
//   issuer: string;
//   date: string;
//   url: string;
// };

// export default function Certificates() {
//   // ❌ TypeScript assumes 'never[]' by default, causing the error
//   // ✅ Explicitly define the type
//   const [certificates, setCertificates] = useState<Certificate[]>([]);

//   useEffect(() => {
//     fetch("/api/certificates")
//       .then((res) => res.json())
//       .then((data: Certificate[]) => setCertificates(data)) // ✅ Explicitly set type
//       .catch((error) => console.error("Error fetching certificates:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Certificates</h1>
//       <ul>
//         {certificates.map((cert) => (
//           <li key={cert.id}>
//             <strong>{cert.name}</strong> - {cert.issuer} - {cert.date}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// import React from "react";

// const CertificatesPage = () => {
//   return (
//     <div>
//       <h1>Certificates</h1>
//       <p>No certificates found. Make sure the API is working.</p>
//     </div>
//   );
// };

// export default CertificatesPage;
"use client";
import React, { useEffect, useState } from "react";

type Certificate = {
  id: string;
  certificateId: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
};

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates") // Fetch from your API
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Certificates</h1>
      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <ul>
          {certificates.map((cert) => (
            <li key={cert.id}>
              <strong>{cert.name}</strong> - {cert.issuer} ({cert.date}) <br />
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                View Certificate
                <p>Verified✅</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CertificatesPage;

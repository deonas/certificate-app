// "use client";

// import React, { useEffect, useState } from "react";

// type Certificate = {
//   id: string;
//   name: string;
//   issuer: string;
//   date: string;
//   image?: string;
//   certificateUrl: string;
//   joiningLetterUrl?: string;
//   recommendationLetterUrl?: string;
// };

// export default function CertificatesPage() {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);

//   useEffect(() => {
//     fetch("/api/certificates")
//       .then((res) => res.json())
//       .then((data) => setCertificates(data))
//       .catch((err) => console.error("Error fetching certificates:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6">
//         📜 My Certificates
//       </h1>

//       {certificates.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
//           {certificates.map((cert) => (
//             <div
//               key={cert.id}
//               className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105"
//             >
//               {cert.image && (
//                 <img
//                   src={cert.image}
//                   alt={cert.name}
//                   className="w-full h-40 object-cover rounded-md mb-4"
//                 />
//               )}
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {cert.name}
//               </h2>
//               <p className="text-gray-600">🏢 {cert.issuer}</p>
//               <p className="text-gray-500">📅 {cert.date}</p>

//               {/* Buttons for different documents */}
//               <div className="mt-4 flex flex-col gap-2">
//                 <a
//                   href={cert.certificateUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-center"
//                 >
//                   View Certificate
//                 </a>

//                 {cert.joiningLetterUrl && (
//                   <a
//                     href={cert.joiningLetterUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-center"
//                   >
//                     View Joining Letter
//                   </a>
//                 )}

//                 {cert.recommendationLetterUrl && (
//                   <a
//                     href={cert.recommendationLetterUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition text-center"
//                   >
//                     View Recommendation Letter
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 mt-4">No certificates found.</p>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  certificateUrl: string;
  joiningLetterUrl?: string;
  recommendationLetterUrl?: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Function to fetch certificates
  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://my-certificate-iemti1imb-deonas-projects.vercel.app/certificates",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response Status:", res.status);

      if (!res.ok) {
        const errorText = await res.text(); // Read error response
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setCertificates(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("🚨 Fetch Error:", err.message);
        setError(`Unable to load certificates: ${err.message}`);
      } else {
        console.error("🚨 An unknown error occurred:", err);
        setError("Unable to load certificates due to an unknown error.");
      }
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        📜 My Certificates
      </h1>

      {/* ✅ Show error message if fetching fails */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ✅ Refresh button */}
      <button
        onClick={fetchCertificates}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition"
      >
        Refresh Certificates 🔄
      </button>

      {/* ✅ Show loading spinner instead of plain text */}
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading certificates...</p>
        </div>
      ) : certificates.length === 0 ? (
        <p className="text-gray-500 mt-4">No certificates found.</p>
      ) : (
        <ul className="space-y-4">
          {certificates.map((cert) => (
            <li key={cert.id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{cert.name}</h2>
              <p className="text-gray-500">
                {cert.issuer} - {cert.date}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a
                  href={cert.certificateUrl}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  📜 View Certificate
                </a>
                {cert.joiningLetterUrl && (
                  <a
                    href={cert.joiningLetterUrl}
                    className="text-green-500 underline"
                    target="_blank"
                  >
                    📄 View Joining Letter
                  </a>
                )}
                {cert.recommendationLetterUrl && (
                  <a
                    href={cert.recommendationLetterUrl}
                    className="text-purple-500 underline"
                    target="_blank"
                  >
                    ✉️ View Recommendation Letter
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

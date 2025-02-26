// "use client";

// import { useEffect, useState } from "react";

// interface Certificate {
//   id: string;
//   name: string;
//   issuer: string;
//   date: string;
//   certificateUrl: string;
//   joiningLetterUrl?: string;
//   recommendationLetterUrl?: string;
// }

// export default function CertificatesPage() {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // ✅ Function to fetch certificates
//   const fetchCertificates = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Try absolute and relative URL in case of fetch issues
//       const apiUrl =
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/api/certificates"
//           : "/api/certificates";

//       console.log("🔄 Fetching certificates from:", apiUrl);

//       const res = await fetch(apiUrl, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📡 Response Status:", res.status);

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();

//       if (!Array.isArray(data)) {
//         throw new Error("Unexpected API response format.");
//       }

//       console.log("✅ Certificates received:", data);
//       setCertificates(data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error("🚨 Fetch Error:", err.message);
//         setError(`Unable to load certificates: ${err.message}`);
//       } else {
//         console.error("🚨 An unknown error occurred:", err);
//         setError("Unable to load certificates due to an unknown error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   return (

//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6">Certificates</h1>

//       {/* ✅ Show error message if fetching fails */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* ✅ Refresh button */}
//       {/* <button
//         onClick={fetchCertificates}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition"
//       >
//         Refresh Certificates 🔄
//       </button> */}

//       {/* ✅ Show loading spinner instead of plain text */}
//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-500">Loading certificates...</p>
//         </div>
//       ) : certificates.length === 0 ? (
//         <p className="text-gray-500 mt-4">No certificates found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {certificates.map((cert) => (
//             <li
//               key={cert.id}
//               className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4"
//             >
//               <img
//                 src="data:image/png;base64,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" // Ensure this is inside the "public" folder
//                 alt="Company Logo"
//                 className="absolute top-0 left-2 w-48 h-24 object-contain"
//                 // Ensure proper size
//               />
//               {/* ✅ Larger Verified GIF */}
//               <img
//                 src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXRkanRkdXJ5cGlwYjN0bGlnMjZnOWZncGFqNHZ4amx6bWRqcWtsMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PijzuUzUhm7hcWinGn/giphy.gif"
//                 alt="Verified"
//                 className="w-16 h-16" // Increased size
//               />

//               <h2 className="text-xl font-semibold">{cert.name}</h2>
//               <div className="text-gray-500">
//                 <p>{cert.issuer}</p>
//                 <p>{cert.date}</p>
//               </div>

//               <div className="mt-2 flex flex-wrap gap-4">
//                 <a
//                   href={cert.certificateUrl}
//                   className="text-blue-500 underline"
//                   target="_blank"
//                 >
//                   📜View Certificate
//                 </a>
//                 {cert.joiningLetterUrl && (
//                   <a
//                     href={cert.joiningLetterUrl}
//                     className="text-green-500 underline"
//                     target="_blank"
//                   >
//                     📄View Joining Letter
//                   </a>
//                 )}
//                 {cert.recommendationLetterUrl && (
//                   <a
//                     href={cert.recommendationLetterUrl}
//                     className="text-purple-500 underline"
//                     target="_blank"
//                   >
//                     ✉️View Recommendation Letter
//                   </a>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";

// interface Certificate {
//   id: string;
//   name: string;
//   issuer: string;
//   date: string;
//   certificateUrl: string;
//   joiningLetterUrl?: string;
//   recommendationLetterUrl?: string;
// }

// export default function CertificatesPage() {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCertificates = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiUrl =
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/api/certificates"
//           : "/api/certificates";

//       console.log("🔄 Fetching certificates from:", apiUrl);

//       const res = await fetch(apiUrl, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📡 Response Status:", res.status);

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();

//       if (!Array.isArray(data)) {
//         throw new Error("Unexpected API response format.");
//       }

//       console.log("✅ Certificates received:", data);
//       setCertificates(data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error("🚨 Fetch Error:", err.message);
//         setError(`Unable to load certificates: ${err.message}`);
//       } else {
//         console.error("🚨 An unknown error occurred:", err);
//         setError("Unable to load certificates due to an unknown error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-6"
//       style={{
//         backgroundImage:
//           "url('https://th.bing.com/th/id/OIP.vFzrIM2R7hCCmjRFMojeRQHaEK?rs=1&pid=ImgDetMain')",
//       }}
//     >
//       <img
//         src="data:image/png;base64,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"
//         alt="Company Logo"
//         className="absolute top-4 left-4 w-32 h-20 object-contain"
//       />

//       <h1 className="text-3xl font-bold text-white mb-6">Intern's Folio</h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-500">Loading certificates...</p>
//         </div>
//       ) : certificates.length === 0 ? (
//         <p className="text-gray-500 mt-4">No certificates found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {certificates.map((cert) => (
//             <li
//               key={cert.id}
//               className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4 w-full max-w-2xl"
//             >
//               <img
//                 src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif"
//                 alt="Verified"
//                 className="w-20 h-20"
//               />

//               <div className="flex flex-col">
//                 <h2 className="text-xl font-semibold">{cert.name}</h2>
//                 <div className="text-gray-500">
//                   <p>{cert.issuer}</p>
//                   <p>{cert.date}</p>
//                 </div>

//                 <div className="mt-2 flex flex-col gap-2">
//                   <a
//                     href={cert.certificateUrl}
//                     className="text-blue-500 underline"
//                     target="_blank"
//                   >
//                     📜 View Certificate
//                   </a>
//                   {cert.joiningLetterUrl && (
//                     <a
//                       href={cert.joiningLetterUrl}
//                       className="text-green-500 underline"
//                       target="_blank"
//                     >
//                       📄 View Joining Letter
//                     </a>
//                   )}
//                   {cert.recommendationLetterUrl && (
//                     <a
//                       href={cert.recommendationLetterUrl}
//                       className="text-purple-500 underline"
//                       target="_blank"
//                     >
//                       ✉️ View Recommendation Letter
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       <footer className="mt-auto py-4 text-center text-white">
//         <a
//           href="https://purplerain.framer.ai/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Company Website
//         </a>
//       </footer>
//     </div>
//   );
// }

//org

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image"; // Import the Image component from next/image

// interface Certificate {
//   id: string;
//   name: string;
//   issuer: string;
//   date: string;
//   certificateUrl: string;
//   joiningLetterUrl?: string;
//   recommendationLetterUrl?: string;
// }

// export default function CertificatesPage() {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCertificates = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiUrl =
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/api/certificates"
//           : "/api/certificates";

//       console.log("🔄 Fetching certificates from:", apiUrl);

//       const res = await fetch(apiUrl, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📡 Response Status:", res.status);

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();

//       if (!Array.isArray(data)) {
//         throw new Error("Unexpected API response format.");
//       }

//       console.log("✅ Certificates received:", data);
//       setCertificates(data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error("🚨 Fetch Error:", err.message);
//         setError(`Unable to load certificates: ${err.message}`);
//       } else {
//         console.error("🚨 An unknown error occurred:", err);
//         setError("Unable to load certificates due to an unknown error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-6"
//       style={{
//         backgroundImage:
//           "url('https://th.bing.com/th/id/OIP.vFzrIM2R7hCCmjRFMojeRQHaEK?rs=1&pid=ImgDetMain')",
//       }}
//     >
//       <Image
//         src="/new.png" // Path relative to the `public` folder
//         alt="Company Logo"
//         width={128}
//         height={80}
//         className="absolute top-4 left-4 w-32 h-20 object-contain"
//       />

//       <h1 className="text-3xl font-bold text-white mb-6">
//         Intern&apos;s Folio
//       </h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-500">Loading certificates...</p>
//         </div>
//       ) : certificates.length === 0 ? (
//         <p className="text-gray-500 mt-4">No certificates found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {certificates.map((cert) => (
//             <li
//               key={cert.id}
//               className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4 w-full max-w-2xl"
//             >
//               <Image
//                 src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif"
//                 alt="Verified"
//                 width={80}
//                 height={80}
//                 className="w-20 h-20"
//               />

//               <div className="flex flex-col">
//                 <h2 className="text-xl font-semibold">{cert.name}</h2>
//                 <div className="text-gray-500">
//                   <p>{cert.issuer}</p>
//                   <p>{cert.date}</p>
//                 </div>

//                 <div className="mt-2 flex flex-col gap-2">
//                   <a
//                     href={cert.certificateUrl}
//                     className="text-blue-500 underline"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     📜 View Certificate
//                   </a>
//                   {cert.joiningLetterUrl && (
//                     <a
//                       href={cert.joiningLetterUrl}
//                       className="text-green-500 underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       📄 View Joining Letter
//                     </a>
//                   )}
//                   {cert.recommendationLetterUrl && (
//                     <a
//                       href={cert.recommendationLetterUrl}
//                       className="text-purple-500 underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       ✉️ View Recommendation Letter
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       <footer className="mt-auto py-4 text-center text-white">
//         <a
//           href="https://purplerain.framer.ai/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Company Website
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = "/api/certificates"; // Always use the relative path in production

      console.log("🔄 Fetching certificates from:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      console.log("📡 Response Status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format.");
      }

      console.log("✅ Certificates received:", data);
      setCertificates(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("🚨 Fetch Error:", err.message);
        setError(`Unable to load certificates: ${err.message}`);
      } else {
        console.error("🚨 An unknown error occurred:", err);
        setError("Unable to load certificates due to an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-6"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.vFzrIM2R7hCCmjRFMojeRQHaEK?rs=1&pid=ImgDetMain')",
      }}
    >
      <Image
        src="/new.png" // Path relative to the `public` folder
        alt="Company Logo"
        width={128}
        height={80}
        className="absolute top-4 left-4 w-32 h-20 object-contain"
      />

      <h1 className="text-3xl font-bold text-white mb-6">
        Intern&apos;s Folio
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            <li
              key={cert.id}
              className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4 w-full max-w-2xl"
            >
              <Image
                src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif"
                alt="Verified"
                width={80}
                height={80}
                className="w-20 h-20"
                unoptimized // Add this prop for animated GIFs
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{cert.name}</h2>
                <div className="text-gray-500">
                  <p>{cert.issuer}</p>
                  <p>{cert.date}</p>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  <a
                    href={cert.certificateUrl}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📜 View Certificate
                  </a>
                  {cert.joiningLetterUrl && (
                    <a
                      href={cert.joiningLetterUrl}
                      className="text-green-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 View Joining Letter
                    </a>
                  )}
                  {cert.recommendationLetterUrl && (
                    <a
                      href={cert.recommendationLetterUrl}
                      className="text-purple-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ✉️ View Recommendation Letter
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <footer className="mt-auto py-4 text-center text-white">
        <a
          href="https://purplerain.framer.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Company Website
        </a>
      </footer>
    </div>
  );
}

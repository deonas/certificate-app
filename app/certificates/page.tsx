
// app/certificates/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// ✅ Safely Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase environment variables are missing!");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  joiningLetterUrl?: string;
  recommendationLetterUrl?: string;
}

interface SupabaseCertificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  certificateurl?: string;
  joiningletterurl?: string;
  recommendationletterurl?: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching data from Supabase...");
        const { data, error } = await supabase.from("certificates").select("*");

        if (error) throw error;

        console.log("Fetched Certificates:", JSON.stringify(data, null, 2));

        // ✅ Map API response to match TypeScript interface
        const transformedData = data.map((cert: SupabaseCertificate) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          certificateUrl: cert.certificateurl,
          joiningLetterUrl: cert.joiningletterurl,
          recommendationLetterUrl: cert.recommendationletterurl,
        }));

        setCertificates(transformedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Unable to load certificates: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-4 md:p-6"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp2987144.jpg')",
        backgroundSize: "cover", // Ensure the background covers the entire element
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Image
        src="/pic7.jpg"
        alt="Company Logo"
        width={100}
        height={40}
        className="absolute top-2 left-2 w-32 h-10 md:w-40 md:h-20 object-contain"
      />

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
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
        <ul className="space-y-4 w-full max-w-md md:max-w-2xl">
          {certificates.map((cert) => (
            <li
              key={cert.id}
              className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center gap-4"
            >
              <Image
                src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif"
                alt="Verified"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20"
                unoptimized
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-black">
                  {cert.name}
                </h2>
                <div className="text-gray-500">
                  <p>{cert.issuer}</p>
                  <p>{cert.date}</p>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {cert.certificateUrl ? (
                    <a
                      href={cert.certificateUrl}
                      className="text-blue-500 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📜 View Certificate
                    </a>
                  ) : (
                    <p className="text-red-500">❌ Certificate Not Available</p>
                  )}

                  {cert.joiningLetterUrl ? (
                    <a
                      href={cert.joiningLetterUrl}
                      className="text-green-500 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 View Joining Letter
                    </a>
                  ) : (
                    <p className="text-red-500">
                      ❌ Joining Letter Not Available
                    </p>
                  )}

                  {cert.recommendationLetterUrl ? (
                    <a
                      href={cert.recommendationLetterUrl}
                      className="text-purple-500 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ✉️ View Recommendation Letter
                    </a>
                  ) : (
                    <p className="text-red-500">
                      ❌ Recommendation Letter Not Available
                    </p>
                  )}
                </div>

                {/* Add QR Code Here */}
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

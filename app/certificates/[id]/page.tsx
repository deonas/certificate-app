"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

export default function CertificatePage() {
  const params = useParams();
  const id = params?.id as string;

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Certificate ID is missing.");
      setLoading(false);
      return;
    }

    const fetchCertificate = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        const transformedData = {
          id: data.id,
          name: data.name,
          issuer: data.issuer,
          date: data.date,
          certificateUrl: data.certificateurl,
          joiningLetterUrl: data.joiningletterurl,
          recommendationLetterUrl: data.recommendationletterurl,
        };

        setCertificate(transformedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Unable to load certificate: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
          {error}
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
          Certificate not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col">
      {/* Logo at the very top */}
      <div className="w-full p-4">
        <Image
          src="/pic7.jpg"
          alt="Company Logo"
          width={180}
          height={60}
          className="object-contain"
        />
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Intern&apos;s Folio
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                <Image
                  src="https://th.bing.com/th/id/OIP.Q2kHYfvOGPSLAsGa7RSo7QHaHa?rs=1&pid=ImgDetMain"
                  alt="Verified"
                  width={120}
                  height={120}
                  className="relative rounded-full"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {certificate.name}
                </h2>
                <div className="text-blue-200 space-y-1">
                  <p className="text-lg">{certificate.issuer}</p>
                  <p className="font-light">{certificate.date}</p>
                </div>

                <div className="mt-8 space-y-4">
                  {certificate.certificateUrl && (
                    <a
                      href={certificate.certificateUrl}
                      className="flex items-center gap-3 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl">📄</span>
                      <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
                        View Certificate
                      </span>
                    </a>
                  )}

                  {certificate.joiningLetterUrl && (
                    <a
                      href={certificate.joiningLetterUrl}
                      className="flex items-center gap-3 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl">📄</span>
                      <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
                        View Joining Letter
                      </span>
                    </a>
                  )}

                  {certificate.recommendationLetterUrl && (
                    <a
                      href={certificate.recommendationLetterUrl}
                      className="flex items-center gap-3 px-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl">📄</span>
                      <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
                        View Recommendation Letter
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at the very bottom */}
      <footer className="w-full py-6 bg-black/20 mt-auto">
        <a
          href="https://purplerain.framer.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-200 hover:text-white transition-colors duration-300 text-lg"
        >
          Visit Company Website
        </a>
      </footer>
    </div>
  );
}

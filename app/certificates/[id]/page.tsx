"use client";

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

  // Test Supabase connection
  useEffect(() => {
    const testSupabaseConnection = async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .limit(1);
      if (error) {
        console.error("Supabase connection error:", error);
      } else {
        console.log("Supabase connection successful:", data);
      }
    };

    testSupabaseConnection();
  }, []);

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
        console.log(`Fetching certificate with ID: ${id} from Supabase...`);
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        console.log("Fetched Certificate Data:", data);

        // Transform the fetched data to match the interface
        const transformedData = {
          id: data.id,
          name: data.name,
          issuer: data.issuer,
          date: data.date,
          certificateUrl: data.certificateurl, // Map lowercase to camelCase
          joiningLetterUrl: data.joiningletterurl, // Map lowercase to camelCase
          recommendationLetterUrl: data.recommendationletterurl, // Map lowercase to camelCase
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!certificate) {
    return <div>Certificate not found.</div>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
        Certificate Details
      </h1>

      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading certificate...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : certificate ? (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-black">
              {certificate.name}
            </h2>
            <div className="text-gray-500">
              <p>{certificate.issuer}</p>
              <p>{certificate.date}</p>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {certificate.certificateUrl ? (
                <a
                  href={certificate.certificateUrl}
                  className="text-blue-500 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📜 View Certificate
                </a>
              ) : (
                <p className="text-red-500">❌ Certificate Not Available</p>
              )}

              {certificate.joiningLetterUrl ? (
                <a
                  href={certificate.joiningLetterUrl}
                  className="text-green-500 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View Joining Letter
                </a>
              ) : (
                <p className="text-red-500">❌ Joining Letter Not Available</p>
              )}

              {certificate.recommendationLetterUrl ? (
                <a
                  href={certificate.recommendationLetterUrl}
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
          </div>
        </div>
      ) : (
        <p className="text-red-500">Certificate not found.</p>
      )}
    </div>
  );
}

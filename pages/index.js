// pages/index.js
import Head from 'next/head';
import AddCertificateForm from '../components/AddCertificateForm';
import CertificateList from '../components/CertificateList';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Certificate App</title>
                <meta name="description" content="Store and view certificates" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Certificate App</h1>
                <AddCertificateForm />
                <CertificateList />
            </main>
        </div>
    );
}
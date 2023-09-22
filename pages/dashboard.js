import TagSEO from "@/components/TagSEO";
import { Nav } from "@/components/Nav";
import { usePrivate } from "@/hooks/usePrivate";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useRouter } from 'next/router'; // Import useRouter

export default function Dashboard() {
  const [session, loading] = usePrivate({
    callbackUrl: "/dashboard",
  });
  const [qrs, setQrs] = useState([]);
  const router = useRouter(); // Use useRouter hook

  useEffect(() => {
    const fetchQrs = async () => {
      const res = await fetch('/api/qrs');
      const data = await res.json();
      setQrs(data);
    }
    fetchQrs();
  }, []);

  const handleDownload = (qr) => {
    saveAs(qr.output_url, "QRartai.png");
  };

  return (
    <>
      <TagSEO title="Dashboard | QRart" canonicalSlug="/dashboard" />
      <Nav/>
      <main className="min-h-screen p-10 pb-24">
      {router.query.from === 'create-qr' && (
          <div className="alert alert-success mb-6Ê">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Your QR code is being generated and will soon be shown here.</span>
        </div>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold">
          My QR-codes
        </h1>   

        

        <section className="flex flex-wrap justify-start max-w-full	 mx-auto space-x-3 mt-12">
          {qrs.map((qr, index) => (
            <div className="max-w-xs	card card-compact w-96 bg-base-100 shadow-xl mb-6" key={index}>
              <figure><img src={qr.output_url} alt="QR Code" /></figure>
              <div className="card-body">
                <h2 className="card-title">{qr.style}</h2>
                <p>{qr.input_url}</p>
                <div className="card-actions justify-end">
                  <button className="btn" onClick={() => handleDownload(qr)}>Download</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
import TagSEO from "@/components/TagSEO";
import { Nav } from "@/components/Nav";
import { usePrivate } from "@/hooks/usePrivate";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";


export default function Dashboard() {
  const [session, loading] = usePrivate({
    callbackUrl: "/dashboard",
  });
  const [qrs, setQrs] = useState([]);

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
      {/* 👇 Add all your SEO tags for the page. canonicalSlug required, other tags a prefilled with your default */}
      <TagSEO title="Dashboard | QRart" canonicalSlug="/dashboard" />

      <Nav/>
      
      <main className="min-h-screen p-10 pb-24">

    
          <h1 className="text-3xl md:text-4xl font-extrabold max-w-xl mx-auto mb-16">
            Dashboard
          </h1>    
          
          <section className="flex flex-wrap justify-start max-w-full	 mx-auto space-x-3">
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
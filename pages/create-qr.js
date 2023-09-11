
import TagSEO from "@/components/TagSEO";
import { Nav } from "@/components/Nav";
import Form from "@/components/Form";
import { usePrivate } from "@/hooks/usePrivate";

export default function Dashboard() {
  const [session, status] = usePrivate({
    callbackUrl: "/create-qr",
  });

  return (
    <>
      {/* 👇 Add all your SEO tags for the page. canonicalSlug required, other tags a prefilled with your default */}
      <TagSEO title="Create QR-code | QRart" canonicalSlug="/dashboard" />

        <Nav/>
        
        <main
        className="min-h-screen p-10 pb-24"
        >
        <section className="max-w-screen-xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
          Create QR-code
          </h1>
          <>
         
          <Form />
        
    </>
        </section>

        
      </main>
    </>
  );
}
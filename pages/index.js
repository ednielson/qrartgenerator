import TagSEO from "@/components/TagSEO";
import TagSchema from "@/components/TagSchema";
import { Nav } from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>

<TagSEO 
      title="AI QR-code generator - Turn QR-codes into art | QRart"
      description="Generate beautiful QR codes in seconds with our AI QR Art generator. Pick a style & download your unique QR-code."
    />
      <TagSchema />

       <Nav />

      <Hero/>

      <Footer />

 
    </>
  );
}

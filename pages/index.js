import TagSEO from "@/components/TagSEO";
import TagSchema from "@/components/TagSchema";
import { Nav } from "@/components/Nav";
import ButtonGradient from "@/components/ButtonGradient";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>

      <TagSEO canonicalSlug="" />
      <TagSchema />

       <Nav />

      <Hero/>

 
    </>
  );
}

import TagSEO from "@/components/TagSEO";
import TagSchema from "@/components/TagSchema";
import { Nav } from "@/components/Nav";
import ButtonGradient from "@/components/ButtonGradient";

export default function Home() {
  return (
    <>
      <TagSEO canonicalSlug="" />
      <TagSchema />
    <Nav />
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-20">
    <div className="items-center flex justify-center max">
  <div className="w-full mx-auto py-24 text-center">
    <h1 className="text-2xl leading-[1.6rem] font-bold tracking-tight text-primary-500 sm:text-4xl sm:leading-[3rem] lg:text-[38px]">Turn QR Codes into Art,<br/> with our AI QR-generator</h1>

     <h2 className="text-xl text-accent font-semibold mt-3"> The #1 AI QR-code generator</h2> 
     <p className="text-lg mt-3">Generate artistic QR codes in seconds with our AI QR Art generator.<br/>
     Choose style & receive your unique QR-code.</p>
    <div className="mt-3">
      <div className="mt-5">
        <div className="content-center items-center gap-6 flex justify-center">
            <ButtonGradient/>
        </div>
      </div>
      <div className="items-center flex mt-5">
        
        <p className="text-stone-00 text-sm mx-auto">
          <strong className="font-bold">1,236 </strong> QR-codes already created
        </p>{" "}
       
      </div>{" "}
      
    </div>
  </div>
</div>
</div>
 
    </>
  );
}

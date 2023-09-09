
import { useState } from "react";
import { signOut } from "next-auth/react";
import apiClient from "@/libs/api";
import { usePrivate } from "@/hooks/usePrivate";
import TagSEO from "@/components/TagSEO";
import { Nav } from "@/components/Nav";

export default function Dashboard() {
  // Custom hook to make private pages easier to deal with (see /hooks folder)
  const [session, status] = usePrivate({
    callbackUrl: "/create-qr",
  });
  const [isLoading, setIsLoading] = useState(false);

  // A very simple example of calling an API route with authentication.
  const callAPI = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.patch("/edit-name", { name: "Marc" });
      console.log(res);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  // Show a loader when the session is loading. Not needed but recommended if you show user data like email/name
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* 👇 Add all your SEO tags for the page. canonicalSlug required, other tags a prefilled with your default */}
      <TagSEO title="Create QR-code | QRart" canonicalSlug="/dashboard" />

      
        <Nav/>
        
        <main
        className="min-h-screen p-10 pb-24"
        >
        <section className="max-w-xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
          Create QR-code
          </h1>

          <p className="text-lg leading-relaxed text-base-content/80">
            {status === "authenticated"
              ? `Welcome ${session?.user?.id}`
              : "You are not logged in"}
            <br />
            {session?.user?.email
              ? `Your email is ${session?.user?.email}`
              : ""}
          </p>
          <div>
            <button className="btn btn-primary" onClick={() => callAPI()}>
              {isLoading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              Add recipe
            </button>
          </div>

          <div>
            <button
              className="btn btn-ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
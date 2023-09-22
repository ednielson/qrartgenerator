import Link from "next/link";
import TagSEO from "@/components/TagSEO";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data

// 1. Go to https://app.chatgpt.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)

// You are an excellent layer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple terms of service for my site. Add the current date. Do not add or explain your reasoning. Answer:

const TOS = () => {
  return (
    <div className="max-w-xl mx-auto">
      <TagSEO title={`Terms and Conditions | ${config.appName}`} />

      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-bold pb-6">Terms of service for QRart</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Date: September 22, 2023

Acceptance of Terms
By accessing or using the website https://qrart.ai ("Site"), operated by QRart ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service ("Terms").

Services
We provide a platform for generating beautiful QR codes through our AI QR Art generator ("Service").

Use of Service
You agree to use the Service for lawful purposes only and in accordance with these Terms.

Payment
For paid features, you agree to provide accurate payment information for the completion of the transaction.

Termination
We reserve the right to terminate or suspend access to our Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to us, other users of the Service, or third parties, or for any other reason.

Limitation of Liability
Under no circumstances shall we be liable for any direct, indirect, or consequential damages resulting from your use or inability to use the Service.

Changes to Terms
We reserve the right to change these Terms at any time. Changes will be posted on this page and are effective immediately upon posting.

Contact
For any questions concerning these Terms, contact us at: hello@qrart.ai

These Terms of Service are effective as of September 22, 2023. Your continued use of the Site after this date signifies your acceptance of these Terms.`}
        </pre>
      </div>
    </div>
  );
};

export default TOS;

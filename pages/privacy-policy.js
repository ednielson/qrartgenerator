import Link from "next/link";
import TagSEO from "@/components/TagSEO";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data

// 1. Go to https://app.chatgpt.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

const PrivacyPolicy = () => {
  return (
    <div className="max-w-xl mx-auto">
      <TagSEO title={`Privacy Policy | ${config.appName}`} />

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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-bold pb-6">Privacy Policy for QRart.ai</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Introduction
Welcome to the privacy policy of QRart ("we," "us," or "our"). Our website, https://qrart.ai, offers a platform for generating beautiful QR codes through our AI QR Art generator ("Service").

By using our Service, you agree to the collection and use of information in accordance with this privacy policy.

Personal Data Collected
We collect the following types of personal data from you:

Name
Email address
Payment information

Non-Personal Data Collected
We also collect web cookies to improve your user experience.

Purpose of Data Collection
The data we collect is solely used for the purpose of order processing.

Data Sharing
We do not share your personal or non-personal data with any third parties.

Children's Privacy
Our Service does not address anyone under the age of 13. We do not knowingly collect personal data from children under 13 years of age.

Updates to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by sending an email to the email address you have provided us.

Contact Us
For any questions about this Privacy Policy, you can contact us at:

Email: hello@qrart.ai

This Privacy Policy is effective as of September 22, 2023. Your continued use of our Service after this date signifies your acceptance of this Privacy Policy`}
        </pre>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

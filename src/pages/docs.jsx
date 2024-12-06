import React, { useState } from "react";

const LegalDocuments = () => {
  const [selectedTab, setSelectedTab] = useState("privacy");

  // Expanded Privacy Policy Content
  const privacyPolicy = (
    <div>
      <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect, use, and protect your
        personal data when you interact with our platform.
      </p>

      <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
      <ul className="list-disc list-inside mb-4">
        <li>
          **Personal Information:** Includes name, email address, phone number, and billing
          information.
        </li>
        <li>
          **Usage Data:** Includes IP address, browser type, pages visited, and interaction data.
        </li>
        <li>**Cookies and Tracking:** We use cookies to enhance user experience and analytics.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
      <ul className="list-disc list-inside mb-4">
        <li>To provide, maintain, and improve our services.</li>
        <li>To send updates, promotional content, and notifications.</li>
        <li>To ensure platform security and prevent fraud.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">3. Sharing of Information</h3>
      <p className="mb-4">
        We do not sell or rent your personal data. However, we may share it with:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Service providers for analytics, payment processing, and hosting.</li>
        <li>Legal authorities if required by law or to prevent harm.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">4. Data Retention</h3>
      <p className="mb-4">
        We retain your information as long as necessary to fulfill the purposes outlined in this
        policy, or as required by law.
      </p>

      <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Access, update, or delete your personal data.</li>
        <li>Withdraw consent for data collection where applicable.</li>
        <li>Contact us for any privacy-related concerns.</li>
      </ul>
    </div>
  );

  // Expanded Terms of Service Content
  const termsOfService = (
    <div>
      <h2 className="text-xl font-bold mb-4">Terms of Service</h2>
      <p className="mb-4">
        These terms govern your use of our platform. By accessing our services, you agree to these
        terms.
      </p>

      <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
      <p className="mb-4">
        By using our platform, you acknowledge and agree to comply with these Terms of Service. If
        you disagree, do not use our services.
      </p>

      <h3 className="text-lg font-semibold mb-2">2. User Responsibilities</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Provide accurate and up-to-date information during registration.</li>
        <li>
          Use the platform only for lawful purposes and avoid prohibited activities such as hacking,
          spamming, or fraud.
        </li>
        <li>Keep your account credentials confidential and report any unauthorized access.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">3. Prohibited Activities</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Uploading malicious code, viruses, or harmful software.</li>
        <li>Infringing on intellectual property rights of others.</li>
        <li>Using the platform for illegal activities or unauthorized commercial purposes.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">4. Intellectual Property</h3>
      <p className="mb-4">
        All content, logos, and trademarks on the platform are owned by the company. You may not
        copy, modify, or distribute them without prior written consent.
      </p>

      <h3 className="text-lg font-semibold mb-2">5. Limitation of Liability</h3>
      <p className="mb-4">
        We are not liable for any damages resulting from your use of the platform, including loss of
        data, revenue, or unauthorized access to your account.
      </p>

      <h3 className="text-lg font-semibold mb-2">6. Termination</h3>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account at any time if you violate these
        terms.
      </p>

      <h3 className="text-lg font-semibold mb-2">7. Governing Law</h3>
      <p className="mb-4">
        These terms are governed by and construed in accordance with the laws of your jurisdiction.
      </p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Legal Documents</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <button
          onClick={() => setSelectedTab("privacy")}
          className={`mr-4 px-4 py-2 rounded ${
            selectedTab === "privacy" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setSelectedTab("terms")}
          className={`px-4 py-2 rounded ${
            selectedTab === "terms" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Terms of Service
        </button>
      </div>

      {/* Content Display */}
      <div className="bg-white p-6 rounded shadow">
        {selectedTab === "privacy" ? privacyPolicy : termsOfService}
      </div>
    </div>
  );
};

export default LegalDocuments;

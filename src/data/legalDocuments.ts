export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

export interface LegalDocument {
  id: 'privacy' | 'terms';
  title: string;
  subtitle: string;
  lastUpdated: string;
  version: string;
  summary: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  id: 'privacy',
  title: 'Privacy Policy',
  subtitle: 'Sacred Steps to Redemption · Digital Sanctuary & Recovery Companion',
  lastUpdated: 'September 26, 2026',
  version: '1.0 (2026 Edition)',
  summary:
    'Your trust, privacy, and spiritual vulnerability are sacred to us. Sacred Steps to Redemption is designed as a private sanctuary. We do not sell, monetize, or exploit your personal recovery journey, spiritual confessions, or emotional triggers.',
  sections: [
    {
      id: 'privacy-commitment',
      title: '1. Our Sacred Commitment to Confidentiality',
      content: [
        'At Sacred Steps to Redemption ("we", "us", or "our"), authored by C. Lamont Patrick and published by Kya Daisy Publishing, we recognize that recovery from addiction, trauma, guilt, and emotional brokenness requires an atmosphere of deep safety and uncompromised privacy.',
        'This Privacy Policy outlines how our application interacts with your device and information. Our foundational principle is data minimization: we collect only what is strictly necessary to deliver a spiritually grounded, personal recovery rhythm.',
      ],
    },
    {
      id: 'privacy-no-sale',
      title: '2. Information We Do NOT Collect or Sell',
      content: [
        'No Sale of Personal Data: We never sell, rent, broker, or trade your personal information, recovery milestones, or spiritual reflections to data brokers, advertisers, employers, or third parties.',
        'No Ad Tracking: We do not deploy third-party advertising tracking networks, retargeting pixels, or behavioral profiling cookies.',
        'Spiritual Thoughts & Confessions: The struggles, fears, and urges you select or type within the Trigger Mapper or Rescue Recommender are processed in-session to generate spiritual anchors and are not archived into an external commercial profile.',
      ],
    },
    {
      id: 'privacy-local-storage',
      title: '3. Local Device Storage (Client-Side Persistence)',
      content: [
        'To support your daily walk without requiring invasive account creation, your progress—such as your anchored "Spiritual Foundation Stones" and audio chime preferences—is stored locally in your browser (via HTML5 localStorage).',
        'You maintain absolute control over this data. You can reset or wipe your anchored foundation stones at any time using the "Start Over" button directly in the application interface, or by clearing your browser cache and cookies.',
      ],
    },
    {
      id: 'privacy-crisis',
      title: '4. Crisis & Safety Interception Protocol',
      content: [
        'Our application integrates an automated Crisis Guardrail protocol designed to detect language indicating immediate risk of self-harm or medical emergency.',
        'When crisis indicators are identified, the application immediately surfaces links to the 988 Suicide & Crisis Lifeline and local emergency resources. We do not record or monitor your calls or texts to 988 or external emergency providers; your communications with these crisis services remain strictly confidential and subject to their respective operating protocols.',
      ],
    },
    {
      id: 'privacy-security',
      title: '5. Technical Security & Infrastructure',
      content: [
        'All client interactions with our web application are transmitted across secure, encrypted Hypertext Transfer Protocol Secure (HTTPS) channels using modern Transport Layer Security (TLS) protocols.',
        'While we implement industry-standard administrative and technical safeguards to protect application integrity, no internet transmission is entirely impenetrable. We encourage you to access this application from private, trusted personal devices.',
      ],
    },
    {
      id: 'privacy-children',
      title: '6. Children’s Privacy (COPPA Compliance)',
      content: [
        'Sacred Steps to Redemption is intended for adult individuals and adolescents seeking faith-based addiction recovery. We do not knowingly collect personal identifiable information from children under the age of 13.',
        'If you become aware that a child under 13 has submitted personal information without verifiable parental consent, please contact us immediately so we can remove the data.',
      ],
    },
    {
      id: 'privacy-rights',
      title: '7. Your Privacy Rights & Access',
      content: [
        'Depending on your jurisdiction (including California CCPA/CPRA, Virginia VCDPA, and European GDPR guidelines), you possess rights regarding your data:',
        '• Right to Know & Access: Understand what minimal data is retained.',
        '• Right to Erasure / Deletion: Reset and remove all locally stored progress.',
        '• Right to Non-Discrimination: Equal service and access regardless of privacy choices.',
      ],
    },
    {
      id: 'privacy-contact',
      title: '8. Contact Information',
      content: [
        'If you have questions, feedback, or concerns regarding this Privacy Policy or our spiritual companion tools, please contact our ministry publishing office:',
        'Email: scaredstepstoredemption@gmail.com',
        'Publisher: Kya Daisy Publishing (Attn: Sacred Steps Recovery Team)',
        'Subject: Privacy Policy Inquiry',
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  id: 'terms',
  title: 'Terms and Conditions',
  subtitle: 'Sacred Steps to Redemption · Visual Identity & Ministry System',
  lastUpdated: 'September 26, 2026',
  version: '1.0 (2026 Edition)',
  summary:
    'Please review these Terms carefully before using Sacred Steps to Redemption. By accessing this platform, you acknowledge that Sacred Steps is a spiritual and devotional recovery companion, not a licensed medical, psychological, or clinical crisis service.',
  sections: [
    {
      id: 'terms-acceptance',
      title: '1. Acceptance of Terms',
      content: [
        'These Terms and Conditions ("Terms") constitute a legally binding agreement between you and Sacred Steps to Redemption, authored by C. Lamont Patrick and published by Kya Daisy Publishing ("we", "us", or "our").',
        'By accessing, browsing, or utilizing the Sacred Steps web application, the Universal Trigger Mapper, or the Rescue Recommender, you agree to be bound by these Terms. If you do not agree to all terms, you must refrain from using the application.',
      ],
    },
    {
      id: 'terms-medical-disclaimer',
      title: '2. Critical Spiritual Companion & Non-Medical Disclaimer',
      content: [
        'NO MEDICAL OR CLINICAL ADVICE: The Sacred Steps to Redemption app, The Guide, and the Sacred S.T.E.P. Method™ are provided strictly for spiritual, devotional, educational, and emotional encouragement. We are not licensed physicians, psychiatrists, clinical psychologists, social workers, or addiction medical professionals.',
        'NOT A SUBSTITUTE FOR PROFESSIONAL CARE: Content provided within this application does not constitute professional medical advice, clinical diagnosis, psychotherapy, psychiatric treatment, or drug rehabilitation medical supervision. You should never disregard, avoid, or delay seeking advice from a licensed healthcare provider because of something you read or experienced in this application.',
        'NO DOCTOR-PATIENT RELATIONSHIP: Your use of this application, including interaction with The Guide or scripture recommendations, does not create a doctor-patient, therapist-client, or clinical healthcare relationship.',
      ],
    },
    {
      id: 'terms-crisis-protocol',
      title: '3. Emergency & Crisis Protocol',
      content: [
        'IF YOU ARE EXPERIENCING A MEDICAL EMERGENCY, SUICIDAL THOUGHTS, INTENT TO SELF-HARM, OR VIOLENCE TOWARD OTHERS, DO NOT RELY ON THIS APPLICATION. IMMEDIATELY TAKE ACTION:',
        '• Call or text 988 to connect with the Suicide & Crisis Lifeline (Available 24/7, free, and confidential in the United States and Canada).',
        '• Call 911 or your local emergency response authority.',
        '• Go immediately to the nearest hospital emergency room.',
        'The Sacred Steps team and The Guide are spiritual companions available to pray and walk with you when you are in a safe, stabilized environment.',
      ],
    },
    {
      id: 'terms-intellectual-property',
      title: '4. Intellectual Property & Trademarks',
      content: [
        'All intellectual property rights associated with this application—including the name "Sacred Steps to Redemption", the 12-Month / 52-Week Recovery Framework, "The Sacred S.T.E.P. Method™", 365 Biblical Affirmations, brand graphics, shield emblem, audio compositions, and written commentaries—are the proprietary property of C. Lamont Patrick and Kya Daisy Publishing (Copyright © 2025–2026).',
        'You are granted a limited, personal, non-exclusive, non-transferable, and revocable license to access the application for your own individual, non-commercial spiritual recovery journey.',
        'You may not copy, reproduce, scrape, mirror, reverse engineer, sell, redistribute, or commercially exploit any part of this system without explicit prior written authorization from Kya Daisy Publishing.',
      ],
    },
    {
      id: 'terms-user-conduct',
      title: '5. Acceptable User Conduct',
      content: [
        'In using Sacred Steps to Redemption, you agree not to:',
        '• Use the service for any unlawful, harassing, defamatory, or abusive purpose.',
        '• Attempt to disrupt, overload, reverse engineer, or compromise the technical infrastructure of the app.',
        '• Submit automated bot queries or scrape devotional content.',
        '• Misrepresent your identity or impersonate ministry personnel.',
      ],
    },
    {
      id: 'terms-disclaimer-warranties',
      title: '6. Disclaimer of Warranties ("As Is")',
      content: [
        'The application and all spiritual recovery materials are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied.',
        'We do not warrant that the application will be uninterrupted, error-free, completely secure, or free from server latencies, nor do we make guarantees regarding specific emotional or recovery outcomes, as personal recovery is a multifaceted journey involving medical, community, and personal commitment.',
      ],
    },
    {
      id: 'terms-limitation-liability',
      title: '7. Limitation of Liability',
      content: [
        'To the maximum extent permitted by applicable law, neither C. Lamont Patrick, Kya Daisy Publishing, their affiliates, nor technical contributors shall be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your access to, use of, or inability to use this spiritual companion application.',
        'You expressly agree that your participation in the Sacred S.T.E.P. Method™ is voluntary, and that you assume personal responsibility for your health, recovery decisions, and wellness practices.',
      ],
    },
    {
      id: 'terms-governing-law',
      title: '8. Governing Law & Dispute Resolution',
      content: [
        'These Terms and any disputes arising out of or related to your use of Sacred Steps to Redemption shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.',
        'Both parties agree to pursue informal, good-faith resolution prior to initiating any formal legal or arbitration proceeding.',
      ],
    },
    {
      id: 'terms-modifications',
      title: '9. Changes & Modifications to Terms',
      content: [
        'We reserve the right to modify, amend, or update these Terms at our discretion to reflect ministry development, technical updates, or legal compliance. The updated version will be reflected with a revised "Last Updated" date.',
        'Continued use of the application following any revisions constitutes your acceptance of the updated Terms.',
      ],
    },
    {
      id: 'terms-contact',
      title: '10. Ministry & Publishing Contact',
      content: [
        'For copyright permissions, legal notices, or feedback regarding these Terms and Conditions, please reach out to:',
        'Email: scaredstepstoredemption@gmail.com',
        'Publisher: Kya Daisy Publishing',
        'Author: C. Lamont Patrick',
      ],
    },
  ],
};

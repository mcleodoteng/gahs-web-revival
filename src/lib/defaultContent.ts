// Default CMS content for restore functionality
import { Json } from "@/integrations/supabase/types";

export interface DefaultSection {
  section_key: string;
  content: Json;
  sort_order: number;
}

export const defaultPageContent: Record<string, DefaultSection[]> = {
  home: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        slides: [
          {
            title: "Compassionate Healthcare",
            highlight: "Rooted in Faith",
            description: "Providing quality healthcare services through a network of Seventh-day Adventist health institutions across Ghana.",
            image: "",
          },
          {
            title: "Building Healthier",
            highlight: "Communities",
            description: "Partnering with communities to promote wellness, prevent disease, and provide accessible medical care.",
            image: "",
          },
          {
            title: "Excellence in",
            highlight: "Medical Training",
            description: "Training the next generation of healthcare professionals to serve with skill and compassion.",
            image: "",
          },
        ],
        stats: [
          { icon: "Building2", value: "43+", label: "Health Institutions" },
          { icon: "Users", value: "1000+", label: "Healthcare Staff" },
          { icon: "Heart", value: "50+", label: "Years of Service" },
          { icon: "Star", value: "3", label: "Union Conferences" },
        ],
      },
    },
    {
      section_key: "director_message",
      sort_order: 1,
      content: {
        name: "Dr. James Antwi",
        title: "Director, Ghana Adventist Health Services",
        shortMessage: "At GAHS, we believe that true healthcare goes beyond treating illnesses—it encompasses the whole person: body, mind, and spirit. Our mission is rooted in the healing ministry of Christ, and we are committed to providing compassionate, quality care to all who seek our services.",
        tagline: "Healing is our calling, service is our mission.",
      },
    },
    {
      section_key: "services_preview",
      sort_order: 2,
      content: {
        title: "Our Services",
        subtitle: "Comprehensive healthcare solutions for communities across Ghana",
      },
    },
    {
      section_key: "why_choose",
      sort_order: 3,
      content: {
        badge: "Why Choose GAHS",
        title: "Excellence in Faith-Based Healthcare",
        subtitle: "Discover what sets Ghana Adventist Health Services apart in delivering quality healthcare.",
        items: [
          {
            icon: "Heart",
            title: "Compassionate Care",
            description: "Our healthcare professionals treat every patient with dignity, respect, and genuine concern for their wellbeing.",
          },
          {
            icon: "Shield",
            title: "Quality Standards",
            description: "We maintain high standards of medical care through continuous training and modern equipment.",
          },
          {
            icon: "Users",
            title: "Community Focus",
            description: "We actively engage with communities through outreach programs, health education, and preventive care initiatives.",
          },
          {
            icon: "BookOpen",
            title: "Holistic Approach",
            description: "We believe in treating the whole person—body, mind, and spirit—for complete healing and wellness.",
          },
        ],
      },
    },
    {
      section_key: "gallery_preview",
      sort_order: 4,
      content: {
        images: [
          { src: "", title: "Community Health Outreach", category: "Outreach", description: "Providing free health screenings to rural communities." },
          { src: "", title: "Hospital Facilities", category: "Facilities", description: "Modern medical equipment and comfortable patient rooms." },
          { src: "", title: "Training Programs", category: "Education", description: "Equipping the next generation of healthcare professionals." },
        ],
      },
    },
    {
      section_key: "testimonials",
      sort_order: 5,
      content: {
        testimonials: [
          {
            name: "Kwame Asante",
            role: "Patient",
            location: "Kumasi",
            content: "The care I received at the SDA Hospital was exceptional. The staff were professional yet compassionate, and I felt truly cared for throughout my treatment.",
            rating: 5,
            image: "",
          },
          {
            name: "Ama Owusu",
            role: "Community Member",
            location: "Sunyani",
            content: "The health outreach programs have made a real difference in our community. Free screenings and health education have helped many families.",
            rating: 5,
            image: "",
          },
        ],
      },
    },
  ],
  about: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "About Ghana Adventist Health Services",
        subtitle: "For over five decades, we have been at the forefront of faith-based healthcare delivery in Ghana, touching lives and transforming communities.",
        badge: "Our Story",
      },
    },
    {
      section_key: "history",
      sort_order: 1,
      content: {
        title: "Our History",
        content: "Ghana Adventist Health Services (GAHS) traces its roots back to the early missionary work of the Seventh-day Adventist Church in Ghana. What began as small clinics and dispensaries has grown into a comprehensive network of hospitals, clinics, and training institutions serving communities across the nation.\n\nOver the decades, GAHS has expanded its reach and capabilities, always maintaining its commitment to holistic healthcare that addresses the physical, mental, and spiritual needs of patients.",
      },
    },
    {
      section_key: "mission",
      sort_order: 2,
      content: {
        title: "Our Mission",
        content: "To provide Christ-centered, quality healthcare services that promote physical, mental, and spiritual wellness while demonstrating God's love through compassionate care.",
      },
    },
    {
      section_key: "vision",
      sort_order: 3,
      content: {
        title: "Our Vision",
        content: "To be the leading faith-based healthcare organization in Ghana, recognized for excellence in patient care, innovation in health services, and commitment to community wellness.",
      },
    },
    {
      section_key: "quote",
      sort_order: 4,
      content: {
        text: "The work of the physician is not merely to heal the sick, but to prevent sickness, and to lead patients to a better way of living.",
        author: "Ellen G. White",
      },
    },
    {
      section_key: "why_choose",
      sort_order: 5,
      content: {
        title: "Our Core Values",
        items: [
          { icon: "Heart", title: "Compassion", description: "We treat every patient with kindness, empathy, and genuine care." },
          { icon: "Shield", title: "Integrity", description: "We uphold the highest ethical standards in all our operations." },
          { icon: "Target", title: "Excellence", description: "We strive for the highest quality in healthcare delivery." },
          { icon: "Users", title: "Service", description: "We are committed to serving our communities selflessly." },
        ],
      },
    },
  ],
  leadership: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Leadership Team",
        subtitle: "Meet the dedicated professionals guiding Ghana Adventist Health Services towards excellence in healthcare delivery.",
      },
    },
    {
      section_key: "director",
      sort_order: 1,
      content: {
        name: "Dr. James Antwi",
        title: "Director, Ghana Adventist Health Services",
        image: "",
        message: "It is my privilege to lead Ghana Adventist Health Services as we continue our mission of providing compassionate, Christ-centered healthcare to the people of Ghana. Our team of dedicated healthcare professionals works tirelessly to ensure that every patient receives quality care that addresses their physical, mental, and spiritual needs.\n\nWe remain committed to expanding our reach, improving our facilities, and training the next generation of healthcare workers who will carry forward our legacy of service.",
      },
    },
    {
      section_key: "team_members",
      sort_order: 2,
      content: {
        members: [
          { name: "Hannah Asante", title: "Assistant Director", department: "Administration", image: "" },
          { name: "Edmond Adjei Boadu", title: "Health Director", department: "MGUC", image: "" },
          { name: "Janet Boateng", title: "Health Director", department: "SGUC", image: "" },
          { name: "Janet Owusuaa", title: "Health Director", department: "MCGUM", image: "" },
        ],
      },
    },
    {
      section_key: "quote",
      sort_order: 3,
      content: {
        text: "True healing comes when we treat the whole person—body, mind, and spirit—with compassion and excellence.",
        author: "GAHS Leadership",
      },
    },
  ],
  services: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Our Services",
        subtitle: "Comprehensive healthcare solutions designed to meet the diverse needs of communities across Ghana.",
        badge: "What We Offer",
      },
    },
    {
      section_key: "services_list",
      sort_order: 1,
      content: {
        services: [
          { icon: "Target", title: "Coordination of Health Ministries", description: "Overseeing and coordinating healthcare activities across all SDA health institutions in Ghana." },
          { icon: "Shield", title: "Supervision and Monitoring", description: "Ensuring quality standards and compliance across all our healthcare facilities." },
          { icon: "GraduationCap", title: "Health Professional Training", description: "Operating training colleges for nurses, midwives, and other healthcare professionals." },
          { icon: "Building2", title: "Institutional Development", description: "Establishing and developing new healthcare facilities to expand our reach." },
          { icon: "Users", title: "Community Health Programs", description: "Organizing health outreach programs, screenings, and health education initiatives." },
          { icon: "Heart", title: "Patient Care Services", description: "Providing comprehensive medical care through our network of hospitals and clinics." },
        ],
      },
    },
    {
      section_key: "cta",
      sort_order: 2,
      content: {
        title: "Partner With Us",
        description: "Join us in our mission to provide quality, faith-based healthcare to communities across Ghana.",
        buttonText: "Get in Touch",
        buttonLink: "/contact",
      },
    },
  ],
  gallery: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Photo Gallery",
        subtitle: "Explore moments captured from our healthcare facilities, community outreach programs, and special events.",
        badge: "Our Gallery",
      },
    },
    {
      section_key: "gallery_images",
      sort_order: 1,
      content: {
        images: [
          { src: "", title: "Community Health Outreach", category: "Outreach", description: "Free health screenings for rural communities." },
          { src: "", title: "Hospital Facilities", category: "Facilities", description: "Modern medical equipment and patient rooms." },
          { src: "", title: "Training Programs", category: "Education", description: "Healthcare professional training sessions." },
          { src: "", title: "Staff Meeting", category: "Events", description: "Annual GAHS staff conference and planning." },
        ],
      },
    },
  ],
  testimonials: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "What People Say",
        subtitle: "Hear from patients, partners, and community members about their experiences with Ghana Adventist Health Services.",
        badge: "Testimonials",
      },
    },
    {
      section_key: "testimonials_list",
      sort_order: 1,
      content: {
        testimonials: [
          { name: "Kwame Asante", role: "Patient", location: "Kumasi", content: "The care I received was exceptional. The staff were professional yet compassionate.", rating: 5, image: "" },
          { name: "Ama Owusu", role: "Community Member", location: "Sunyani", content: "The health outreach programs have made a real difference in our community.", rating: 5, image: "" },
          { name: "Dr. Emmanuel Mensah", role: "Partner Organization", location: "Accra", content: "Working with GAHS has been a rewarding experience. Their commitment to quality healthcare is evident.", rating: 5, image: "" },
        ],
      },
    },
  ],
  blog: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Latest Updates",
        subtitle: "Stay informed about our activities, health tips, and news from Ghana Adventist Health Services.",
        badge: "Blog & News",
      },
    },
    {
      section_key: "posts",
      sort_order: 1,
      content: {
        posts: [
          {
            title: "GAHS Annual Health Conference 2024",
            excerpt: "Highlights from our annual health conference bringing together healthcare professionals from across Ghana.",
            content: "The Ghana Adventist Health Services held its annual health conference, bringing together over 200 healthcare professionals from across the country...",
            category: "Events",
            author: "GAHS Communications",
            date: "January 2024",
            readTime: "5 min",
            image: "",
          },
          {
            title: "Community Health Outreach Success",
            excerpt: "Our recent community health outreach program served over 500 individuals with free health screenings.",
            content: "The GAHS community health team conducted a successful outreach program in the Ashanti Region, providing free health screenings...",
            category: "Outreach",
            author: "Health Team",
            date: "December 2023",
            readTime: "3 min",
            image: "",
          },
        ],
      },
    },
  ],
  contact: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Contact Us",
        subtitle: "Get in touch with Ghana Adventist Health Services. We're here to help and answer any questions you may have.",
        badge: "Get In Touch",
      },
    },
    {
      section_key: "contact_info",
      sort_order: 1,
      content: {
        address: "GAHS Secretariat\nP.O. Box 5\nKumasi, Ghana",
        phone: "+233 XX XXX XXXX",
        email: "info@gahs.org.gh",
        office_hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      },
    },
  ],
  institutions: [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Our Institutions",
        subtitle: "Explore our comprehensive network of healthcare facilities and training institutions across Ghana.",
        badge: "Institutions Directory",
      },
    },
    {
      section_key: "hospitals",
      sort_order: 1,
      content: {
        institutions: [
          { name: "S.D.A. Hospital, Kwadaso", location: "Kwadaso", region: "Ashanti", union: "MGUC", type: "Hospital", status: "ACTIVE", phone: "+233 XX XXX XXXX", email: "info@sdahospital-kwadaso.org", services: "General Medicine, Surgery, Maternity, Emergency Care" },
          { name: "Adventist Hospital, Sunyani", location: "Sunyani", region: "Bono", union: "MGUC", type: "Hospital", status: "ACTIVE", phone: "+233 XX XXX XXXX", email: "info@adventisthospital-sunyani.org", services: "General Medicine, Pediatrics, Maternity" },
        ],
      },
    },
    {
      section_key: "clinics",
      sort_order: 2,
      content: {
        institutions: [
          { name: "SDA Clinic, Obuasi", location: "Obuasi", region: "Ashanti", union: "MGUC", type: "Clinic", status: "ACTIVE", phone: "+233 XX XXX XXXX", services: "Primary Care, Immunization, Maternal Health" },
        ],
      },
    },
    {
      section_key: "training",
      sort_order: 3,
      content: {
        institutions: [
          { name: "S.D.A. Nursing and Midwifery Training College, Asamang", location: "Asamang", region: "Ashanti", union: "MGUC", type: "Training", status: "ACTIVE", phone: "+233 XX XXX XXXX", services: "Nursing Training, Midwifery Training" },
        ],
      },
    },
  ],
  "forms-publications": [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Forms & Publications",
        subtitle: "Access important documents, application forms, reports, and publications from Ghana Adventist Health Services.",
        badge: "Resources",
      },
    },
    {
      section_key: "resources_list",
      sort_order: 1,
      content: {
        resources: [
          { title: "GAHS Annual Report 2024", description: "Comprehensive overview of GAHS activities, achievements, and financial reports.", category: "Annual Reports", date: "January 2024", fileSize: "2.5 MB", fileUrl: "" },
          { title: "Nursing College Application Form", description: "Application form for admission into SDA Nursing Training Colleges.", category: "Application Forms", date: "2024", fileSize: "500 KB", fileUrl: "" },
          { title: "Clinical Practice Guidelines", description: "Standard operating procedures for clinical practice in GAHS facilities.", category: "Guidelines", date: "2024", fileSize: "1.2 MB", fileUrl: "" },
        ],
      },
    },
  ],
  "form-submission": [
    {
      section_key: "hero",
      sort_order: 0,
      content: {
        title: "Form Submission",
        subtitle: "Submit your completed application forms and supporting documents securely through our online portal.",
        badge: "Submit Forms",
      },
    },
    {
      section_key: "submission_form",
      sort_order: 1,
      content: {
        formTitle: "Submit Your Application",
        formDescription: "Complete the form below to submit your application. Please ensure all required documents are attached.",
        unavailableMessage: "Form submission is currently unavailable. Please try again later or contact us directly.",
      },
    },
  ],
  privacy: [
    {
      section_key: "content",
      sort_order: 0,
      content: {
        last_updated: "January 2024",
        sections: [
          { title: "Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, make an inquiry, or contact us for support." },
          { title: "How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, and to communicate with you." },
          { title: "Information Sharing", content: "We do not share your personal information with third parties except as described in this policy." },
          { title: "Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at info@gahs.org.gh." },
        ],
      },
    },
  ],
  terms: [
    {
      section_key: "content",
      sort_order: 0,
      content: {
        last_updated: "January 2024",
        sections: [
          { title: "Acceptance of Terms", content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement." },
          { title: "Use License", content: "Permission is granted to temporarily view the materials on GAHS website for personal, non-commercial transitory viewing only." },
          { title: "Disclaimer", content: "The materials on GAHS website are provided on an 'as is' basis. GAHS makes no warranties, expressed or implied." },
          { title: "Contact Information", content: "For any questions regarding these terms, please contact us at info@gahs.org.gh." },
        ],
      },
    },
  ],
};

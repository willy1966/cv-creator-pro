import { ResumeData } from "./types";

export const SAMPLE_RESUME: ResumeData = {
  personal: {
    firstName: "Sara",
    lastName: "Al Mahmood",
    title: "Senior Graphic Designer",
    email: "sara.mahmood@email.com",
    phone: "+973 3300 1122",
    location: "Manama, Bahrain",
    linkedin: "linkedin.com/in/saramahmood",
    website: "saramahmood.design",
    photo: "",
  },
  summary:
    "Brand-focused graphic designer with 7+ years crafting identities, packaging, and digital campaigns for GCC clients. Led rebrands that lifted engagement by up to 60%, and comfortable owning projects from first sketch to print-ready delivery.",
  skills: [
    "Brand Identity", "Adobe Illustrator", "Photoshop", "Figma",
    "Print Production", "Typography", "Social Media Design", "Motion Graphics",
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "French", level: "Basic" },
  ],
  experience: [
    {
      company: "Pixel & Co. Agency",
      role: "Senior Graphic Designer",
      location: "Manama, Bahrain",
      start: "Mar 2021",
      end: "",
      current: true,
      bullets:
        "Lead designer on 12+ brand identity projects for retail and F&B clients\nBuilt a template system that cut social media production time by 40%\nMentor two junior designers and run weekly design critiques",
    },
    {
      company: "Gulf Media House",
      role: "Graphic Designer",
      location: "Riffa, Bahrain",
      start: "Jun 2018",
      end: "Feb 2021",
      current: false,
      bullets:
        "Designed print and outdoor campaigns for events across the GCC\nManaged prepress and supplier coordination for large-format printing\nIntroduced a brand asset library adopted company-wide",
    },
  ],
  education: [
    {
      school: "University of Bahrain",
      degree: "Bachelor of Arts",
      field: "Graphic Design",
      start: "2014",
      end: "2018",
      gpa: "3.7",
    },
  ],
  certifications: [
    { name: "Adobe Certified Professional — Illustrator", year: "2022" },
    { name: "Google UX Design Certificate", year: "2023" },
  ],
  projects: [
    {
      name: "Manama Coffee Roasters Rebrand",
      description: "Full identity refresh — logo, packaging, and social kit; sales up 25% post-launch.",
      link: "behance.net/saramahmood",
    },
    {
      name: "GCC Food Week Campaign",
      description: "Cross-platform campaign visuals seen by 2M+ people across four countries.",
      link: "",
    },
  ],
  awards: [
    { name: "Best Brand Identity — Gulf Design Awards", issuer: "Gulf Design Council", year: "2023" },
  ],
  memberships: [
    { organization: "Bahrain Society of Graphic Designers", role: "Member", year: "2020" },
  ],
  references: [
    {
      name: "Ahmed Al Khalifa",
      position: "Creative Director",
      company: "Pixel & Co. Agency",
      email: "ahmed@pixelco.example",
      phone: "+973 3311 2244",
      relationship: "Current manager",
      address: "",
    },
    {
      name: "Leila Haddad",
      position: "Head of Marketing",
      company: "Gulf Media House",
      email: "leila@gulfmedia.example",
      phone: "+973 3355 6677",
      relationship: "Former manager",
      address: "Riffa, Bahrain",
    },
  ],
  interests: ["Landscape photography", "Calligraphy", "Padel"],
  volunteer: [],
  publications: [],
  custom: [],
};

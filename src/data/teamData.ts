export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Icon name or component
  color?: string; // Brand color
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  team: string;
  email: string;
  gender: string;
  batch: string;
  bio?: string;
  socialLinks?: SocialLink[];
  customLinks?: {
    title: string;
    url: string;
    description?: string;
  }[];
}

// Team members data with link tree structure
export const teamMembers: TeamMember[] = [
  {
    id: "chethas-l-pramod",
    name: "Chethas L Pramod",
    role: "Campus Lead",
    image: "mulearn-ucek assets/team/Chethas.png",
    team: "μ",
    email: "lchethas@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "aswath-s-a",
    name: "Aswath S A",
    role: "Campus Co-Lead & Community Lead",
    image: "mulearn-ucek assets/team/Ashwath.jpg",
    team: "μ",
    email: "aswathsa24@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "arjun-tk",
    name: "Arjun TK",
    role: "IG Manager",
    image: "mulearn-ucek assets/team/Arjun TK.jpg",
    team: "Interest Group",
    email: "arjuntk732@gmail.com",
    gender: "Male",
    batch: "2nd Year - IT"
  },
  {
    id: "richard-s",
    name: "Richard S",
    role: "Lead",
    image: "mulearn-ucek assets/team/Richard.jpg",
    team: "Technical",
    email: "richardshaju65@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 2"
  },
  {
    id: "bhagyasree",
    name: "Bhagyasree",
    role: "Lead",
    image: "mulearn-ucek assets/team/Bhagyashree.jpg",
    team: "Creative",
    email: "bhagyasree489@gmail.com",
    gender: "Female",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "sooryakanth-s",
    name: "Sooryakanth S",
    role: "Lead",
    image: "mulearn-ucek assets/team/Sooryakanth.jpg",
    team: "Marketing",
    email: "sooryakwest@gmail.com",
    gender: "Male",
    batch: "1st Year - CSE2"
  },
  {
    id: "aadil-mohamed-a",
    name: "Aadil Mohamed A",
    role: "Lead",
    image: "mulearn-ucek assets/team/Aadil.jpg",
    team: "Operations",
    email: "aadilxw@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "mihirima-a-r",
    name: "Mihirima A R",
    role: "Lead",
    image: "mulearn-ucek assets/team/Mihirima.jpg",
    team: "Content",
    email: "mihirima786@gmail.com",
    gender: "Female",
    batch: "2nd Year - CSE 2"
  },
  {
    id: "amarnath-sujith",
    name: "Amarnath Sujith",
    role: "Mentor",
    image: "mulearn-ucek assets/team/Amarnath.jpg",
    team: "μ",
    email: "amarsujith9294@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "anza-s",
    name: "Anza S",
    role: "Co-Lead",
    image: "mulearn-ucek assets/team/Anza.jpg",
    team: "Creative",
    email: "www.sanza006@gmail.com",
    gender: "Female",
    batch: "1st Year - IT"
  },
  {
    id: "akshay-g",
    name: "Akshay G",
    role: "Co-Lead",
    image: "mulearn-ucek assets/team/Akshay.jpg",
    team: "Creative",
    email: "akshaygopu2006@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "aneez-rahuman-m",
    name: "Aneez Rahuman M",
    role: "Co-Lead",
    image: "mulearn-ucek assets/team/Aneez.jpg",
    team: "Creative",
    email: "aneezrahumanar710@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1"
  },
  {
    id: "sreerag-satheesh-s",
    name: "Sreerag Satheesh S",
    role: "Co-Lead",
    image: "mulearn-ucek assets/team/Sreerag.jpg",
    team: "Creative",
    email: "sreeragsatheeshs1@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 2"
  },
  {
    id: "anjana-ms",
    name: "Anjana MS",
    role: "Co-Lead",
    image: "mulearn-ucek assets/team/Anjana.jpg",
    team: "Creative",
    email: "manjuladevi1161@gmail.com",
    gender: "Female",
    batch: "1st Year - IT"
  }
];
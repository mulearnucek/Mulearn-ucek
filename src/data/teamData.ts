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
  phone: string;
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
    batch: "2nd Year - CSE 1",
    phone: "8086257650"
  },
  {
    id: "aswath-s-a",
    name: "Aswath S A",
    role: "Campus Co-Lead & Community Lead",
    image: "mulearn-ucek assets/team/Ashwath.jpg",
    team: "μ",
    email: "aswathsa24@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1",
    phone: "7356690727"
  },
  {
    id: "arjun-tk",
    name: "Arjun TK",
    role: "IG Manager",
    image: "mulearn-ucek assets/team/Arjun TK.jpg",
    team: "Interest Group",
    email: "arjuntk732@gmail.com",
    gender: "Male",
    batch: "2nd Year - IT",
    phone: "8943198705"
  },
  {
    id: "richard-s",
    name: "Richard S",
    role: "Lead",
    image: "mulearn-ucek assets/team/Richard.jpg",
    team: "Technical",
    email: "richardshaju65@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 2",
    phone: "9495687674"
  },
  {
    id: "bhagyasree",
    name: "Bhagyasree",
    role: "Lead",
    image: "mulearn-ucek assets/team/Bhagyashree.jpg",
    team: "Creative",
    email: "bhagyasree489@gmail.com",
    gender: "Female",
    batch: "2nd Year - CSE 1",
    phone: "9526543992"
  },
  {
    id: "sooryakanth-s",
    name: "Sooryakanth S",
    role: "Lead",
    image: "mulearn-ucek assets/team/Sooryakanth.jpg",
    team: "Marketing",
    email: "sooryakwest@gmail.com",
    gender: "Male",
    batch: "1st Year - CSE2",
    phone: "9656694535"
  },
  {
    id: "aadil-mohamed-a",
    name: "Aadil Mohamed A",
    role: "Lead",
    image: "mulearn-ucek assets/team/Aadil.jpg",
    team: "Operations",
    email: "aadilxw@gmail.com",
    gender: "Male",
    batch: "2nd Year - CSE 1",
    phone: "8848881976"
  },
  {
    id: "mihirima-a-r",
    name: "Mihirima A R",
    role: "Lead",
    image: "mulearn-ucek assets/team/Mihirima.jpg",
    team: "Content",
    email: "mihirima786@gmail.com",
    gender: "Female",
    batch: "2nd Year - CSE 2",
    phone: "8136863253"
  }
];
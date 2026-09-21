export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Substack", href: "#substack" },
  { label: "Testimonials", href: "#testimonials" },
];

export const chips = ["Emerging Tech Convergence","Future-Fit Careers and Talent", "Operational Intelligence", "Education Reimagined"];

export const topics = [
  { icon: "⚡", title: "Emerging Tech Convergence", blurb: "A data-driven look at the intersection of emerging technologies and learning ecosystems they demand through 2030 and beyond.", formats: ["Keynotes", "Advisory", "Panelist"] },
  { icon: '⌨️', title: 'Learning Emerging Tech with GenAI', blurb: 'Hands-on workshop that teaches prompting techniques to explore under‑examined areas of emerging tech, expand understanding, and build repeatable learning workflows.', formats: ["Workshops", "Keynotes", "Panelist"] }
];

export const logos = ["/images/CPCC_logo.png", "/images/UNCC_logo.png", "/images/BoostPad_logo.png", "/images/NFT_logo.png", "/images/Truist_logo.png"];

export const formats = [
  { title: "Keynotes", desc: "30–60 min inspirational talks with tangible takeaways." },
  { title: "Workshops", desc: "Hands-on labs tailored to bootcamps or collegiate programs." },
  { title: "Advisory", desc: "Curriculum audits and strategic roadmapping." },
];

export const steps = [
  { icon: "✅", title: "Future-Proof Syllabi", text: "Map learning outcomes to fast-evolving tech and durable human skills." },
  { icon: "🫱🏽‍🫲🏿", title: "Inclusive Pathways", text: "Reduce gatekeeping; widen on-ramps with scaffolded, project-based learning." },
  { icon: "📚", title: "Assessment That Matters", text: "Measure portfolio evidence, verifiable credentials, and real impact." },
];

export const testimonials = [
  { quote: "My favorite part of the event was the interaction portion, where we learned how to use GenAI to learn more about Blockchain, cybersecurity, quantum computing, and those kind of things.", by: "R.O.O.T.S Workshop for Women in Tech Participant" },
  { quote: "What I learned from this event is much more complex than I initially anticipated, but the key topics that I learned from the event will allow me to become better at learning how to secure those assets.", by: "Blockchain Workshop Participant" },
  { quote: "Its been an exciting day today to be able to share with community some of the things we've seen over time, but also hear some new thoughts and new innovations that we think we could apply to the market.", by: "AgTech Hackathon SME Volunteer & Speaker" },
];

export const workContent = [
  { 
    k: "AI + Data", 
    i: "🧠", 
    t: "Ethical, explainable models grounded in diverse datasets.", 
    image: "/images/ai-data.jpg",
    research: {
      overview: "This research focuses on developing ethical AI systems that prioritize explainability and fairness through diverse dataset curation and model transparency.",
      methodology: "Utilizing a combination of supervised learning techniques, bias detection algorithms, and explainable AI frameworks to ensure model accountability.",
      findings: [
        "Reduced model bias by 40% through diverse dataset augmentation",
        "Improved model interpretability scores by 60% using explainable AI techniques",
        "Enhanced trust metrics in user acceptance testing by 35%"
      ],
      impact: "The research has been applied to multiple production systems, improving fairness and transparency in decision-making processes across healthcare, finance, and education sectors.",
      technologies: ["Python", "TensorFlow", "PyTorch", "SHAP", "Fairlearn", "MLflow"],
      links: [
        { label: "Research Paper", url: "#" },
        { label: "GitHub Repository", url: "#" }
      ]
    }
  },
  // { 
  //   k: "Web3 + Trust", 
  //   i: "🧩", 
  //   t: "Portable credentials and transparent funding for learners.", 
  //   image: "/images/web3-trust.jpg",
  //   research: {
  //     overview: "Exploring blockchain-based credentialing systems that enable portable, verifiable educational achievements and transparent funding mechanisms for learners.",
  //     methodology: "Leveraging smart contracts on Ethereum-compatible networks to create decentralized credential verification and transparent funding pools.",
  //     findings: [
  //       "Implemented verifiable credentials reducing verification time by 80%",
  //       "Created transparent funding mechanisms increasing donor trust by 50%",
  //       "Enabled cross-institutional credential portability for 10,000+ learners"
  //     ],
  //     impact: "The system has been adopted by multiple educational institutions, enabling seamless credential transfer and increasing access to educational funding for underserved communities.",
  //     technologies: ["Solidity", "Ethereum", "IPFS", "React", "Web3.js", "Node.js"],
  //     links: [
  //       { label: "Project Documentation", url: "#" },
  //       { label: "Demo Platform", url: "#" }
  //     ]
  //   }
  // }
];

export const servicesIntro = {
  eyebrow: "What I Offer",
  headline: "Two ways to work with me",
  subhead: "Whether you're a business weighing emerging tech, or an individual technologist mapping your next move, start with a conversation.",
};

export const services = [
  {
    id: "business",
    audience: "For businesses",
    title: "Emerging Tech Readiness Assessment",
    description: "A scoped, fixed-price readiness and feasibility assessment across AI, blockchain, quantum computing, and AR/VR, ending in a written report.",
    primary: { label: "Book a free discovery call" },
    secondary: { label: "See how it works", href: "#services-process" },
  },
  {
    id: "individual",
    audience: "For individual technologists",
    title: "Career Direction Session",
    description: "A flat-fee, personal skills-gap assessment and roadmap for individual technologists navigating AI, blockchain, quantum, and AR/VR shifts in their field.",
    price: "$200–$400 flat fee",
    primary: { label: "Book your session" },
    secondary: { label: "What you'll get", href: "#services-deliverables" },
  },
];

// Draft detail copy behind each card's secondary button. Kept to what the offers
// already promise; edit freely.
export const serviceDetails = [
  {
    id: "services-process",
    title: "How the assessment works",
    items: [
      { heading: "Free discovery call", text: "We talk through your goals and constraints and decide what the assessment should cover." },
      { heading: "Scope and fixed price", text: "Scope and a fixed price ($1,500–$4,000) are agreed before any work begins." },
      { heading: "Readiness and feasibility review", text: "Each in-scope area — AI, blockchain, quantum computing, AR/VR — is assessed for readiness and feasibility." },
      { heading: "Written report", text: "The engagement ends with a written report of the findings." },
    ],
  },
  {
    id: "services-deliverables",
    title: "What you'll get",
    items: [
      { heading: "Personal skills-gap assessment", text: "Where your skills stand against the AI, blockchain, quantum, and AR/VR shifts in your field." },
      { heading: "Roadmap", text: "A roadmap for your next move, built from that assessment." },
      { heading: "Flat fee", text: "One flat fee ($200–$400), agreed up front." },
    ],
  },
];

export const events = [
  { title: "NFTCLT x TechTrapCLT: Blockchain for Creatives and Enthusiasts", date: "Feb 17, 2024", location: "Tabbris, South Boulevard, Charlotte, NC", link: "https://www.eventbrite.com/e/nftclt-x-techtrapclt-blockchain-for-creatives-and-enthusiasts-tickets-824449018207?aff=ebdsoporgprofile" },
  { title: "AgTech Hackathon: Smart Indoor Gardening", date: "May 18-19, 2024", location: "Center for Entrepreneurship and Innovation at UNC Charlotte, Charlotte, NC", link: "https://www.eventbrite.com/e/agtech-hackathon-smart-indoor-gardening-tickets-853436961927?aff=ebdsoporgprofile" },
  { title: "GenAI: Artificial Intelligence, Behind the Veil", date: "Aug 1, 2025", location: "Online", link: "https://www.eventbrite.com/e/genai-artificial-intelligence-behind-the-veil-tickets-1494101430599?aff=ebdsoporgprofile" },
  { title: "R.O.O.T.S Workshop for Women in Tech", date: "Nov 22, 2025", location: "CPCC Parr Center for Innovation, Charlotte, NC", link: "https://www.eventbrite.com/e/copy-of-rooted-real-ones-owning-tech-education-and-development-tickets-1835335310319?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl" },
];


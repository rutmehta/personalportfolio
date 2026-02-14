export interface TimelineNode {
  id: string;
  year: number;
  month: number;
  endYear?: number;
  endMonth?: number;
  title: string;
  subtitle: string;
  type: 'company' | 'project' | 'research' | 'award' | 'education' | 'program';
  description: string;
  writeup: string;
  link?: string;
  relatedIds?: string[];
  /** Short "what made it special" summary for detail view */
  special?: string;
  /** Bullet highlights for detail view */
  highlights?: string[];
  /** Slug for internal blog post e.g. /blog/[blogSlug] */
  blogSlug?: string;
}

export const timelineNodes: TimelineNode[] = [
  // 2020
  {
    id: 'google-cloud-hacktcnj',
    year: 2020,
    month: 11,
    title: 'Google Cloud Award',
    subtitle: 'HackTCNJ Winner',
    type: 'award',
    description: 'Winner at HackTCNJ hackathon with Google Cloud.',
    writeup: `Won the Google Cloud Award at HackTCNJ - an early milestone in building and shipping under time pressure.`,
  },
  // 2021
  {
    id: 'rutgers',
    year: 2021,
    month: 9,
    title: 'Joined Rutgers',
    subtitle: 'BS in CS + BAIT',
    type: 'education',
    description: 'Started double major in Computer Science and Business Analytics.',
    writeup: `Started my journey at Rutgers University pursuing a double major in Computer Science and Business Analytics & Information Technology, with a minor in Mathematics.

This combination gave me both the technical depth to build complex systems and the business acumen to understand how technology creates value.

Rutgers became the launchpad for everything that followed - from founding startups to interning at NASA to publishing research.`,
    relatedIds: ['rutgers-oit', 'idea', 'sagetech', 'sdim'],
  },
  {
    id: 'rutgers-oit',
    year: 2021,
    month: 8,
    title: 'Joined Rutgers OIT',
    subtitle: 'Level 2 Consultant',
    type: 'company',
    description: 'Managing computing labs serving 100,000+ users.',
    writeup: `My first "real" job at Rutgers - managing multiple computing labs and mentoring junior consultants.

This role taught me the importance of systems thinking and user empathy. When 100,000+ people depend on your systems, you learn quickly what reliability means.

It's not glamorous work, but it built a foundation of understanding how technology serves people at scale.`,
    relatedIds: ['rutgers'],
  },
  {
    id: 'idea',
    year: 2021,
    month: 10,
    title: 'Started IDEA Program',
    subtitle: 'Innovation Academy',
    type: 'program',
    description: 'Innovation, Design, and Entrepreneurship Academy at Rutgers.',
    writeup: `Selected as a member of Rutgers' I.D.E.A. program - a multidisciplinary initiative that empowers students to solve real-world challenges through innovation, design thinking, and entrepreneurship.

Through this program, I received mentorship from faculty and industry leaders to refine entrepreneurial ideas and pitch them in campus-wide competitions.

IDEA was the catalyst for SageTech, the Steelcase Fellowship, and my approach to building products that matter.`,
    relatedIds: ['sagetech', 'steelcase', 'rutgers'],
  },
  {
    id: 'sagetech',
    year: 2021,
    month: 10,
    title: 'Started SageTech',
    subtitle: 'Founder',
    type: 'company',
    description: 'AI/XR experiential learning platform backed by NSF I-Corps.',
    writeup: `Started SageTech with the mission to revolutionize how people learn through immersive experiences.

Built an AI-powered XR learning platform that adapts to individual learning styles. Our ML models achieve 95%+ accuracy in predicting student engagement.

This journey taught me how to build from zero, work with researchers, and navigate the intersection of cutting-edge tech and real-world education problems.

Later developed MetaWeaver, a text-to-3D generative AI tool, which became a core part of the platform.`,
    link: 'https://sagetech.info',
    relatedIds: ['idea', 'nsf-icorps', 'steelcase', 'nasdaq', 'innovation-award', 'xr-publication'],
  },

  // 2022
  {
    id: 'steelcase',
    year: 2022,
    month: 3,
    title: 'Steelcase Fellowship',
    subtitle: '$5K Social Innovation',
    type: 'award',
    description: 'Steelcase Social Innovation Fellowship for ColLab project.',
    writeup: `Selected for the 2022 cohort of Steelcase Social Innovation Fellows with our ColLab project - focused on easing the transition for first-year college students.

The initiative created interactive tools and collaborative learning communities to support academic and social integration during the pivotal first-year period.

This fellowship taught me how to apply design thinking to social problems and work within the UN Sustainable Development Goals framework.`,
    relatedIds: ['idea', 'sagetech'],
  },
  {
    id: 'nsf-icorps',
    year: 2022,
    month: 6,
    title: 'NSF I-Corps',
    subtitle: 'Fellowship',
    type: 'award',
    description: 'National Science Foundation I-Corps entrepreneurial training.',
    writeup: `Participated in the NSF I-Corps Fellowship at Rutgers - an immersive entrepreneurial training program designed to explore the commercial potential of innovative ideas.

Conducted customer discovery for SageTech, interviewing 100+ potential users and stakeholders to validate the VR learning platform concept.

The fellowship taught me the Lean LaunchPad methodology and how to bridge the gap between research and commercialization.`,
    relatedIds: ['sagetech'],
  },
  {
    id: 'deloitte',
    year: 2022,
    month: 12,
    title: 'Deloitte Cyber Competition',
    subtitle: 'Round 1 Finalist',
    type: 'award',
    description: 'Deloitte Risk & Financial Advisory Cyber Threat Competition.',
    writeup: `Competed in Deloitte's Cyber Threat Competition - a challenge that tests business acumen and cybersecurity skills on real-world scenarios.

Made it to Round 1 Finalist, demonstrating ability to think like both an attacker and defender in enterprise security contexts.

This experience expanded my understanding of how security intersects with business risk and strategy.`,
  },

  // 2023
  {
    id: 'nasa',
    year: 2023,
    month: 1,
    title: 'Joined NASA Ames Research Center',
    subtitle: 'Service Design Intern',
    type: 'company',
    description: 'Redesigned SBIR/STTR process for NASA Administration.',
    writeup: `Interning at NASA was surreal. Working at Ames Research Center, I was tasked with analyzing and redesigning the SBIR/STTR innovation program.

Analyzed 100+ hours of interviews and 26,000+ tags to understand pain points in how NASA works with small businesses and startups.

The experience showed me how large organizations struggle with innovation, and planted seeds for what would eventually become my interest in building tools that reduce friction in complex systems.`,
  },
  {
    id: 'rutgers-oit-end',
    year: 2023,
    month: 5,
    title: 'Left Rutgers OIT',
    subtitle: 'Level 2 Consultant',
    type: 'company',
    description: 'Wrapped up consulting role across Rutgers computing labs.',
    writeup: `Concluded my time at Rutgers OIT after helping manage high-traffic computing labs and mentoring junior consultants.`,
    relatedIds: ['rutgers-oit', 'rutgers'],
  },
  {
    id: 'idea-end',
    year: 2023,
    month: 5,
    title: 'Completed IDEA Program',
    subtitle: 'Innovation Academy',
    type: 'program',
    description: 'Finished Rutgers innovation and entrepreneurship cohort.',
    writeup: `Completed Rutgers' IDEA program after two years of product exploration, mentorship, and venture-building work.`,
    relatedIds: ['idea', 'sagetech'],
  },
  {
    id: 'nasa-end',
    year: 2023,
    month: 5,
    title: 'Completed NASA Internship',
    subtitle: 'Service Design Intern',
    type: 'company',
    description: 'Concluded work redesigning NASA SBIR/STTR workflows.',
    writeup: `Wrapped my NASA Ames internship after delivering service-design recommendations for the SBIR/STTR process.`,
    relatedIds: ['nasa'],
  },
  {
    id: 'sagetech-end',
    year: 2023,
    month: 6,
    title: 'Ended SageTech Chapter',
    subtitle: 'Founder',
    type: 'company',
    description: 'Closed the initial SageTech operating chapter.',
    writeup: `After building SageTech through research, product, and customer discovery, I concluded this phase and carried the learnings into future work.`,
    relatedIds: ['sagetech'],
  },
  {
    id: 'nasdaq',
    year: 2023,
    month: 6,
    title: 'Nasdaq TradeTalks',
    subtitle: 'TV Appearance',
    type: 'award',
    description: 'SageTech featured on Nasdaq\'s TradeTalks show.',
    writeup: `SageTech was invited to appear on Nasdaq's #TradeTalks show, where our team spoke about our mission to increase the accessibility of experiential learning through supplemental VR lessons.

Being featured on Nasdaq was a validation that we were building something that mattered - taking VR education from a niche concept to mainstream conversation.

Hosted by Jill Malandrino, we discussed the future of immersive learning and how XR can democratize quality education.`,
    relatedIds: ['sagetech'],
  },

  // 2024
  {
    id: 'xr-publication',
    year: 2024,
    month: 4,
    title: 'XR Research Publication',
    subtitle: 'Aresty Journal',
    type: 'research',
    description: 'Literature review on XR, Experiential Learning, and Multimedia Learning.',
    writeup: `Published "A Systematic Literature Review on the Intersection of Experiential and Multimedia Learning With Virtual Reality" in the Aresty Rutgers Undergraduate Research Journal.

The research synthesizes Kolb's Experiential Learning model and Mayer's Cognitive Theory of Multimedia Learning to explore how VR can enhance educational outcomes.

This was the academic foundation for everything we built at SageTech - proving through literature that our approach was grounded in learning science.`,
    link: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/239',
    relatedIds: ['sagetech'],
  },
  {
    id: 'tmobile',
    year: 2024,
    month: 5,
    title: 'Joined T-Mobile',
    subtitle: 'AI Hardware/Software Intern',
    type: 'company',
    description: 'Coordinated AI hardware market trial across 7 teams.',
    writeup: `At T-Mobile, I worked at the intersection of AI and hardware - evaluating chipset partners and coordinating a market trial across 7 cross-functional teams.

This was my first exposure to enterprise-scale AI deployment. The politics, the coordination challenges, the gap between what's technically possible and what's organizationally feasible.

It reinforced my belief that the hardest problems in tech aren't technical - they're human.`,
  },
  {
    id: 'tmobile-end',
    year: 2024,
    month: 8,
    title: 'Left T-Mobile',
    subtitle: 'AI Hardware/Software Intern',
    type: 'company',
    description: 'Completed summer internship at T-Mobile.',
    writeup: `Concluded my T-Mobile internship after coordinating an AI hardware trial across cross-functional teams.`,
    relatedIds: ['tmobile'],
  },
  {
    id: 'graphene',
    year: 2024,
    month: 8,
    title: 'Started Graphene',
    subtitle: 'AI Browser',
    type: 'project',
    description: 'Browser-based agent framework with RAG on your session.',
    writeup: `Graphene started as a question: what if your browser understood context the way you do?

Built a browser-based agent framework using Browser-Use to create a Large Action Model with RAG on your browsing session. The browser becomes an intelligent assistant that knows what you're working on.

This project directly led to the ideas behind my later work - the realization that AI should heal and help systems, not just chat.`,
    link: 'https://github.com/rutmehta',
  },
  {
    id: 'graphene-end',
    year: 2024,
    month: 10,
    title: 'Ended Graphene Build',
    subtitle: 'AI Browser',
    type: 'project',
    description: 'Closed the first Graphene build cycle.',
    writeup: `Wrapped the initial Graphene development cycle and carried the architecture ideas into later agentic tooling work.`,
    relatedIds: ['graphene'],
  },
  {
    id: 'innovation-award',
    year: 2024,
    month: 9,
    title: 'Rutgers Innovation Award',
    subtitle: 'Undergraduate Research',
    type: 'award',
    description: 'Undergraduate Student Innovation Award from Rutgers Office for Research.',
    writeup: `Received the Undergraduate Student Innovation Award from Rutgers Office for Research for our work on SageTech and VR education technology.

This award recognizes researchers who demonstrate excellence by developing a breakthrough idea, process, or technology with the potential to improve lives and create economic value.

A validation that academic rigor and entrepreneurial ambition can coexist.`,
    relatedIds: ['sagetech', 'xr-publication'],
  },
  {
    id: 'agi-house',
    year: 2024,
    month: 10,
    title: 'AGI House $25K Win',
    subtitle: 'Drone Sentry Hackathon',
    type: 'award',
    description: 'First place at AGI House x SCSP AI Defense Hackathon.',
    writeup: `Won 1st place and $25,000 at the AGI House x SCSP AI Defense Hackathon with Drone Sentry - a hybrid aerial/underwater autonomous patrol system.

Built in 48 hours, the system uses custom trained Sonar SVM + fine-tuned YOLO v8 to extract context from live video feeds, which fed into an agentic workflow using LangChain + LangGraph with Llama 3.3-70b running on Modal.

The drones can operate in both air and water, autonomously patrolling coastal borders, detecting illicit activity, and defending high-risk zones like ports and undersea cables.

Winning was great, but the real prize was proving that with the right tools, you can build sophisticated AI systems incredibly fast.`,
    link: 'https://github.com/DivyamJindal/sentry',
  },
  {
    id: 'jj-aws-hackathon',
    year: 2024,
    month: 6,
    title: 'J&J AWS Health Hackathon',
    subtitle: 'Top 5',
    type: 'award',
    description: 'Top 5 at J&J AWS Health Hackathon.',
    writeup: `Placed in the top 5 at the J&J AWS Health Hackathon, building solutions at the intersection of healthcare and cloud.`,
  },

  // 2025
  {
    id: 'roam',
    year: 2025,
    month: 6,
    title: 'Joined Roam',
    subtitle: 'Founding AI Engineer',
    type: 'company',
    description: 'AI-powered game creation platform. Text-to-game in 60 seconds.',
    writeup: `Joined Roam as a Founding AI Engineer to work on something that felt like magic - generating entire playable games from text descriptions in under 60 seconds.

Built core AI systems for the game generation pipeline. The challenge of going from natural language to structured game worlds taught me about the future of creative tools.

This experience directly informed how I think about AI systems that can understand and create complex artifacts.`,
    link: 'https://roam.lol',
    relatedIds: ['sagetech'],
  },
  {
    id: 'njbda',
    year: 2025,
    month: 1,
    title: 'Joined NJBDA',
    subtitle: 'Software Engineering Intern',
    type: 'company',
    description: 'NLP pipeline for syllabi analysis. 89% accuracy.',
    writeup: `Built an NLP pipeline analyzing 1,200+ course syllabi using Sentence-BERT to enable cross-institutional course matching with 89% accuracy.

This project sits at the intersection of education and AI - making it easier for students to transfer credits and find equivalent courses across universities.

Practical AI that solves real problems for real people.`,
  },
  {
    id: 'njbda-end',
    year: 2025,
    month: 5,
    title: 'Left NJBDA',
    subtitle: 'Software Engineering Intern',
    type: 'company',
    description: 'Completed software engineering internship at NJBDA.',
    writeup: `Concluded the NJBDA internship after shipping and validating an NLP workflow for course equivalency matching.`,
    relatedIds: ['njbda'],
  },
  {
    id: 'sdim',
    year: 2025,
    month: 1,
    title: 'Started SDIM Research',
    subtitle: 'Quantum Research',
    type: 'research',
    description: 'Qudit stabilizer simulator. PLanQC 2025 @ POPL.',
    writeup: `SDIM represents my foray into quantum computing research - building efficient simulation methods for quantum stabilizer states in higher-dimensional systems.

Presented at PLanQC 2025 (co-located with POPL). The paper explores how to simulate qudit (higher-dimensional qubit) systems efficiently.

Quantum computing fascinates me because it represents a fundamentally different paradigm of computation. Understanding it changes how you think about all computation.`,
    link: 'https://arxiv.org/abs/2511.12777',
    relatedIds: ['rutgers'],
  },
  {
    id: 'sdim-end',
    year: 2025,
    month: 3,
    title: 'Ended SDIM Research Phase',
    subtitle: 'Quantum Research',
    type: 'research',
    description: 'Closed the initial SDIM research and presentation phase.',
    writeup: `Wrapped the first SDIM research phase after presenting results and publishing a preprint.`,
    relatedIds: ['sdim', 'rutgers'],
  },
  {
    id: 'scarlet-pitch',
    year: 2025,
    month: 3,
    title: 'ScarletPitch Competition',
    subtitle: '$1K Prize',
    type: 'award',
    description: 'ScarletPitch entrepreneurship pitch competition.',
    writeup: `Won $1,000 at the ScarletPitch Competition at Rutgers.`,
  },

  // 2026
  {
    id: 'roam-end',
    year: 2026,
    month: 1,
    title: 'Left Roam',
    subtitle: 'Founding AI Engineer',
    type: 'company',
    description: 'Concluded founding engineering chapter at Roam.',
    writeup: `Closed my chapter at Roam after building core systems for text-to-game generation.`,
    relatedIds: ['roam'],
  },
];

export const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

// Single source of truth for the Experience page. Pulled from the resume.
export const EXPERIENCE = [
  {
    role: 'Graduate Administrative Assistant – Data Management',
    org: 'Georgia State University',
    location: 'Atlanta, GA',
    dates: '2026 – Present',
    summary:
      'Keeping institutional datasets clean, reconciled, and analysis-ready, and turning them into KPI reporting that supports administrative decisions.',
    highlights: [
      'Manage institutional datasets through data cleaning, transformation, validation, reconciliation, and quality assurance, maintaining reliable, analysis-ready information for reporting.',
      'Develop repeatable data processing workflows to standardize and consolidate records across multiple sources, identifying missing values, duplicates, and data inconsistencies.',
      'Analyze institutional data for KPI reporting, trend analysis, and stakeholder decision-making, supporting efficient data management and data-driven administrative workflows.',
    ],
    stack: ['Data Cleaning', 'Data Validation', 'ETL', 'SQL', 'KPI Reporting'],
  },
  {
    role: 'Software Engineering Intern',
    org: 'RocketTech, Georgia State University',
    location: 'Atlanta, GA',
    dates: 'Jan. 2026 – Apr. 2026',
    summary:
      'Built a full-stack platform for processing NASA aerospace material data, from the database schema up through the UI.',
    highlights: [
      'Built a full-stack aerospace materials platform with React, TypeScript, Node.js, and Express, developing reusable UI components and backend services that cut user data-entry time by 30%.',
      'Developed REST APIs and ETL pipelines to ingest, transform, validate, and store 1,000+ NASA aerospace material records, enabling reliable search and retrieval across the application.',
      'Redesigned relational database schemas and optimized SQL queries with indexing, reducing data retrieval time by 35% and improving application responsiveness.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'ETL', 'SQL'],
  },
  {
    role: 'AI Agent Engineering Extern',
    org: 'Wayfair',
    location: 'Remote',
    dates: 'Aug. 2025 – Nov. 2025',
    summary:
      'Built automated AI agent pipelines for competitor tracking and content generation, deployed through CI/CD.',
    highlights: [
      'Built automated data pipelines integrating n8n, REST APIs, Gemini, and Mistral to collect and process multi-source competitor data for downstream analytics.',
      'Developed modular AI agents for competitor tracking and content generation using NLP and API integrations, reducing recurring manual processing by more than 40%.',
      'Deployed the analytics application through GitHub Actions CI/CD, automating build and deployment workflows and improving release consistency.',
    ],
    stack: ['n8n', 'REST APIs', 'Gemini', 'Mistral', 'NLP', 'GitHub Actions', 'CI/CD'],
  },
  {
    role: 'Data Analyst Intern',
    org: 'Pandughar Group Inc',
    location: 'Remote',
    dates: 'May 2025 – Aug. 2025',
    summary: 'Automated the data cleaning and reporting workflows behind recurring business datasets.',
    highlights: [
      'Built Python and SQL automation scripts to clean, transform, validate, and process recurring business datasets.',
      'Developed SQL validation checks to detect duplicate and inconsistent records, improving data accuracy by 15%.',
      'Automated recurring reporting pipelines, replacing manual processing steps and standardizing dataset generation across internal workflows.',
    ],
    stack: ['Python', 'SQL', 'Pandas', 'Data Validation'],
  },
];

import React, { useState } from 'react';

const UsefulLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const aiRemoteJobLinks = [
    // AI-Powered Job Platforms
    { name: "AI Apply", url: "https://aiapply.co", category: "AI Automation", description: "Premium AI job application automation" },
    { name: "LazyApply", url: "https://lazyapply.com", category: "AI Automation", description: "LinkedIn/Indeed automation with AI" },
    { name: "Simplify Jobs", url: "https://simplify.jobs", category: "AI Automation", description: "One-click AI applications" },
    { name: "Jobscan", url: "https://jobscan.co", category: "AI Optimization", description: "AI resume optimization & ATS scoring" },
    { name: "Resume Worded", url: "https://resumeworded.com", category: "AI Resume", description: "AI-powered resume scoring system" },
    
    // Remote-First Platforms with Visa Support
    { name: "RelocateMe", url: "https://relocate.me", category: "Relocation", description: "Tech relocation with visa sponsorship" },
    { name: "Remote.co", url: "https://remote.co", category: "Remote Jobs", description: "Curated remote job opportunities" },
    { name: "AngelList Talent", url: "https://angel.co/talent", category: "Startup Jobs", description: "Tech startup jobs with relocation" },
    { name: "Startup Jobs", url: "https://startup.jobs", category: "Startup Jobs", description: "Global startup opportunities" },
    { name: "Wellfound", url: "https://wellfound.com", category: "Startup Jobs", description: "Startup jobs with visa support" },
    
    // International Remote Platforms
    { name: "RemoteOK", url: "https://remoteok.io", category: "Remote Jobs", description: "Global remote job board" },
    { name: "We Work Remotely", url: "https://weworkremotely.com", category: "Remote Jobs", description: "Largest remote job community" },
    { name: "FlexJobs", url: "https://flexjobs.com", category: "Remote Jobs", description: "Vetted remote & flexible jobs" },
    { name: "Toptal", url: "https://toptal.com", category: "Freelance", description: "Elite freelance talent network" },
    { name: "Upwork", url: "https://upwork.com", category: "Freelance", description: "Global freelancing platform" },
    
    // Tech-Specific with Visa Support
    { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs", category: "Tech Jobs", description: "Developer jobs with relocation" },
    { name: "GitHub Jobs", url: "https://jobs.github.com", category: "Tech Jobs", description: "Developer-focused opportunities" },
    { name: "HackerRank Jobs", url: "https://hackerrank.com/jobs", category: "Tech Jobs", description: "Coding skill-based hiring" },
    { name: "Dice", url: "https://dice.com", category: "Tech Jobs", description: "Tech professionals job board" },
    { name: "CyberSeek", url: "https://cyberseek.org", category: "Cybersecurity", description: "Cybersecurity career pathways" },
    
    // European Opportunities
    { name: "TheLocal.com Jobs", url: "https://jobs.thelocal.com", category: "European Jobs", description: "Jobs across Europe with visa info" },
    { name: "EurJobs", url: "https://eurjobs.com", category: "European Jobs", description: "European job opportunities" },
    { name: "Jobs.eu", url: "https://jobs.eu", category: "European Jobs", description: "Pan-European job search" },
    { name: "StepStone", url: "https://stepstone.com", category: "European Jobs", description: "Leading European job platform" },
    { name: "Xing Jobs", url: "https://xing.com/jobs", category: "German Jobs", description: "German professional network jobs" },
    
    // Asia-Pacific Opportunities
    { name: "JobStreet", url: "https://jobstreet.com", category: "APAC Jobs", description: "Southeast Asia job platform" },
    { name: "Seek", url: "https://seek.com.au", category: "Australian Jobs", description: "Australia's largest job board" },
    { name: "JobKorea", url: "https://jobkorea.co.kr", category: "Korean Jobs", description: "South Korea job opportunities" },
    { name: "51job", url: "https://51job.com", category: "Chinese Jobs", description: "China's leading job platform" },
    { name: "Naukri", url: "https://naukri.com", category: "Indian Jobs", description: "India's largest job portal" },
    
    // AI Resume & Interview Tools
    { name: "Teal HQ", url: "https://tealhq.com", category: "AI Tools", description: "AI career development platform" },
    { name: "Rezi", url: "https://rezi.ai", category: "AI Resume", description: "ATS-optimized resume builder" },
    { name: "Kickresume", url: "https://kickresume.com", category: "Resume Builder", description: "Professional resume templates" },
    { name: "Enhancv", url: "https://enhancv.com", category: "Resume Builder", description: "Visual resume customization" },
    { name: "Interview Warmup", url: "https://grow.google/certificates/interview-warmup", category: "Interview Prep", description: "Google's AI interview practice" },
    
    // Specialized Remote Platforms
    { name: "NoDesk", url: "https://nodesk.co", category: "Remote Resources", description: "Remote work resources & jobs" },
    { name: "Working Nomads", url: "https://workingnomads.co", category: "Digital Nomad", description: "Curated remote job list" },
    { name: "Remotive", url: "https://remotive.io", category: "Remote Jobs", description: "Remote tech job community" },
    { name: "JustRemote", url: "https://justremote.co", category: "Remote Jobs", description: "Remote job aggregator" },
    { name: "Remote Leaf", url: "https://remoteleaf.com", category: "Remote Jobs", description: "Hand-picked remote jobs" },
    
    // Government & Official Visa Resources
    { name: "Work in Estonia", url: "https://work.estonia.ee", category: "Government", description: "Official Estonia work program" },
    { name: "Make it in Germany", url: "https://make-it-in-germany.com", category: "Government", description: "Official German work portal" },
    { name: "Work in Finland", url: "https://work.finland.fi", category: "Government", description: "Finland work opportunities" },
    { name: "Work in Denmark", url: "https://workindenmark.dk", category: "Government", description: "Danish work authorization" },
    { name: "Netherlands Expat", url: "https://expatnetwork.com", category: "Government", description: "Netherlands work permits" },
    
    // Consulting & Contract Platforms
    { name: "Catalant", url: "https://catalant.com", category: "Consulting", description: "Expert consulting network" },
    { name: "10EQS", url: "https://10eqs.com", category: "Consulting", description: "Strategy consulting projects" },
    { name: "Expert360", url: "https://expert360.com", category: "Consulting", description: "Expert consulting marketplace" },
    { name: "Clarity", url: "https://clarity.fm", category: "Consulting", description: "On-demand business advice" },
    { name: "GLG", url: "https://glg.it", category: "Consulting", description: "Global expert insights network" },
    
    // Industry-Specific Platforms
    { name: "BioSpace", url: "https://biospace.com", category: "Biotech", description: "Life sciences job platform" },
    { name: "FinancialCareers", url: "https://efinancialcareers.com", category: "Finance", description: "Financial services jobs" },
    { name: "HealthJobsNationwide", url: "https://healthjobsnationwide.com", category: "Healthcare", description: "Healthcare professional jobs" },
    { name: "EdWeek Jobs", url: "https://jobs.edweek.org", category: "Education", description: "Education sector opportunities" },
    { name: "Mediabistro", url: "https://mediabistro.com", category: "Media", description: "Media & communications jobs" },
    
    // AI & Machine Learning Specific
    { name: "AI Jobs", url: "https://ai-jobs.net", category: "AI Specific", description: "Artificial intelligence careers" },
    { name: "ML Jobs", url: "https://mljobs.com", category: "ML Specific", description: "Machine learning opportunities" },
    { name: "Deep Learning Jobs", url: "https://deeplearningjobs.com", category: "Deep Learning", description: "Neural network & AI research" },
    { name: "Data Science Central", url: "https://datasciencecentral.com/jobs", category: "Data Science", description: "Data science job board" },
    { name: "KDnuggets Jobs", url: "https://kdnuggets.com/jobs", category: "Data Analytics", description: "Analytics & data mining jobs" },
    
    // Blockchain & Crypto
    { name: "Crypto Jobs List", url: "https://cryptojobslist.com", category: "Blockchain", description: "Cryptocurrency & blockchain jobs" },
    { name: "Blockchain Jobs", url: "https://blockchainjobs.co", category: "Blockchain", description: "Decentralized technology careers" },
    { name: "AngelList Crypto", url: "https://angel.co/jobs/crypto", category: "Crypto Startups", description: "Crypto startup opportunities" },
    { name: "Web3 Jobs", url: "https://web3.career", category: "Web3", description: "Decentralized web opportunities" },
    { name: "DeFi Jobs", url: "https://defijobs.net", category: "DeFi", description: "Decentralized finance careers" },
    
    // Design & Creative
    { name: "Dribbble Jobs", url: "https://dribbble.com/jobs", category: "Design", description: "Creative design opportunities" },
    { name: "Behance Jobs", url: "https://behance.net/jobboard", category: "Creative", description: "Creative professional network" },
    { name: "AIGA Design Jobs", url: "https://designjobs.aiga.org", category: "Design", description: "Professional design careers" },
    { name: "Krop", url: "https://krop.com", category: "Creative", description: "Creative industry job board" },
    { name: "Working Not Working", url: "https://workingnotworking.com", category: "Creative", description: "Creative freelance network" },
    
    // Sales & Marketing
    { name: "SalesJobs", url: "https://salesjobs.com", category: "Sales", description: "Sales professional opportunities" },
    { name: "MarketingHire", url: "https://marketinghire.com", category: "Marketing", description: "Digital marketing careers" },
    { name: "Growth Hackers Jobs", url: "https://jobs.growthhackers.com", category: "Growth", description: "Growth marketing roles" },
    { name: "HubSpot Jobs", url: "https://hubspot.com/jobs", category: "Inbound Marketing", description: "Inbound marketing opportunities" },
    { name: "Salesforce Talent", url: "https://salesforce.com/company/careers", category: "CRM", description: "Customer relationship careers" },
    
    // Product Management
    { name: "Product Manager Jobs", url: "https://productmanagerjobs.co", category: "Product", description: "Product management roles" },
    { name: "Mind the Product Jobs", url: "https://mindtheproduct.com/jobs", category: "Product", description: "Product community jobs" },
    { name: "ProductHired", url: "https://producthired.com", category: "Product", description: "Product management careers" },
    { name: "Roadmunk Jobs", url: "https://roadmunk.com/jobs", category: "Product Planning", description: "Product roadmap careers" },
    { name: "Product School Jobs", url: "https://productschool.com/jobs", category: "Product Education", description: "Product management training" },
    
    // Executive & Leadership
    { name: "ExecuNet", url: "https://execunet.com", category: "Executive", description: "Executive-level opportunities" },
    { name: "BoardProspects", url: "https://boardprospects.com", category: "Board Roles", description: "Corporate board positions" },
    { name: "Russell Reynolds", url: "https://russellreynolds.com", category: "Executive Search", description: "C-level executive search" },
    { name: "Korn Ferry", url: "https://kornferry.com", category: "Executive Search", description: "Leadership consulting & search" },
    { name: "Spencer Stuart", url: "https://spencerstuart.com", category: "Executive Search", description: "Board & executive search" },
    
    // Remote Work Tools & Platforms
    { name: "Zoom Careers", url: "https://zoom.us/careers", category: "Remote Tools", description: "Video conferencing careers" },
    { name: "Slack Careers", url: "https://slack.com/careers", category: "Collaboration", description: "Team collaboration platform" },
    { name: "Notion Careers", url: "https://notion.so/careers", category: "Productivity", description: "Workspace platform careers" },
    { name: "Figma Careers", url: "https://figma.com/careers", category: "Design Tools", description: "Collaborative design platform" },
    { name: "Miro Careers", url: "https://miro.com/careers", category: "Visual Collaboration", description: "Online whiteboard platform" },
    
    // Startup Ecosystems
    { name: "F6S Jobs", url: "https://f6s.com/jobs", category: "Startup Ecosystem", description: "Global startup community" },
    { name: "Founder Groups", url: "https://foundergroups.com", category: "Founder Network", description: "Entrepreneur networking" },
    { name: "Startup Grind Jobs", url: "https://startupgrind.com/jobs", category: "Startup Community", description: "Entrepreneur community jobs" },
    { name: "Product Hunt Jobs", url: "https://producthunt.com/jobs", category: "Tech Startups", description: "Innovative product careers" },
    { name: "Indie Hackers Jobs", url: "https://indiehackers.com/jobs", category: "Indie Startups", description: "Independent maker community" },
    
    // International Specific Platforms
    { name: "Canada Jobs", url: "https://canadajobs.com", category: "Canadian Jobs", description: "Canadian work opportunities" },
    { name: "USAJOBS", url: "https://usajobs.gov", category: "US Government", description: "US federal employment" },
    { name: "UK Gov Jobs", url: "https://gov.uk/jobs", category: "UK Government", description: "UK government positions" },
    { name: "Australia Jobs", url: "https://australiajobs.com", category: "Australian Jobs", description: "Australian job opportunities" },
    { name: "New Zealand Jobs", url: "https://newzealandjobs.com", category: "NZ Jobs", description: "New Zealand employment" },
    
    // Language Learning for Remote Work
    { name: "Preply Tutoring", url: "https://preply.com/tutoring-jobs", category: "Language Teaching", description: "Online language tutoring" },
    { name: "iTalki Teaching", url: "https://italki.com/teach", category: "Language Teaching", description: "Language teaching platform" },
    { name: "Verbling Teaching", url: "https://verbling.com/teach", category: "Language Teaching", description: "Professional language tutoring" },
    { name: "Cambly Tutoring", url: "https://cambly.com/tutors", category: "English Teaching", description: "English conversation practice" },
    { name: "Lingoda Teaching", url: "https://lingoda.com/jobs", category: "Language Teaching", description: "Structured language courses" },
    
    // Additional AI-Powered Platforms
    { name: "ZipRecruiter AI", url: "https://ziprecruiter.com", category: "AI Matching", description: "AI-powered job matching" },
    { name: "Indeed Smart Apply", url: "https://indeed.com", category: "AI Applications", description: "Smart application system" },
    { name: "LinkedIn AI Insights", url: "https://linkedin.com/jobs", category: "Professional Network", description: "AI career insights platform" },
    { name: "Glassdoor AI", url: "https://glassdoor.com", category: "Company Insights", description: "AI-powered company research" },
    { name: "Monster AI", url: "https://monster.com", category: "AI Recruitment", description: "AI recruitment technology" },
    
    // Specialized Tech Platforms
    { name: "Hired", url: "https://hired.com", category: "Tech Recruiting", description: "Tech talent marketplace" },
    { name: "Vettery", url: "https://vettery.com", category: "Tech Recruiting", description: "Specialist recruiting platform" },
    { name: "CodeSignal Jobs", url: "https://codesignal.com/developers", category: "Developer Assessment", description: "Coding skill-based hiring" },
    { name: "HackerEarth Jobs", url: "https://hackerearth.com/jobs", category: "Developer Platform", description: "Developer skill assessment" },
    { name: "Codility Jobs", url: "https://codility.com/jobs", category: "Programming Assessment", description: "Programming skill evaluation" },
    
    // Global Remote Resources
    { name: "Remote Year Jobs", url: "https://remoteyear.com/jobs", category: "Digital Nomad", description: "Remote work & travel programs" },
    { name: "Nomad List Jobs", url: "https://nomadlist.com/jobs", category: "Digital Nomad", description: "Digital nomad job board" },
    { name: "Remote Work Hub", url: "https://remoteworkhub.com", category: "Remote Resources", description: "Remote work community" },
    { name: "Remote Work Association", url: "https://remotework.org", category: "Remote Advocacy", description: "Remote work advocacy" },
    { name: "Future of Work", url: "https://futureofwork.org", category: "Future Trends", description: "Work trend analysis" }
  ];

  const filteredLinks = aiRemoteJobLinks.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(aiRemoteJobLinks.map(link => link.category))];

  return (
    <div className="useful-links-container">
      <div className="links-header">
        <h3>🔗 Useful Links</h3>
        <p className="links-subtitle">120 AI-Powered Remote Work Platforms with Visa Support</p>
        <input
          type="text"
          placeholder="Search links..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="links-search"
        />
      </div>
      
      <div className="links-stats">
        <span>Total: {aiRemoteJobLinks.length} links</span>
        <span>Categories: {categories.length}</span>
        <span>Showing: {filteredLinks.length}</span>
      </div>

      <div className="links-list">
        {filteredLinks.map((link, index) => (
          <div key={index} className="link-item">
            <div className="link-main">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-name">
                {link.name}
              </a>
              <span className="link-category">{link.category}</span>
            </div>
            <p className="link-description">{link.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;
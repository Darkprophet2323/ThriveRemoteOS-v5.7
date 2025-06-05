import React, { useState } from 'react';

const UsefulLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const aiRemoteJobLinks = [
    // 🤖 AI-Powered Job Search Platforms (Curated for Arizona Waitress -> UK/Europe/Ireland)
    { name: "HiringCafe", url: "https://hiring.cafe", category: "AI Job Search", description: "AI-driven job search engine indexing vacancies from employer career pages" },
    { name: "Adzuna UK", url: "https://www.adzuna.co.uk", category: "AI Job Search", description: "UK job search engine with AI-powered 'Prepper' interview tool" },
    { name: "Job Today", url: "https://jobtoday.com", category: "AI Job Search", description: "Mobile employment app for US, UK, and Spain with quick hiring in hospitality" },
    { name: "WhatJobs", url: "https://www.whatjobs.com", category: "AI Job Search", description: "International job platform operating in 39 countries" },
    { name: "Remocate", url: "https://www.remocate.app", category: "AI Job Search", description: "Remote jobs for digital nomads with relocation support" },
    
    // 🧰 AI Resume & Interview Tools (Arizona -> Europe Focus)
    { name: "Career.io", url: "https://career.io", category: "AI Resume Tools", description: "AI-enhanced resume optimization and job application tracker" },
    { name: "Torre.ai", url: "https://www.torre.ai", category: "AI Resume Tools", description: "AI-driven platform for remote work matching" },
    { name: "LazyApply", url: "https://lazyapply.com", category: "AI Automation", description: "AI job application automation for LinkedIn, Indeed, ZipRecruiter" },
    { name: "Reel.fyi", url: "https://reel.fyi", category: "AI Automation", description: "Chrome AI copilot for LinkedIn networking and referrals" },
    { name: "Hirebird", url: "https://hirebird.com", category: "AI Automation", description: "AI-driven compatibility matching platform" },
    
    // 🌍 Remote Job Boards with AI (Europe-focused)
    { name: "FlexJobs", url: "https://www.flexjobs.com", category: "Remote Jobs AI", description: "AI-curated verified remote and flexible opportunities" },
    { name: "We Work Remotely", url: "https://weworkremotely.com", category: "Remote Jobs AI", description: "AI-categorized remote job listings" },
    { name: "Remote.co", url: "https://remote.co", category: "Remote Jobs AI", description: "Curated remote jobs with AI-driven search" },
    { name: "Remote OK", url: "https://remoteok.io", category: "Remote Jobs AI", description: "AI-powered remote job aggregator" },
    
    // Additional AI-Powered Job Platforms
    { name: "AI Apply", url: "https://aiapply.co", category: "AI Automation", description: "Premium AI job application automation" },
    { name: "Simplify Jobs", url: "https://simplify.jobs", category: "AI Automation", description: "One-click AI applications" },
    { name: "Jobscan", url: "https://jobscan.co", category: "AI Optimization", description: "AI resume optimization & ATS scoring" },
    { name: "Resume Worded", url: "https://resumeworded.com", category: "AI Resume", description: "AI-powered resume scoring system" },
    { name: "Teal HQ", url: "https://tealhq.com", category: "AI Tools", description: "AI career development platform" },
    
    // Remote-First Platforms with Visa Support
    { name: "RelocateMe", url: "https://relocate.me", category: "Relocation", description: "Tech relocation with visa sponsorship" },
    { name: "AngelList Talent", url: "https://angel.co/talent", category: "Startup Jobs", description: "Tech startup jobs with relocation" },
    { name: "Startup Jobs", url: "https://startup.jobs", category: "Startup Jobs", description: "Global startup opportunities" },
    { name: "Wellfound", url: "https://wellfound.com", category: "Startup Jobs", description: "Startup jobs with visa support" },
    { name: "Toptal", url: "https://toptal.com", category: "Freelance", description: "Elite freelance talent network" },
    
    // European Opportunities (Arizona -> Europe Focus)
    { name: "TheLocal.com Jobs", url: "https://jobs.thelocal.com", category: "European Jobs", description: "Jobs across Europe with visa info" },
    { name: "EurJobs", url: "https://eurjobs.com", category: "European Jobs", description: "European job opportunities" },
    { name: "Jobs.eu", url: "https://jobs.eu", category: "European Jobs", description: "Pan-European job search" },
    { name: "StepStone", url: "https://stepstone.com", category: "European Jobs", description: "Leading European job platform" },
    { name: "Xing Jobs", url: "https://xing.com/jobs", category: "German Jobs", description: "German professional network jobs" },
    
    // UK-Specific (Arizona -> UK Focus)
    { name: "UK Gov Jobs", url: "https://gov.uk/jobs", category: "UK Government", description: "UK government positions" },
    { name: "Totaljobs UK", url: "https://totaljobs.com", category: "UK Jobs", description: "UK's leading job board" },
    { name: "Reed UK", url: "https://reed.co.uk", category: "UK Jobs", description: "UK recruitment platform" },
    { name: "Indeed UK", url: "https://indeed.co.uk", category: "UK Jobs", description: "UK job search engine" },
    { name: "CV Library", url: "https://cv-library.co.uk", category: "UK Jobs", description: "UK job board and CV database" },
    
    // Ireland-Specific (Arizona -> Ireland Focus)
    { name: "Jobs.ie", url: "https://jobs.ie", category: "Irish Jobs", description: "Ireland's largest job board" },
    { name: "IrishJobs", url: "https://irishjobs.ie", category: "Irish Jobs", description: "Leading Irish recruitment website" },
    { name: "Recruit Ireland", url: "https://recruitireland.com", category: "Irish Jobs", description: "Irish recruitment platform" },
    { name: "Public Jobs Ireland", url: "https://publicjobs.ie", category: "Irish Government", description: "Irish public sector jobs" },
    
    // Tech-Specific with Visa Support
    { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs", category: "Tech Jobs", description: "Developer jobs with relocation" },
    { name: "GitHub Jobs", url: "https://jobs.github.com", category: "Tech Jobs", description: "Developer-focused opportunities" },
    { name: "HackerRank Jobs", url: "https://hackerrank.com/jobs", category: "Tech Jobs", description: "Coding skill-based hiring" },
    { name: "Dice", url: "https://dice.com", category: "Tech Jobs", description: "Tech professionals job board" },
    { name: "CyberSeek", url: "https://cyberseek.org", category: "Cybersecurity", description: "Cybersecurity career pathways" },
    
    // Government & Official Visa Resources
    { name: "Work in Estonia", url: "https://work.estonia.ee", category: "Government", description: "Official Estonia work program" },
    { name: "Make it in Germany", url: "https://make-it-in-germany.com", category: "Government", description: "Official German work portal" },
    { name: "Work in Finland", url: "https://work.finland.fi", category: "Government", description: "Finland work opportunities" },
    { name: "Work in Denmark", url: "https://workindenmark.dk", category: "Government", description: "Danish work authorization" },
    { name: "Netherlands Expat", url: "https://expatnetwork.com", category: "Government", description: "Netherlands work permits" },
    
    // Hospitality & Service Industry (Arizona Waitress Focus)
    { name: "Hospitality Jobs UK", url: "https://hospitalityjobs.com", category: "Hospitality", description: "UK hospitality and service roles" },
    { name: "Caterer Jobs", url: "https://caterer.com/jobs", category: "Hospitality", description: "UK catering and hospitality jobs" },
    { name: "Indeed Hospitality", url: "https://indeed.com/q-hospitality-jobs.html", category: "Hospitality", description: "Global hospitality job search" },
    { name: "Hotel Jobs Europe", url: "https://hoteljobs.eu", category: "Hospitality", description: "European hotel and restaurant jobs" },
    { name: "Restaurant Jobs", url: "https://restaurantjobs.com", category: "Hospitality", description: "Restaurant and food service careers" },
    
    // AI & Machine Learning Specific
    { name: "AI Jobs", url: "https://ai-jobs.net", category: "AI Specific", description: "Artificial intelligence careers" },
    { name: "ML Jobs", url: "https://mljobs.com", category: "ML Specific", description: "Machine learning opportunities" },
    { name: "Deep Learning Jobs", url: "https://deeplearningjobs.com", category: "Deep Learning", description: "Neural network & AI research" },
    { name: "Data Science Central", url: "https://datasciencecentral.com/jobs", category: "Data Science", description: "Data science job board" },
    { name: "KDnuggets Jobs", url: "https://kdnuggets.com/jobs", category: "Data Analytics", description: "Analytics & data mining jobs" },
    
    // Language Learning for Remote Work (Arizona -> Europe)
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
    
    // Specialized Remote Platforms
    { name: "NoDesk", url: "https://nodesk.co", category: "Remote Resources", description: "Remote work resources & jobs" },
    { name: "Working Nomads", url: "https://workingnomads.co", category: "Digital Nomad", description: "Curated remote job list" },
    { name: "Remotive", url: "https://remotive.io", category: "Remote Jobs", description: "Remote tech job community" },
    { name: "JustRemote", url: "https://justremote.co", category: "Remote Jobs", description: "Remote job aggregator" },
    { name: "Remote Leaf", url: "https://remoteleaf.com", category: "Remote Jobs", description: "Hand-picked remote jobs" },
    
    // Design & Creative
    { name: "Dribbble Jobs", url: "https://dribbble.com/jobs", category: "Design", description: "Creative design opportunities" },
    { name: "Behance Jobs", url: "https://behance.net/jobboard", category: "Creative", description: "Creative professional network" },
    { name: "AIGA Design Jobs", url: "https://designjobs.aiga.org", category: "Design", description: "Professional design careers" },
    { name: "Krop", url: "https://krop.com", category: "Creative", description: "Creative industry job board" },
    { name: "Working Not Working", url: "https://workingnotworking.com", category: "Creative", description: "Creative freelance network" },
    
    // Consulting & Contract Platforms
    { name: "Catalant", url: "https://catalant.com", category: "Consulting", description: "Expert consulting network" },
    { name: "10EQS", url: "https://10eqs.com", category: "Consulting", description: "Strategy consulting projects" },
    { name: "Expert360", url: "https://expert360.com", category: "Consulting", description: "Expert consulting marketplace" },
    { name: "Clarity", url: "https://clarity.fm", category: "Consulting", description: "On-demand business advice" },
    { name: "GLG", url: "https://glg.it", category: "Consulting", description: "Global expert insights network" },
    
    // Sales & Marketing
    { name: "SalesJobs", url: "https://salesjobs.com", category: "Sales", description: "Sales professional opportunities" },
    { name: "MarketingHire", url: "https://marketinghire.com", category: "Marketing", description: "Digital marketing careers" },
    { name: "Growth Hackers Jobs", url: "https://jobs.growthhackers.com", category: "Growth", description: "Growth marketing roles" },
    { name: "HubSpot Jobs", url: "https://hubspot.com/jobs", category: "Inbound Marketing", description: "Inbound marketing opportunities" },
    { name: "Salesforce Talent", url: "https://salesforce.com/company/careers", category: "CRM", description: "Customer relationship careers" },
    
    // International Specific Platforms
    { name: "Canada Jobs", url: "https://canadajobs.com", category: "Canadian Jobs", description: "Canadian work opportunities" },
    { name: "USAJOBS", url: "https://usajobs.gov", category: "US Government", description: "US federal employment" },
    { name: "Australia Jobs", url: "https://australiajobs.com", category: "Australian Jobs", description: "Australian job opportunities" },
    { name: "New Zealand Jobs", url: "https://newzealandjobs.com", category: "NZ Jobs", description: "New Zealand employment" },
    
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
    { name: "Future of Work", url: "https://futureofwork.org", category: "Future Trends", description: "Work trend analysis" },
    
    // Additional European Resources
    { name: "European Job Mobility Portal", url: "https://eures.ec.europa.eu", category: "EU Official", description: "Official EU job mobility network" },
    { name: "Work in Norway", url: "https://workingnorway.no", category: "Norwegian Jobs", description: "Norway work opportunities" },
    { name: "Work in Sweden", url: "https://workingsweden.se", category: "Swedish Jobs", description: "Sweden employment portal" },
    { name: "Jobs in Berlin", url: "https://jobsinberlin.eu", category: "German Jobs", description: "Berlin tech job opportunities" },
    { name: "Amsterdam Jobs", url: "https://amsterdamjobs.com", category: "Dutch Jobs", description: "Amsterdam employment opportunities" }
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
        <p className="links-subtitle">120+ AI-Powered Remote Work Platforms | Arizona → UK/Europe/Ireland Focus</p>
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
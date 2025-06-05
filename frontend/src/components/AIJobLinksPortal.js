import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AIJobLinksPortal = () => {
  const [selectedCategory, setSelectedCategory] = useState('ai_automation');
  const [aiTools, setAITools] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAITools = async () => {
      try {
        const response = await axios.get(`${API}/content/ai-tools`);
        setAITools(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AI tools:", error);
        setLoading(false);
      }
    };

    fetchAITools();
  }, []);

  // Enhanced AI Job Application Companies Database
  const aiJobCompanies = {
    ai_automation: {
      name: "🤖 AI Job Automation Platforms",
      description: "Automated job application systems using AI",
      companies: [
        {
          name: "AI Apply",
          description: "Premium AI-powered job application automation platform with high success rates",
          url: "https://aiapply.co/",
          logo: "🎯",
          tier: "Premium",
          features: ["Auto-apply to 1000+ jobs", "Custom cover letters", "Interview scheduling"],
          pricing: "$29/month"
        },
        {
          name: "LazyApply",
          description: "LinkedIn and Indeed automation tool for bulk job applications",
          url: "https://lazyapply.com/",
          logo: "⚡",
          tier: "Popular",
          features: ["LinkedIn integration", "Indeed automation", "Application tracking"],
          pricing: "$19/month"
        },
        {
          name: "Simplify Jobs",
          description: "One-click job applications with AI resume optimization",
          url: "https://simplify.jobs/",
          logo: "🚀",
          tier: "Featured",
          features: ["One-click apply", "Resume optimization", "Application insights"],
          pricing: "Free + Premium"
        },
        {
          name: "JobBot AI",
          description: "Chrome extension for automated job applications with smart filtering",
          url: "https://jobsbot.com/",
          logo: "🤖",
          tier: "Growing",
          features: ["Chrome extension", "Smart filtering", "Application analytics"],
          pricing: "$15/month"
        },
        {
          name: "ApplyBot",
          description: "AI-driven application system with personalized outreach",
          url: "https://applybot.ai/",
          logo: "📧",
          tier: "New",
          features: ["Personalized outreach", "Follow-up automation", "Response tracking"],
          pricing: "$25/month"
        }
      ]
    },
    resume_ai: {
      name: "📄 AI Resume & CV Builders",
      description: "AI-powered resume creation and optimization tools",
      companies: [
        {
          name: "Resume Worded",
          description: "AI-powered resume optimization with instant scoring system",
          url: "https://resumeworded.com/",
          logo: "📊",
          tier: "Premium",
          features: ["AI scoring", "ATS optimization", "LinkedIn optimization"],
          pricing: "$19/month"
        },
        {
          name: "Teal HQ",
          description: "AI career platform with resume builder and job tracking",
          url: "https://tealhq.com/",
          logo: "💎",
          tier: "Featured",
          features: ["Resume builder", "Job tracking", "Career coaching"],
          pricing: "Free + Premium"
        },
        {
          name: "Rezi AI",
          description: "ATS-optimized resume builder with AI content generation",
          url: "https://rezi.ai/",
          logo: "🎨",
          tier: "Popular",
          features: ["ATS optimization", "AI content", "Multiple templates"],
          pricing: "$29/month"
        },
        {
          name: "Enhancv",
          description: "Visual resume builder with AI-powered content suggestions",
          url: "https://enhancv.com/",
          logo: "✨",
          tier: "Creative",
          features: ["Visual design", "AI suggestions", "Modern templates"],
          pricing: "$24.99/month"
        },
        {
          name: "Kickresume",
          description: "AI resume builder with professional templates and cover letters",
          url: "https://kickresume.com/",
          logo: "🎯",
          tier: "Professional",
          features: ["Professional templates", "Cover letters", "Website builder"],
          pricing: "$19/month"
        }
      ]
    },
    interview_ai: {
      name: "🎤 AI Interview Preparation",
      description: "AI-powered interview coaching and preparation platforms",
      companies: [
        {
          name: "Interview Warmup (Google)",
          description: "Google's free AI interview practice platform with real-time feedback",
          url: "https://grow.google/certificates/interview-warmup/",
          logo: "🔥",
          tier: "Free",
          features: ["Real-time feedback", "Industry-specific", "Google-backed"],
          pricing: "Free"
        },
        {
          name: "Interviewing.io",
          description: "Technical interview practice with real engineers and AI feedback",
          url: "https://interviewing.io/",
          logo: "💻",
          tier: "Technical",
          features: ["Real engineers", "Technical focus", "Anonymous practice"],
          pricing: "Free + Premium"
        },
        {
          name: "Pramp",
          description: "Peer-to-peer interview practice with AI-powered matching",
          url: "https://pramp.com/",
          logo: "🤝",
          tier: "Community",
          features: ["Peer practice", "AI matching", "Free sessions"],
          pricing: "Free"
        },
        {
          name: "InterviewBuddy",
          description: "AI-powered interview coach with personalized feedback",
          url: "https://interviewbuddy.in/",
          logo: "🎭",
          tier: "AI Coach",
          features: ["AI coaching", "Personalized feedback", "Multiple scenarios"],
          pricing: "$39/month"
        },
        {
          name: "Big Interview",
          description: "Comprehensive interview training system with AI assessment",
          url: "https://biginterview.com/",
          logo: "🎪",
          tier: "Comprehensive",
          features: ["Video practice", "AI assessment", "Industry-specific"],
          pricing: "$79/month"
        }
      ]
    },
    job_search_ai: {
      name: "🔍 AI Job Search Platforms",
      description: "AI-enhanced job discovery and matching platforms",
      companies: [
        {
          name: "LinkedIn Jobs AI",
          description: "LinkedIn's AI-powered job recommendations and easy apply",
          url: "https://linkedin.com/jobs/",
          logo: "💼",
          tier: "Essential",
          features: ["AI recommendations", "Easy apply", "Network insights"],
          pricing: "Free + Premium"
        },
        {
          name: "ZipRecruiter AI",
          description: "AI job matching with instant notifications and one-click apply",
          url: "https://ziprecruiter.com/",
          logo: "⚡",
          tier: "Fast",
          features: ["Instant matching", "One-click apply", "Salary insights"],
          pricing: "Free"
        },
        {
          name: "Indeed Smart Apply",
          description: "AI-powered job search with smart application features",
          url: "https://indeed.com/",
          logo: "🎯",
          tier: "Popular",
          features: ["Smart apply", "Salary comparison", "Company reviews"],
          pricing: "Free"
        },
        {
          name: "Glassdoor AI",
          description: "AI-driven job search with company insights and salary data",
          url: "https://glassdoor.com/",
          logo: "🏢",
          tier: "Insights",
          features: ["Company insights", "Salary data", "Interview reviews"],
          pricing: "Free + Premium"
        },
        {
          name: "AngelList Talent",
          description: "AI startup job matching with equity and remote opportunities",
          url: "https://angel.co/",
          logo: "👼",
          tier: "Startup",
          features: ["Startup focus", "Equity info", "Remote jobs"],
          pricing: "Free"
        }
      ]
    },
    recruiting_ai: {
      name: "🎪 AI Recruiting & Hiring Platforms",
      description: "Companies using AI for recruitment and hiring processes",
      companies: [
        {
          name: "HireVue",
          description: "AI-powered video interviewing and assessment platform",
          url: "https://hirevue.com/",
          logo: "🎥",
          tier: "Enterprise",
          features: ["Video interviews", "AI assessment", "Predictive analytics"],
          pricing: "Enterprise"
        },
        {
          name: "Pymetrics",
          description: "AI-powered talent matching using neuroscience games",
          url: "https://pymetrics.ai/",
          logo: "🧠",
          tier: "Scientific",
          features: ["Neuroscience games", "Bias reduction", "Talent matching"],
          pricing: "Enterprise"
        },
        {
          name: "Paradox (Olivia)",
          description: "AI recruiting assistant for automated candidate screening",
          url: "https://paradox.ai/",
          logo: "🤖",
          tier: "Automation",
          features: ["AI assistant", "Automated screening", "Candidate engagement"],
          pricing: "Enterprise"
        },
        {
          name: "Workday AI",
          description: "AI-powered HR and recruiting solutions for enterprises",
          url: "https://workday.com/",
          logo: "⚙️",
          tier: "Enterprise",
          features: ["HR automation", "Predictive analytics", "Talent insights"],
          pricing: "Enterprise"
        },
        {
          name: "SmartRecruiters",
          description: "AI-enhanced talent acquisition platform",
          url: "https://smartrecruiters.com/",
          logo: "🎯",
          tier: "Platform",
          features: ["AI sourcing", "Candidate matching", "Hiring analytics"],
          pricing: "Enterprise"
        }
      ]
    }
  };

  const filteredCompanies = searchTerm
    ? Object.values(aiJobCompanies).flatMap(category =>
        category.companies.filter(company =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : aiJobCompanies[selectedCategory]?.companies || [];

  const getTierColor = (tier) => {
    const colors = {
      'Premium': '#D4AF37',
      'Featured': '#FF6B6B',
      'Popular': '#4ECDC4',
      'Free': '#45B7D1',
      'Enterprise': '#96CEB4',
      'Technical': '#FFEAA7',
      'Community': '#DDA0DD',
      'New': '#98D8C8',
      'Growing': '#F7DC6F',
      'Essential': '#85C1E9',
      'Fast': '#F8C471',
      'Insights': '#BB8FCE',
      'Startup': '#82E0AA',
      'Scientific': '#F1948A',
      'Automation': '#85C1E9',
      'Platform': '#F8D7DA',
      'Creative': '#D1ECF1',
      'Professional': '#D4EDDA',
      'AI Coach': '#FFF3CD',
      'Comprehensive': '#F4CCCC'
    };
    return colors[tier] || '#E0E0E0';
  };

  if (loading) {
    return (
      <div className="ai-job-portal">
        <div className="portal-header">
          <h2>🤖 AI Job Application Companies Portal</h2>
          <p>Loading entertainment hub for AI job platforms...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-job-portal" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #f1f3f4 50%, #e9ecef 75%, #f8f9fa 100%)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.05)',
      border: '1px solid rgba(108, 117, 125, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Sophisticated Header */}
      <div style={{
        background: 'linear-gradient(135deg, #212529 0%, #343a40 50%, #495057 100%)',
        padding: '30px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'subtleRotate 20s linear infinite'
        }} />
        
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 50%, #e9ecef 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 2
        }}>
          🤖 AI Job Links Portal
        </h2>
        <p style={{
          fontSize: '1.1rem',
          opacity: 0.9,
          fontWeight: '400',
          position: 'relative',
          zIndex: 2
        }}>
          Professional AI-Powered Job Application Platform
        </p>
        <p style={{
          fontSize: '0.9rem',
          opacity: 0.7,
          marginTop: '8px',
          position: 'relative',
          zIndex: 2
        }}>
          Featuring {Object.values(aiJobCompanies).reduce((total, cat) => total + cat.companies.length, 0)}+ Premium AI Platforms
        </p>
        
        {/* Enhanced Search Bar */}
        <div style={{
          marginTop: '25px',
          maxWidth: '400px',
          margin: '25px auto 0',
          position: 'relative',
          zIndex: 2
        }}>
          <input
            type="text"
            placeholder="🔍 Search premium AI job platforms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.95)',
              color: '#212529',
              fontSize: '1rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          />
        </div>
      </div>

      {/* Enhanced Category Navigation */}
      {!searchTerm && (
        <div style={{
          padding: '30px',
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {Object.entries(aiJobCompanies).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{
                  padding: '18px 20px',
                  border: 'none',
                  background: selectedCategory === key 
                    ? 'linear-gradient(135deg, #212529 0%, #495057 100%)'
                    : 'rgba(248, 249, 250, 0.8)',
                  color: selectedCategory === key ? '#fff' : '#495057',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '2px solid',
                  borderColor: selectedCategory === key ? '#212529' : 'rgba(233, 236, 239, 0.5)',
                  boxShadow: selectedCategory === key 
                    ? '0 8px 25px rgba(33, 37, 41, 0.3)'
                    : '0 4px 15px rgba(0,0,0,0.05)',
                  transform: selectedCategory === key ? 'translateY(-2px)' : 'translateY(0)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== key) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== key) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                  {category.name.split(' ')[0]}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {category.companies.length} platforms
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Professional Content Section */}
      <div style={{
        padding: '40px 30px',
        background: '#fff'
      }}>
        {!searchTerm && (
          <div style={{
            textAlign: 'center',
            marginBottom: '35px'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '8px'
            }}>
              {aiJobCompanies[selectedCategory]?.name}
            </h3>
            <p style={{
              color: '#6c757d',
              fontSize: '1rem'
            }}>
              {aiJobCompanies[selectedCategory]?.description}
            </p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredCompanies.map((company, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(233, 236, 239, 0.6)',
              borderRadius: '20px',
              padding: '25px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#495057';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'rgba(233, 236, 239, 0.6)';
            }}
            >
              {/* Subtle Background Pattern */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle, ${getTierColor(company.tier)}15 0%, transparent 70%)`,
                zIndex: 0
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Company Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginRight: '15px',
                    background: `linear-gradient(135deg, ${getTierColor(company.tier)}, ${getTierColor(company.tier)}80)`,
                    borderRadius: '15px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 15px ${getTierColor(company.tier)}30`
                  }}>
                    {company.logo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 8px 0',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#212529'
                    }}>
                      {company.name}
                    </h4>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#fff',
                      background: `linear-gradient(135deg, ${getTierColor(company.tier)}, ${getTierColor(company.tier)}CC)`,
                      boxShadow: `0 2px 8px ${getTierColor(company.tier)}40`
                    }}>
                      {company.tier}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <p style={{
                  marginBottom: '18px',
                  lineHeight: '1.6',
                  color: '#495057',
                  fontSize: '0.95rem'
                }}>
                  {company.description}
                </p>
                
                {/* Features Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  {company.features.map((feature, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(248, 249, 250, 0.8)',
                      color: '#495057',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      border: '1px solid rgba(233, 236, 239, 0.5)',
                      textAlign: 'center'
                    }}>
                      ✨ {feature}
                    </div>
                  ))}
                </div>
                
                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid rgba(233, 236, 239, 0.5)'
                }}>
                  <div style={{
                    color: '#28a745',
                    fontWeight: '700',
                    fontSize: '1rem'
                  }}>
                    💰 {company.pricing}
                  </div>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(33, 37, 41, 0.3)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 6px 20px rgba(33, 37, 41, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(33, 37, 41, 0.3)';
                    }}
                    onClick={() => {
                      console.log(`Visited: ${company.name}`);
                    }}
                  >
                    🚀 Visit Platform →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Statistics */}
      <div style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '40px 30px',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '25px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: '#fff',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(233, 236, 239, 0.5)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#212529',
              marginBottom: '5px'
            }}>
              {Object.values(aiJobCompanies).reduce((total, cat) => total + cat.companies.length, 0)}+
            </div>
            <div style={{
              color: '#6c757d',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              AI Platforms
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(233, 236, 239, 0.5)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#212529',
              marginBottom: '5px'
            }}>
              {Object.keys(aiJobCompanies).length}
            </div>
            <div style={{
              color: '#6c757d',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Categories
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(233, 236, 239, 0.5)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#212529',
              marginBottom: '5px'
            }}>
              24/7
            </div>
            <div style={{
              color: '#6c757d',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Available
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(233, 236, 239, 0.5)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#28a745',
              marginBottom: '5px'
            }}>
              Free
            </div>
            <div style={{
              color: '#6c757d',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              to Browse
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIJobLinksPortal;
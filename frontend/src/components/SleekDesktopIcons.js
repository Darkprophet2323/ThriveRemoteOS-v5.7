import React from 'react';

const SleekDesktopIcons = ({ onIconClick, sounds }) => {
  const icons = [
    {
      id: 'ai-job-portal',
      icon: '🤖',
      label: 'AI Jobs',
      component: 'AIJobLinksPortal',
      size: { width: 420, height: 315 }
    },
    {
      id: 'calculator',
      icon: '🧮',
      label: 'Calculator',
      component: 'CalculatorApp',
      size: { width: 210, height: 280 }
    },
    {
      id: 'system-status',
      icon: '📊',
      label: 'System Status',
      component: 'SystemStatusApp',
      size: { width: 350, height: 245 }
    },
    {
      id: 'uk-wonders',
      icon: '🏔️',
      label: 'UK Wonders',
      component: 'UKNaturalWondersViewer',
      size: { width: 420, height: 315 }
    },
    {
      id: 'virtual-pets',
      icon: '🐾',
      label: 'Virtual Pets',
      component: 'VirtualPetsHub',
      size: { width: 245, height: 175 }
    },
    {
      id: 'useful-links',
      icon: '🔗',
      label: 'Useful Links',
      component: 'UsefulLinks',
      size: { width: 350, height: 280 }
    }
  ];

  return (
    <div className="sleek-desktop-icons">
      {icons.map((iconData, index) => (
        <div
          key={iconData.id}
          className="sleek-icon bounceIn"
          style={{
            animationDelay: `${index * 0.05}s`
          }}
          onClick={() => {
            if (sounds?.playClick) sounds.playClick();
            onIconClick(
              iconData.label,
              iconData.icon,
              iconData.component,
              iconData.size.width,
              iconData.size.height
            );
          }}
          onMouseEnter={() => {
            if (sounds?.playHover) sounds.playHover();
          }}
        >
          <div className="icon-symbol">
            {iconData.icon}
          </div>
          <div className="icon-label">{iconData.label}</div>
        </div>
      ))}
      
      <style jsx>{`
        .sleek-desktop-icons {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, 80px);
          grid-template-rows: repeat(auto-fit, 90px);
          gap: 15px;
          padding: 30px;
          pointer-events: none;
        }

        .sleek-icon {
          pointer-events: all;
          width: 70px;
          height: 80px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: none;
          border: none;
          outline: none;
        }

        .sleek-icon:hover {
          transform: translateY(-5px) scale(1.05);
        }

        .sleek-icon:active {
          transform: translateY(-2px) scale(1.02);
        }

        .icon-symbol {
          font-size: 2.5rem;
          margin-bottom: 5px;
          filter: grayscale(100%) contrast(0.8);
          transition: all 0.3s ease;
          position: relative;
        }

        .sleek-icon:hover .icon-symbol {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.1);
          text-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .sleek-icon:hover .icon-symbol::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(108, 117, 125, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }

        .icon-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: #6c757d;
          text-align: center;
          line-height: 1.2;
          text-transform: lowercase;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
          opacity: 0.8;
          max-width: 70px;
          word-wrap: break-word;
        }

        .sleek-icon:hover .icon-label {
          color: #495057;
          opacity: 1;
          font-weight: 600;
          transform: translateY(-2px);
        }

        /* Triangular accent on hover */
        .sleek-icon::after {
          content: '';
          position: absolute;
          top: -5px;
          right: -5px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 12px solid #dee2e6;
          opacity: 0;
          transition: all 0.3s ease;
          transform: rotate(45deg);
        }

        .sleek-icon:hover::after {
          opacity: 0.6;
          transform: rotate(45deg) scale(1.2);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .sleek-desktop-icons {
            grid-template-columns: repeat(auto-fit, 70px);
            grid-template-rows: repeat(auto-fit, 80px);
            gap: 12px;
            padding: 20px;
          }
          
          .sleek-icon {
            width: 60px;
            height: 70px;
          }
          
          .icon-symbol {
            font-size: 2rem;
          }
          
          .icon-label {
            font-size: 0.65rem;
            max-width: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default SleekDesktopIcons;
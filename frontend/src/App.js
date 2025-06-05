import { useEffect, useState } from "react";
import "./App.css";
import "./animations.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import WaitressJobPortal from "./components/WaitressJobPortal";
import UsefulLinks from "./components/UsefulLinks";
import LuxuryNewsTicker from "./components/LuxuryNewsTicker";
import NotepadApp from "./components/NotepadApp";
import VaultApp from "./components/VaultApp";
import WeatherWidget from "./components/WeatherWidget";
import WeatherWidgetEnhanced from "./components/WeatherWidgetEnhanced";
import ProfessionalWeatherWidget from "./components/ProfessionalWeatherWidget";
import DownloadManager from "./components/DownloadManager";
import ProfessionalDownloadManager from "./components/ProfessionalDownloadManager";
import EnhancedSettings from "./components/EnhancedSettings";
import ProfessionalSettings from "./components/ProfessionalSettings";
import QuantumTerminal from "./components/QuantumTerminal";
import RelocateMeIntegration from "./components/RelocateMeIntegration";
import RealTimeLoader from "./components/RealTimeLoader";
import CompactSleekLoader from "./components/SimpleBootLoader";
import LiveDataService from "./components/LiveDataIntegration";
import SleekDesktopIcons from "./components/SleekDesktopIcons";
import AIJobLinksPortal from "./components/AIJobLinksPortal";
import CalculatorApp from "./components/CalculatorApp";
import MediaPlayerApp from "./components/MediaPlayerApp";
import SystemStatusApp from "./components/SystemStatusApp";
import CompactCMS from "./components/CompactCMS";
import { SoundProvider, useSounds } from "./components/SoundManager";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Desktop Environment Component
const ThriveRemoteDesktop = () => {
  const [windows, setWindows] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [virtualPets, setVirtualPets] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const [rightClickMenu, setRightClickMenu] = useState({ show: false, x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sounds = useSounds();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkMobile, 100);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Handle mobile touch events
  useEffect(() => {
    if (isMobile) {
      // Add touch event listeners for mobile interactions
      const handleTouchStart = (e) => {
        // Store touch start position for swipe detection
        const touch = e.touches[0];
        window.touchStartX = touch.clientX;
        window.touchStartY = touch.clientY;
      };

      const handleTouchEnd = (e) => {
        // Handle swipe gestures on mobile
        if (window.touchStartX !== undefined && window.touchStartY !== undefined) {
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - window.touchStartX;
          const deltaY = touch.clientY - window.touchStartY;
          
          // Swipe up from bottom to open start menu
          if (deltaY < -50 && touch.clientY > window.innerHeight - 100) {
            setShowStartMenu(true);
          }
          
          // Clear touch positions
          window.touchStartX = undefined;
          window.touchStartY = undefined;
        }
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobile]);

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available, show update prompt
                  if (window.confirm('New version available! Reload to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
      
      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SYNC_COMPLETE') {
          console.log('Background sync completed:', event.data.data);
        }
      });
    }
  }, []);

  // Handle URL parameters for mobile app shortcuts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const app = urlParams.get('app');
    
    if (app && bootComplete) {
      // Auto-open specific apps from PWA shortcuts
      setTimeout(() => {
        switch (app) {
          case 'jobs':
            handleIconClick('AI Job Links Portal', '🤖', 'AIJobLinksPortal', 420, 315);
            break;
          case 'calculator':
            handleIconClick('Calculator', '🧮', 'CalculatorApp', 210, 280);
            break;
          case 'pets':
            handleIconClick('Virtual Pets Hub', '🐾', 'VirtualPetsHub', 245, 175);
            break;
          case 'links':
            handleIconClick('Useful Links', '🔗', 'UsefulLinks', 350, 280);
            break;
          case 'settings':
            handleIconClick('System Settings', '⚙️', 'ProfessionalSettings', 350, 280);
            break;
          default:
            break;
        }
      }, 500);
    }
  }, [bootComplete]);

  // Enhanced mobile window controls
  const handleMobileClose = (windowId) => {
    if (isMobile) {
      // On mobile, closing a window goes back to desktop
      closeWindow(windowId);
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  // Time update effect

  // Mobile-responsive window sizing
  const getMobileWindowSize = (defaultWidth, defaultHeight) => {
    if (!isMobile) return { width: defaultWidth, height: defaultHeight };
    
    // On mobile, use full viewport dimensions
    return {
      width: window.innerWidth,
      height: window.innerHeight - 78 // Account for news ticker (28px) + taskbar (50px)
    };
  };

  const handleLoadingComplete = () => {
    setBootComplete(true);
    setLoading(false);
  };
  
  // Right-click context menu handler
  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
    setShowStartMenu(false);
  };

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const statusResponse = await axios.get(`${API}/dashboard/live-stats`);
        setSystemStatus(statusResponse.data);

        const petsResponse = await axios.get(`${API}/virtual-pets`);
        setVirtualPets(petsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to connect to ThriveRemote systems:", error);
        setLoading(false);
      }
    };

    fetchSystemData();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Get next Z-index for window layering
  const getNextZIndex = () => {
    return Math.max(...windows.map(w => w.zIndex || 100), 100) + 1;
  };

  const createWindow = (id, title, content, icon = "🖥️", size = { width: 210, height: 140 }) => {
    sounds.playWindowOpen();
    
    // Use mobile-responsive sizing
    const finalSize = getMobileWindowSize(size.width, size.height);
    
    const newWindow = {
      id,
      title,
      content,
      icon,
      size: finalSize,
      // Mobile-optimized positioning - ensure windows are visible
      position: isMobile ? { 
        x: 0, 
        y: 28 // Account for news ticker
      } : {
        x: Math.max(0, (window.innerWidth - finalSize.width) / 2),
        y: Math.max(0, (window.innerHeight - finalSize.height) / 2)
      },
      zIndex: getNextZIndex(),
      isMinimized: false,
      isMaximized: isMobile // Auto-maximize on mobile for full visibility
    };

    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    sounds.playWindowClose();
    // Add closing animation class
    const windowElement = document.querySelector(`[data-window-id="${id}"]`);
    if (windowElement) {
      windowElement.classList.add('closing');
      setTimeout(() => {
        setWindows(windows.filter(w => w.id !== id));
      }, 400);
    } else {
      setWindows(windows.filter(w => w.id !== id));
    }
  };

  const minimizeWindow = (id) => {
    sounds.playClick();
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const maximizeWindow = (id) => {
    sounds.playClick();
    setWindows(windows.map(w => 
      w.id === id ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        previousPosition: w.isMaximized ? w.previousPosition : w.position,
        previousSize: w.isMaximized ? w.previousSize : w.size,
        position: w.isMaximized ? (w.previousPosition || w.position) : { x: 0, y: 0 },
        size: w.isMaximized ? (w.previousSize || w.size) : { width: window.innerWidth, height: window.innerHeight - 60 }
      } : w
    ));
  };

  const bringToFront = (id) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex));
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: maxZ + 1 } : w
    ));
  };

  // Enhanced desktop icon click handler with animations and mobile support
  const handleIconClick = (title, icon, componentName, width = 245, height = 175) => {
    sounds.playClick();
    
    // Mobile-responsive sizing
    const finalSize = getMobileWindowSize(width, height);
    
    // Component mapping with all working applications
    const componentMap = {
      'AIJobLinksPortal': <AIJobLinksPortal />,
      'WaitressJobPortal': <WaitressJobPortal />,
      'RelocateMeIntegration': <RelocateMeIntegration />,
      'ProfessionalDownloadManager': <ProfessionalDownloadManager />,
      'ProfessionalWeatherWidget': <ProfessionalWeatherWidget />,
      'VaultApp': <VaultApp />,
      'NotepadApp': <NotepadApp />,
      'QuantumTerminal': <QuantumTerminal />,
      'ProfessionalSettings': <ProfessionalSettings />,
      'CalculatorApp': <CalculatorApp />,
      'SystemStatusApp': <SystemStatusApp />,
      'CompactCMS': <CompactCMS />,
      'UsefulLinks': <UsefulLinks />,
      // Entertainment components removed media player as per user request
      'VirtualPetsHub': (
        <div className="virtual-pets-container">
          <h3>🐾 Virtual Companions</h3>
          <p>AI-powered desktop pets for entertainment while working</p>
          <div className="pets-buttons">
            <a href="/virtual-pets-tool/" target="_blank" rel="noopener noreferrer" className="pet-btn">
              🥚 Cosmic Pets Game
            </a>
            <a href="/virtual-desktop-pets/" target="_blank" rel="noopener noreferrer" className="pet-btn">
              🐾 Desktop Pets
            </a>
          </div>
        </div>
      )
    };
    
    const component = componentMap[componentName] || (
      <div style={{padding: '20px', textAlign: 'center', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', color: '#495057'}}>
        <h3>🚀 Coming Soon</h3>
        <p>This application is under development</p>
      </div>
    );
    
    const newWindow = {
      id: Date.now(),
      title,
      icon,
      content: component,
      position: { 
        x: Math.random() * (window.innerWidth - width - 100) + 50, 
        y: Math.random() * (window.innerHeight - height - 150) + 80 
      },
      size: { width, height },
      isMinimized: false,
      isMaximized: false,
      zIndex: 100 + windows.length
    };

    setWindows([...windows, newWindow]);
  };

  if (!bootComplete) {
    return <CompactSleekLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`desktop-environment ${isMobile ? 'mobile-mode' : ''}`} onContextMenu={handleRightClick}>
      {/* Professional News Ticker */}
      <LuxuryNewsTicker />

      {/* Desktop Background */}
      <div className="desktop-wallpaper"></div>

      {/* Enhanced Desktop Icons with Sound Effects */}
      <SleekDesktopIcons 
        onIconClick={handleIconClick} 
        sounds={sounds} 
      />

      {/* Right-Click Context Menu */}
      {rightClickMenu.show && (
        <div 
          className="context-menu"
          style={{
            left: rightClickMenu.x,
            top: rightClickMenu.y,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item" onClick={() => { 
            handleIconClick('AI Job Links Portal', '🤖', 'AIJobLinksPortal', 420, 315); 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
          }}>
            <span>🤖</span>AI Job Links Portal
          </div>
          <div className="context-menu-item" onClick={() => { 
            handleIconClick('Useful Links', '🔗', 'UsefulLinks', 350, 280); 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
          }}>
            <span>🔗</span>Useful Links
          </div>
          <div className="context-menu-item" onClick={() => { 
            handleIconClick('Virtual Pets', '🐾', 'VirtualPetsHub', 245, 175); 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
          }}>
            <span>🐾</span>Virtual Pets
          </div>
          <div className="context-menu-item" onClick={() => { 
            handleIconClick('System Status', '📊', 'SystemStatusApp', 350, 245); 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
          }}>
            <span>📊</span>System Status
          </div>
          <div className="context-menu-item" onClick={() => { 
            handleIconClick('Calculator', '🧮', 'CalculatorApp', 210, 280); 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
          }}>
            <span>🧮</span>Calculator
          </div>
          <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--border-light)' }} />
          <div className="context-menu-item" onClick={() => { 
            setRightClickMenu({ show: false, x: 0, y: 0 }); 
            window.location.reload();
          }}>
            <span>🔄</span>Refresh Desktop
          </div>
        </div>
      )}

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onBringToFront={() => bringToFront(window.id)}
          onMove={(newPosition) => {
            setWindows(windows.map(w => 
              w.id === window.id ? { ...w, position: newPosition } : w
            ));
          }}
          onResize={(newSize) => {
            setWindows(windows.map(w => 
              w.id === window.id ? { ...w, size: newSize } : w
            ));
          }}
        />
      ))}

      {/* Sophisticated Taskbar */}
      <div className="taskbar">
        <div className="start-menu-container">
          <button 
            className="start-button"
            onClick={() => {
              sounds.playHover();
              setShowStartMenu(!showStartMenu);
            }}
          >
            <span className="start-icon">🤖</span>
            <span className="start-text">ThriveOS v5.5</span>
          </button>
          
          {showStartMenu && (
            <div className="start-menu startMenuOpen">
              <div className="start-menu-header">
                <div className="start-menu-title">ThriveRemoteOS V5.5</div>
                <div className="start-menu-subtitle">AI Job Entertainment Platform</div>
              </div>
              
              <div className="start-menu-section">
                <div className="section-title">🤖 AI Job Entertainment</div>
                <div className="menu-item fadeInUp" onClick={() => { 
                  handleIconClick('AI Job Links Portal', '🤖', 'AIJobLinksPortal', 420, 315); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🤖</span>AI Job Links Portal
                </div>
                <div className="menu-item fadeInUp animate-delay-100" onClick={() => { 
                  handleIconClick('AI Career Portal', '🎭', 'WaitressJobPortal', 350, 245); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🎭</span>AI Career Portal
                </div>
                <div className="menu-item fadeInUp animate-delay-200" onClick={() => { 
                  handleIconClick('Useful Links', '🔗', 'UsefulLinks', 350, 280); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🔗</span>Useful Links
                </div>
                <div className="menu-item fadeInUp animate-delay-300" onClick={() => { 
                  handleIconClick('Content Manager', '📝', 'CompactCMS', 300, 245); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">📝</span>Content Manager
                </div>
                <div className="menu-item fadeInUp animate-delay-400" onClick={() => { 
                  handleIconClick('Calculator', '🧮', 'CalculatorApp', 210, 280); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🧮</span>Calculator
                </div>
                <div className="menu-item fadeInUp animate-delay-500" onClick={() => { 
                  handleIconClick('System Status', '📊', 'SystemStatusApp', 350, 245); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">📊</span>System Status
                </div>
              </div>
              
              <div className="start-menu-section">
                <div className="section-title">🎵 Entertainment</div>
                <div className="menu-item" onClick={() => { 
                  handleIconClick('Virtual Pets Hub', '🐾', 'VirtualPetsHub', 245, 175); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🐾</span>Virtual Pets Hub
                </div>
                <div className="menu-item" onClick={() => { 
                  handleIconClick('Text Atelier', 'edit_note', <NotepadApp />, 245, 175); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">📝</span>Text Atelier
                </div>
                <div className="menu-item" onClick={() => { 
                  handleIconClick('File Vault', 'folder_open', <VaultApp />, 245, 175); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">📁</span>File Vault
                </div>
              </div>
              
              <div className="start-menu-section">
                <div className="section-title">🔧 System</div>
                <div className="menu-item" onClick={() => { 
                  handleIconClick('System Settings', 'settings', <ProfessionalSettings />, 350, 280); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">⚙️</span>System Settings
                </div>
                <div className="menu-item" onClick={() => { 
                  handleIconClick('Achievements', 'emoji_events', <AchievementsPanel />); 
                  setShowStartMenu(false); 
                }}>
                  <span className="menu-icon">🏆</span>Achievements
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="taskbar-windows">
          {windows.map(window => (
            <div 
              key={window.id}
              className={`taskbar-window ${window.isMinimized ? 'minimized' : ''}`}
              onClick={() => minimizeWindow(window.id)}
            >
              <span className="taskbar-icon">{window.icon}</span>
              <span className="taskbar-title">{window.title}</span>
            </div>
          ))}
        </div>

        <div className="system-tray">
          <div className="tray-item">
            <span className="tray-icon">🔋</span>
            <span className="tray-text">98%</span>
          </div>
          <div className="tray-item">
            <span className="tray-icon">📶</span>
          </div>
          <div className="clock">
            <div className="time">{currentTime.toLocaleTimeString()}</div>
            <div className="date">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Click outside to close start menu */}
      {showStartMenu && (
        <div className="start-menu-overlay" onClick={() => setShowStartMenu(false)}></div>
      )}
    </div>
  );
};

// Window Component with enhanced functionality and animations
const Window = ({ window, onClose, onMinimize, onMaximize, onBringToFront, onMove, onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('window-title') || e.target.classList.contains('window-header')) {
      if (!window.isMaximized) {
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - window.position.x,
          y: e.clientY - window.position.y
        });
        onBringToFront();
      }
    }
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    if (!window.isMaximized) {
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: window.size.width,
        height: window.size.height
      });
      onBringToFront();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !window.isMaximized) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep window within screen bounds
      const maxX = window.innerWidth - window.size.width;
      const maxY = window.innerHeight - window.size.height - 60; // Account for taskbar
      
      onMove({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isResizing && !window.isMaximized) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(300, resizeStart.width + deltaX);
      const newHeight = Math.max(200, resizeStart.height + deltaY);
      
      // Keep within screen bounds
      const maxWidth = window.innerWidth - window.position.x;
      const maxHeight = window.innerHeight - window.position.y - 60;
      
      onResize({
        width: Math.min(newWidth, maxWidth),
        height: Math.min(newHeight, maxHeight)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDoubleClick = (e) => {
    if (e.target.classList.contains('window-title') || e.target.classList.contains('window-header')) {
      onMaximize();
    }
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, window.isMaximized, window.size, window.position]);

  if (window.isMinimized) {
    return null;
  }

  return (
    <div
      className={`window glassmorphism ${window.isMaximized ? 'maximized' : ''} windowOpenAnimation`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      }}
      onClick={onBringToFront}
      data-window-id={window.id}
    >
      <div 
        className="window-header" 
        onMouseDown={isMobile ? undefined : handleMouseDown}
        onDoubleClick={isMobile ? undefined : handleDoubleClick}
        style={{ cursor: isMobile ? 'default' : 'move' }}
      >
        <div className="window-title">
          <span className="window-icon">{window.icon}</span>
          {window.title}
        </div>
        <div className="window-controls">
          <button 
            className="window-control minimize hoverBounce" 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            −
          </button>
          <button 
            className="window-control maximize hoverBounce" 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            {window.isMaximized ? '❐' : '□'}
          </button>
          <button 
            className="window-control close hoverBounce" 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="window-content">
        <div className="window-content-inner fadeInUp">
          {window.content}
        </div>
      </div>
      {!window.isMaximized && (
        <div 
          className="window-resize-handle"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
};

// Window Content Components
const AIToolsDashboard = () => {
  const [aiTools, setAITools] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="app-content">
        <h3>🤖 Loading AI Tools Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h3>🤖 AI Tools Dashboard</h3>
      <p className="stats-summary">
        <strong>{aiTools?.total_tools || 120}+ AI Tools</strong> across <strong>{aiTools?.total_categories || 12} Categories</strong>
      </p>
      
      <div className="ai-tools-grid">
        {Object.entries(aiTools?.categories || {}).map(([key, category]) => (
          <div key={key} className="tool-category">
            <h4>{category.name} ({category.count} tools)</h4>
            <div className="tools-list">
              {category.tools?.slice(0, 3).map((tool, index) => (
                <div key={index} className="tool-item">
                  <strong>{tool.name}</strong>
                  <p>{tool.description}</p>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-link">
                    Visit Tool →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="featured-tools">
        <h4>🌟 Featured Tools</h4>
        <div className="featured-grid">
          {aiTools?.featured_tools?.map((tool, index) => (
            <div key={index} className="featured-tool">
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LiveJobsPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relocateOpportunities, setRelocateOpportunities] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch regular jobs
        const jobsResponse = await axios.get(`${API}/jobs/live`);
        setJobs(jobsResponse.data.jobs || []);

        // Fetch RelocateMe opportunities
        try {
          const relocateResponse = await axios.get(`${API}/relocateme/opportunities`);
          if (relocateResponse.data.success) {
            setRelocateOpportunities(relocateResponse.data.opportunities || []);
          }
        } catch (relocateError) {
          console.warn('RelocateMe API not available:', relocateError);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="app-content">
        <h3>💼 Loading Live Jobs & Global Opportunities...</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            border: '2px solid var(--warm-gold)', 
            borderTop: '2px solid transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }}></div>
          <span>Connecting to global job networks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h3>💼 Live Job Listings & Global Opportunities</h3>
      
      {/* Stats Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div className="stat-card">
          <h4>Remote Jobs</h4>
          <div className="stat-value">{jobs.length}</div>
        </div>
        <div className="stat-card">
          <h4>Relocation Ops</h4>
          <div className="stat-value">{relocateOpportunities.length}</div>
        </div>
        <div className="stat-card">
          <h4>Countries</h4>
          <div className="stat-value">15+</div>
        </div>
        <div className="stat-card">
          <h4>Visa Support</h4>
          <div className="stat-value">{relocateOpportunities.filter(r => r.relocation_package?.visa_support).length}</div>
        </div>
      </div>

      {/* RelocateMe Opportunities Section */}
      {relocateOpportunities.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ color: 'var(--warm-gold)', marginBottom: '15px' }}>
            🌍 Global Relocation Opportunities (RelocateMe)
          </h4>
          <div className="jobs-list">
            {relocateOpportunities.slice(0, 3).map((opportunity, index) => (
              <div key={opportunity.id} className="job-item" style={{
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05), rgba(212, 175, 55, 0.05))',
                border: '2px solid rgba(33, 150, 243, 0.2)'
              }}>
                <div className="job-header">
                  <h4>{opportunity.title}</h4>
                  <span className="job-salary">{opportunity.salary}</span>
                </div>
                <div className="job-details">
                  <p><strong>{opportunity.company}</strong> • 🌍 {opportunity.location}</p>
                  <div style={{ margin: '10px 0' }}>
                    <span style={{
                      background: 'rgba(76, 175, 80, 0.2)',
                      color: '#4CAF50',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      marginRight: '8px'
                    }}>
                      ✈️ Visa Support
                    </span>
                    <span style={{
                      background: 'rgba(33, 150, 243, 0.2)',
                      color: '#2196F3',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      marginRight: '8px'
                    }}>
                      🏠 {opportunity.relocation_package?.temporary_housing}
                    </span>
                    <span style={{
                      background: 'rgba(255, 152, 0, 0.2)',
                      color: '#FF9800',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      💰 {opportunity.relocation_package?.moving_allowance}
                    </span>
                  </div>
                  <div className="job-skills">
                    {opportunity.requirements?.slice(0, 3).map((req, reqIndex) => (
                      <span key={reqIndex} className="skill-tag">{req}</span>
                    ))}
                  </div>
                </div>
                <div className="job-actions">
                  <button 
                    className="apply-btn"
                    onClick={() => {
                      // Open RelocateMe component in new window
                      window.open('#', '_blank');
                    }}
                  >
                    🌍 Apply via RelocateMe →
                  </button>
                  <span className="job-source">RelocateMe • Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Jobs Section */}
      <h4 style={{ color: 'var(--warm-gold)', marginBottom: '15px' }}>
        💼 Remote Job Opportunities
      </h4>
      <p className="stats-summary">
        <strong>{jobs.length} opportunities</strong> available now from multiple sources
      </p>
      
      <div className="jobs-list">
        {jobs.slice(0, 12).map((job, index) => (
          <div key={job.id || index} className="job-item">
            <div className="job-header">
              <h4>{job.title}</h4>
              <span className="job-salary">{job.salary || 'Competitive'}</span>
            </div>
            <div className="job-details">
              <p><strong>{job.company}</strong> • {job.location}</p>
              <p>{job.description}</p>
              <div className="job-skills">
                {(job.skills || []).slice(0, 4).map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="job-actions">
              <a 
                href={job.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="apply-btn"
              >
                Apply Now →
              </a>
              <span className="job-source">{job.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {jobs.length > 12 && (
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button 
            className="luxury-btn"
            onClick={() => {
              // In a real app, this would load more jobs
              alert('Loading more opportunities...');
            }}
          >
            📋 Load More Opportunities
          </button>
        </div>
      )}
    </div>
  );
};

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/dashboard/stats`);
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="app-content">
        <h3>📊 Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h3>📊 User Dashboard</h3>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Job Applications</h4>
          <div className="stat-value">{stats?.total_applications || 0}</div>
        </div>
        <div className="stat-card">
          <h4>Tasks Completed</h4>
          <div className="stat-value">{stats?.tasks_completed_today || 0}</div>
        </div>
        <div className="stat-card">
          <h4>Daily Streak</h4>
          <div className="stat-value">{stats?.daily_streak || 1} days</div>
        </div>
        <div className="stat-card">
          <h4>Productivity Score</h4>
          <div className="stat-value">{stats?.productivity_score || 0}</div>
        </div>
        <div className="stat-card">
          <h4>Achievements</h4>
          <div className="stat-value">{stats?.achievements_unlocked || 0}</div>
        </div>
        <div className="stat-card">
          <h4>Savings Progress</h4>
          <div className="stat-value">{Math.round(stats?.savings_progress || 0)}%</div>
        </div>
      </div>
    </div>
  );
};

const AchievementsPanel = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API}/achievements`);
        setAchievements(response.data.achievements || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="app-content">
        <h3>🏆 Loading Achievements...</h3>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h3>🏆 Achievements</h3>
      
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div key={index} className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-info">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              {achievement.unlocked && (
                <span className="unlock-date">
                  Unlocked: {new Date(achievement.unlock_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemSettings = () => (
  <div className="app-content">
    <h3>⚙️ Basic System Settings</h3>
    <div className="settings-sections">
      <div className="setting-group">
        <h4>🎨 Appearance</h4>
        <div className="setting-item">
          <label>Theme: </label>
          <select defaultValue="noir-gold-luxury">
            <option value="noir-gold-luxury">Noir-Gold Luxury</option>
            <option value="dark-elegance">Dark Elegance</option>
            <option value="champagne-dreams">Champagne Dreams</option>
          </select>
        </div>
      </div>
      <div className="setting-group">
        <h4>🔧 System</h4>
        <div className="setting-item">
          <label>Auto-refresh jobs: </label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <label>Enable sound effects: </label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <label>Enable music player: </label>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
    <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--warm-gold)' }}>
        💡 For advanced settings with functional theme changer and enhanced controls, use the Enhanced Settings from the desktop icon.
      </p>
    </div>
  </div>
);

// Desktop Environment Component
function DesktopEnvironment() {
  const [rightClickMenu, setRightClickMenu] = useState({ show: false, x: 0, y: 0 });
  const [bootComplete, setBootComplete] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Loading completion handler
  const handleLoadingComplete = () => {
    // Apply saved theme settings
    const savedSettings = localStorage.getItem('thriveRemoteSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      // Apply theme immediately
      const root = document.documentElement;
      
      // Apply saved theme
      if (settings.theme) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('applyTheme', { 
            detail: { theme: settings.theme, settings } 
          }));
        }, 100);
      }
      
      // Apply other settings
      if (settings.fontSize) {
        document.body.classList.add(`font-${settings.fontSize}`);
      }
      
      if (settings.darkMode) {
        document.body.classList.add('dark-mode');
      }
      
      if (settings.highContrast) {
        document.body.classList.add('high-contrast');
      }
    }
    
    setBootComplete(true);
  };

  // Right-click context menu handler
  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
    setShowStartMenu(false);
  };

  // Close context menu when clicking elsewhere
  const handleClick = (e) => {
    if (rightClickMenu.show) {
      setRightClickMenu({ show: false, x: 0, y: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [rightClickMenu.show]);

  if (!bootComplete) {
    return <CompactSleekLoader onComplete={handleLoadingComplete} />;
  }

  return <ThriveRemoteDesktop />;
}

function App() {
  return (
    <div className="App">
      <SoundProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DesktopEnvironment />} />
            <Route path="/waitress-job-portal" element={<WaitressJobPortal />} />
          </Routes>
        </BrowserRouter>
      </SoundProvider>
    </div>
  );
}

export default App;

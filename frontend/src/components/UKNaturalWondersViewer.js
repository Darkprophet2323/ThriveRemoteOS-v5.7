import React, { useState, useEffect } from 'react';

const UKNaturalWondersViewer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' or 'grid'

  const ukNaturalWonders = [
    {
      id: 1,
      title: "Giant's Causeway, Northern Ireland",
      description: "A UNESCO World Heritage site featuring thousands of interlocking basalt columns formed by ancient volcanic activity.",
      imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "County Antrim, Northern Ireland",
      category: "Geological Wonder"
    },
    {
      id: 2,
      title: "Durdle Door, Dorset",
      description: "A natural limestone arch on the Jurassic Coast, one of England's most photographed landmarks.",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      location: "Dorset, England",
      category: "Coastal Formation"
    },
    {
      id: 3,
      title: "Lake District, Cumbria",
      description: "England's largest national park featuring pristine lakes, rolling hills, and dramatic mountain scenery.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Cumbria, England",
      category: "Lake & Mountain"
    },
    {
      id: 4,
      title: "Isle of Skye, Scotland",
      description: "Dramatic landscapes featuring rugged mountains, medieval castles, and picturesque fishing villages.",
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      location: "Inner Hebrides, Scotland",
      category: "Highland Landscape"
    },
    {
      id: 5,
      title: "Snowdonia National Park, Wales",
      description: "Home to Wales' highest peak and spectacular mountain ranges with pristine lakes and ancient forests.",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
      location: "Gwynedd, Wales",
      category: "Mountain Range"
    },
    {
      id: 6,
      title: "Ben Nevis, Scotland",
      description: "The highest mountain in the British Isles, offering challenging climbs and breathtaking Highland views.",
      imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      location: "Scottish Highlands",
      category: "Mountain Peak"
    },
    {
      id: 7,
      title: "Cliffs of Dover, Kent",
      description: "Iconic white chalk cliffs rising 350 feet above the English Channel, symbolizing British heritage.",
      imageUrl: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Kent, England",
      category: "Coastal Cliffs"
    },
    {
      id: 8,
      title: "Loch Ness, Scotland",
      description: "A large, deep freshwater loch in the Scottish Highlands, famous for its mythical creature legends.",
      imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Scottish Highlands",
      category: "Highland Loch"
    },
    {
      id: 9,
      title: "Peak District, England",
      description: "Britain's first national park featuring moorlands, valleys, and traditional stone villages.",
      imageUrl: "https://images.unsplash.com/photo-1549492423-400259a2e574?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Derbyshire, England",
      category: "National Park"
    },
    {
      id: 10,
      title: "Fingal's Cave, Scotland",
      description: "A sea cave on the uninhabited island of Staffa, known for its natural acoustics and hexagonal columns.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Inner Hebrides, Scotland",
      category: "Sea Cave"
    },
    {
      id: 11,
      title: "Brecon Beacons, Wales",
      description: "A mountain range featuring waterfalls, caves, and some of the darkest skies in Wales for stargazing.",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
      location: "South Wales",
      category: "Mountain Range"
    },
    {
      id: 12,
      title: "Yorkshire Dales, England",
      description: "Rolling hills, dry stone walls, and traditional villages in one of England's most beloved landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      location: "Yorkshire, England",
      category: "Countryside"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === ukNaturalWonders.length - 1 ? 0 : prev + 1
        );
      }, 4000); // Change image every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, ukNaturalWonders.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === ukNaturalWonders.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? ukNaturalWonders.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const currentImage = ukNaturalWonders[currentImageIndex];

  if (viewMode === 'grid') {
    return (
      <div className="uk-viewer-container">
        <div className="viewer-header">
          <h3>🏔️ UK Natural Wonders Gallery</h3>
          <div className="viewer-controls">
            <button 
              className="control-btn" 
              onClick={() => setViewMode('slideshow')}
              title="Switch to Slideshow"
            >
              🖼️ Slideshow
            </button>
          </div>
        </div>
        
        <div className="grid-view">
          {ukNaturalWonders.map((wonder, index) => (
            <div 
              key={wonder.id} 
              className="grid-item"
              onClick={() => {
                setCurrentImageIndex(index);
                setViewMode('slideshow');
              }}
            >
              <img 
                src={wonder.imageUrl} 
                alt={wonder.title}
                className="grid-image"
              />
              <div className="grid-overlay">
                <h4>{wonder.title}</h4>
                <p>{wonder.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="uk-viewer-container">
      <div className="viewer-header">
        <h3>🏔️ UK Natural Wonders</h3>
        <div className="viewer-controls">
          <button 
            className="control-btn" 
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            ⊞ Grid
          </button>
          <button 
            className="control-btn" 
            onClick={togglePlayback}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      <div className="slideshow-container">
        <div className="main-image-container">
          <img 
            src={currentImage.imageUrl} 
            alt={currentImage.title}
            className="main-image"
          />
          
          <button className="nav-btn prev-btn" onClick={prevImage}>
            ‹
          </button>
          <button className="nav-btn next-btn" onClick={nextImage}>
            ›
          </button>

          <div className="image-overlay">
            <div className="image-info">
              <h4>{currentImage.title}</h4>
              <p className="description">{currentImage.description}</p>
              <div className="meta-info">
                <span className="location">📍 {currentImage.location}</span>
                <span className="category">🏷️ {currentImage.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((currentImageIndex + 1) / ukNaturalWonders.length) * 100}%`,
              transition: isPlaying ? 'width 4s linear' : 'width 0.3s ease'
            }}
          />
        </div>

        <div className="thumbnail-strip">
          {ukNaturalWonders.map((wonder, index) => (
            <div
              key={wonder.id}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            >
              <img 
                src={wonder.imageUrl} 
                alt={wonder.title}
                className="thumbnail-image"
              />
              <div className="thumbnail-title">{wonder.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="viewer-info">
        <div className="current-info">
          <span>{currentImageIndex + 1} of {ukNaturalWonders.length}</span>
          <span>🎭 {isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
      </div>
    </div>
  );
};

export default UKNaturalWondersViewer;
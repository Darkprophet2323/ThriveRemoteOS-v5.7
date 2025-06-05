import React, { useState, useRef, useEffect } from 'react';

const MediaPlayerApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const playlist = [
    {
      title: "Noir Nights",
      artist: "Sophisticated Beats",
      album: "Luxury Collection",
      duration: "4:23",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      title: "Golden Hour",
      artist: "Ambient Noir",
      album: "Fashion Week",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      title: "Champagne Dreams",
      artist: "Luxe Vibes",
      album: "High Fashion",
      duration: "5:12",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (direction) => {
    let newTrack = currentTrack + direction;
    if (newTrack < 0) newTrack = playlist.length - 1;
    if (newTrack >= playlist.length) newTrack = 0;
    setCurrentTrack(newTrack);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const track = playlist[currentTrack];

  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #0D0D0D, #2D2D2D)',
      color: '#D4AF37',
      height: '100%',
      overflow: 'hidden'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        ▶️ ThriveOS Media Player
      </h3>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        onEnded={() => changeTrack(1)}
      />

      {/* Album Cover */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <img
          src={track.cover}
          alt={track.title}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '15px',
            border: '3px solid #D4AF37',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Track Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '5px 0', color: '#D4AF37' }}>{track.title}</h4>
        <p style={{ margin: '5px 0', color: '#ccc' }}>{track.artist}</p>
        <p style={{ margin: '5px 0', color: '#888', fontSize: '0.9rem' }}>{track.album}</p>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: '15px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          marginBottom: '5px'
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          style={{
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={handleSeek}
        >
          <div style={{
            width: `${(currentTime / duration) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #D4AF37, #F4D03F)',
            borderRadius: '3px'
          }} />
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => changeTrack(-1)}
          style={{
            background: 'rgba(212, 175, 55, 0.2)',
            border: '2px solid #D4AF37',
            color: '#D4AF37',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ⏮️
        </button>
        
        <button
          onClick={togglePlayPause}
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
            border: 'none',
            color: '#000',
            padding: '15px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            minWidth: '50px'
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button
          onClick={() => changeTrack(1)}
          style={{
            background: 'rgba(212, 175, 55, 0.2)',
            border: '2px solid #D4AF37',
            color: '#D4AF37',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ⏭️
        </button>
      </div>

      {/* Volume Control */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <span style={{ fontSize: '0.9rem' }}>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            flex: 1,
            height: '4px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px'
          }}
        />
        <span style={{ fontSize: '0.8rem', minWidth: '30px' }}>
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Playlist */}
      <div style={{
        maxHeight: '100px',
        overflowY: 'auto'
      }}>
        <h5 style={{ color: '#D4AF37', marginBottom: '10px' }}>Playlist:</h5>
        {playlist.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrack(index)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '5px',
              background: index === currentTrack ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              marginBottom: '5px',
              fontSize: '0.8rem',
              border: index === currentTrack ? '1px solid #D4AF37' : '1px solid transparent'
            }}
          >
            {index + 1}. {item.title} - {item.artist}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPlayerApp;
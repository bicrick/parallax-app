import React, { useEffect, createContext, useContext, useState } from 'react';
import './App.css';

const SceneContext = createContext();
const ThemeContext = createContext();

export function useScene() {
  return useContext(SceneContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

const themes = {
  // Nature themes
  1: {
    name: 'light',
    colors: {
      background: '#87ceeb',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#2f3542',
      accent: '#4834d4',
      border: '#2f3542',
      buttonBg: '#e3f2fd',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(0, 0, 0, 0.3)'
    }
  },
  2: {
    name: 'warm',
    colors: {
      background: '#ffd6a5',
      cardBg: 'rgba(255, 250, 245, 0.95)',
      text: '#4a4037',
      accent: '#ff7e67',
      border: '#4a4037',
      buttonBg: '#fff1e6',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(74, 64, 55, 0.3)'
    }
  },
  3: {
    name: 'sunset',
    colors: {
      background: '#ff9a9e',
      cardBg: 'rgba(255, 245, 245, 0.95)',
      text: '#433455',
      accent: '#a18cd1',
      border: '#433455',
      buttonBg: '#fef6f6',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(67, 52, 85, 0.3)'
    }
  },
  4: {
    name: 'forest',
    colors: {
      background: '#2f4858',
      cardBg: 'rgba(240, 245, 240, 0.95)',
      text: '#1a2634',
      accent: '#86c232',
      border: '#1a2634',
      buttonBg: '#e8f3e8',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(26, 38, 52, 0.3)'
    }
  },
  5: {
    name: 'flower',
    colors: {
      background: '#ff9ecd',
      cardBg: 'rgba(255, 245, 250, 0.95)',
      text: '#2d1b24',
      accent: '#ff4d94',
      border: '#2d1b24',
      buttonBg: '#ffebf4',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(45, 27, 36, 0.3)'
    }
  },
  6: {
    name: 'night',
    colors: {
      background: '#1a1a2e',
      cardBg: 'rgba(20, 20, 35, 0.95)',
      text: '#ffffff',
      accent: '#9d4edd',
      border: '#9d4edd',
      buttonBg: 'rgba(157, 78, 221, 0.1)',
      buttonHoverBg: 'rgba(157, 78, 221, 0.2)',
      shadow: 'rgba(157, 78, 221, 0.2)'
    }
  },
  // Ocean themes
  'ocean1': {
    name: 'bright-ocean',
    colors: {
      background: '#87ceeb',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#1e3a5f',
      accent: '#2196f3',
      border: '#1e3a5f',
      buttonBg: '#e3f2fd',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(30, 58, 95, 0.3)'
    }
  },
  'ocean2': {
    name: 'sunset-ocean',
    colors: {
      background: '#ff7043',
      cardBg: 'rgba(255, 245, 238, 0.95)',
      text: '#4a2c2a',
      accent: '#ff5722',
      border: '#4a2c2a',
      buttonBg: '#fff3e0',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(74, 44, 42, 0.3)'
    }
  },
  'ocean3': {
    name: 'tropical-ocean',
    colors: {
      background: '#26c6da',
      cardBg: 'rgba(240, 253, 255, 0.95)',
      text: '#006064',
      accent: '#00bcd4',
      border: '#006064',
      buttonBg: '#e0f7fa',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(0, 96, 100, 0.3)'
    }
  },
  'ocean4': {
    name: 'evening-ocean',
    colors: {
      background: '#5c6bc0',
      cardBg: 'rgba(245, 245, 255, 0.95)',
      text: '#283593',
      accent: '#3f51b5',
      border: '#283593',
      buttonBg: '#e8eaf6',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(40, 53, 147, 0.3)'
    }
  },
  'ocean5': {
    name: 'moonlit-ocean',
    colors: {
      background: '#1a237e',
      cardBg: 'rgba(30, 30, 50, 0.95)',
      text: '#ffffff',
      accent: '#7986cb',
      border: '#7986cb',
      buttonBg: 'rgba(121, 134, 203, 0.1)',
      buttonHoverBg: 'rgba(121, 134, 203, 0.2)',
      shadow: 'rgba(121, 134, 203, 0.2)'
    }
  },
  'ocean6': {
    name: 'stormy-ocean',
    colors: {
      background: '#455a64',
      cardBg: 'rgba(240, 240, 240, 0.95)',
      text: '#263238',
      accent: '#607d8b',
      border: '#263238',
      buttonBg: '#eceff1',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(38, 50, 56, 0.3)'
    }
  },
  'ocean7': {
    name: 'golden-ocean',
    colors: {
      background: '#ffb74d',
      cardBg: 'rgba(255, 252, 245, 0.95)',
      text: '#e65100',
      accent: '#ff9800',
      border: '#e65100',
      buttonBg: '#fff8e1',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(230, 81, 0, 0.3)'
    }
  },
  'ocean8': {
    name: 'misty-ocean',
    colors: {
      background: '#90a4ae',
      cardBg: 'rgba(250, 250, 250, 0.95)',
      text: '#37474f',
      accent: '#546e7a',
      border: '#37474f',
      buttonBg: '#f5f5f5',
      buttonHoverBg: '#ffffff',
      shadow: 'rgba(55, 71, 79, 0.3)'
    }
  }
};


function ParallaxBackground({ scrollSpeedMultiplier = 1 }) {
  const { currentScene } = useScene();
  const [scenes, setScenes] = useState({
    current: {
      layers: [],
      state: 'entering'
    },
    previous: null
  });

  useEffect(() => {
    const loadScene = async () => {
      try {
        const sceneNumber = currentScene?.id;
        if (!sceneNumber) return;

        // Handle both nature and ocean scenes
        if (typeof sceneNumber === 'string' && sceneNumber.startsWith('ocean')) {
          const oceanNumber = sceneNumber.replace('ocean', '');
          const oceanLayerNumbers = {
            '1': [1, 2, 3, 4],
            '2': [2, 3, 4, 5],
            '3': [1, 2, 3, 4, 5],
            '4': [1, 2, 3, 4, 5],
            '5': [1, 2, 3, 4, 5],
            '6': [1, 2, 3, 4, 5],
            '7': [1, 2, 3, 4, 5, 6],
            '8': [1, 2, 3, 4, 5, 6]
          };

          const newLayers = oceanLayerNumbers[oceanNumber].map(num => ({
            number: num,
            path: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_${oceanNumber}/${num}.png`
          }));

          setScenes(prev => ({
            current: {
              layers: newLayers,
              state: 'entering'
            },
            previous: prev.current.layers.length ? {
              layers: prev.current.layers,
              state: 'exiting'
            } : null
          }));
        } else {
          // Nature scenes
          const layerNumbers = {
            1: [1, 2, 3, 5, 6, 7, 8], // Lake Meadow
            2: [1, 2, 3, 4], // Grasslands
            3: [1, 2, 3, 4], // Mountain
            4: [1, 2, 3, 4], // Forested Meadow
            5: [1, 2, 3, 4, 5], // Flower Meadow
            6: [1, 2, 3], // Northern Lights
          };

          const newLayers = layerNumbers[sceneNumber].map(num => ({
            number: num,
            path: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_${sceneNumber}/${num}.png`
          }));

          setScenes(prev => ({
            current: {
              layers: newLayers,
              state: 'entering'
            },
            previous: prev.current.layers.length ? {
              layers: prev.current.layers,
              state: 'exiting'
            } : null
          }));
        }

        // Activate new scene after a short delay to ensure CSS transitions work
        const activateTimeout = setTimeout(() => {
          setScenes(prev => ({
            current: {
              ...prev.current,
              state: 'active'
            },
            previous: prev.previous
          }));
        }, 50);

        // Clean up old scene after transition completes
        const cleanup = setTimeout(() => {
          setScenes(prev => ({
            current: prev.current,
            previous: null
          }));
        }, 1500);

        return () => {
          clearTimeout(activateTimeout);
          clearTimeout(cleanup);
        };
      } catch (error) {
        console.error('Error loading scene:', error);
      }
    };

    loadScene();
  }, [currentScene]);

  const renderScene = (scene, key) => {
    // Determine if we should use slower speeds based on scene type
    const useSlowerSpeeds = currentScene?.id === 1 || 
                           (typeof currentScene?.id === 'string' && currentScene?.id.startsWith('ocean'));
    
    return (
      <div key={key} className={`scene ${scene.state}`}>
        {scene.layers.map((layer, index) => (
          <div
            key={`${key}-${layer.number}`}
            className={`parallax-layer layer-${layer.number}`}
            style={{ 
              backgroundImage: `url("${layer.path}")`,
              animationDuration: `${(200 - (index * 30)) / (useSlowerSpeeds ? 0.2 : 1)}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="parallax-container">
      {scenes.previous && renderScene(scenes.previous, 'previous')}
      {renderScene(scenes.current, 'current')}
    </div>
  );
}



function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // TODO: Integrate with AI API
    setTimeout(() => {
      setIsGenerating(false);
      // Placeholder for now
      alert('AI generation coming soon! Your prompt: ' + prompt);
    }, 2000);
  };

  return (
    <div className="App">
      <div className="container" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div className="modern-prompt-container">
          <div className="prompt-input-wrapper">
            <input
              type="text"
              className="modern-prompt-input"
              placeholder="Describe your perfect background..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button 
              className="modern-generate-button"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
            >
              {isGenerating ? (
                <div className="modern-spinner"></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Scene data
const natureScenes = [
  { id: 1, name: 'Lake Meadow', accent: '#4834d4', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_1/orig.png` },
  { id: 2, name: 'Warm', accent: '#ff7e67', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_2/orig.png` },
  { id: 3, name: 'Sunset', accent: '#a18cd1', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_3/orig.png` },
  { id: 4, name: 'Forest', accent: '#86c232', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_4/orig.png` },
  { id: 5, name: 'Flower', accent: '#ff4d94', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_5/orig.png` },
  { id: 6, name: 'Night', accent: '#9d4edd', thumbnail: `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_6/orig.png` },
];

const oceanScenes = [
  { id: 'ocean1', name: 'Bright Ocean', accent: '#2196f3', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_1/4.png` },
  { id: 'ocean2', name: 'Sunset Ocean', accent: '#ff5722', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_2/5.png` },
  { id: 'ocean3', name: 'Tropical Ocean', accent: '#00bcd4', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_3/5.png` },
  { id: 'ocean4', name: 'Evening Ocean', accent: '#3f51b5', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_4/5.png` },
  { id: 'ocean5', name: 'Moonlit Ocean', accent: '#7986cb', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_5/5.png` },
  { id: 'ocean6', name: 'Stormy Ocean', accent: '#607d8b', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_6/5.png` },
  { id: 'ocean7', name: 'Golden Ocean', accent: '#ff9800', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_7/6.png` },
  { id: 'ocean8', name: 'Misty Ocean', accent: '#546e7a', thumbnail: `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_8/6.png` },
];

const defaultScene = natureScenes[0]; // Lake Meadow

function SceneSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('nature');
  const { currentScene, setCurrentScene } = useScene();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.fab-scene-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSceneSelect = (scene) => {
    setCurrentScene(scene);
    setIsOpen(false);
  };

  const currentScenes = activeCategory === 'nature' ? natureScenes : oceanScenes;

  return (
    <div className="fab-scene-selector">
      {/* FAB Button */}
      <button 
        className={`fab-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close scene selector" : "Open scene selector"}
      >
        <div className="fab-icon">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </button>

      {/* Expandable Panel */}
      {isOpen && (
        <div className="fab-panel">
          <div className="fab-panel-header">
            <h3>Choose Background</h3>
            <div className="category-tabs">
              <button 
                className={`category-tab ${activeCategory === 'nature' ? 'active' : ''}`}
                onClick={() => setActiveCategory('nature')}
              >
                Nature
              </button>
              <button 
                className={`category-tab ${activeCategory === 'ocean' ? 'active' : ''}`}
                onClick={() => setActiveCategory('ocean')}
              >
                Ocean
              </button>
            </div>
          </div>
          
          <div className="scenes-grid">
            {currentScenes.map((scene) => (
              <button
                key={scene.id}
                className={`scene-option ${currentScene?.id === scene.id ? 'active' : ''}`}
                onClick={() => handleSceneSelect(scene)}
                title={scene.name}
              >
                <img 
                  src={scene.thumbnail} 
                  alt={scene.name}
                  className="scene-thumbnail"
                />
                <div className="scene-name">{scene.name}</div>
                {currentScene?.id === scene.id && (
                  <div className="active-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="modern-header">
      <div className="header-content">
        <div className="header-left">
          <img 
            src={`${process.env.PUBLIC_URL}/parallax-logo.png`} 
            alt="Parallax" 
            className="header-logo"
            onError={(e) => {
              console.error('Logo failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
          <div className="header-brand">
            <span className="brand-name">Parallax</span>
          </div>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#api" className="nav-link">API</a>
            <button className="get-started-btn">Get Started</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Layout({ children }) {
  const [currentScene, setCurrentScene] = useState(defaultScene);
  const theme = themes[currentScene?.id];

  useEffect(() => {
    // Update CSS variables when theme changes
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    }
  }, [theme]);

  return (
    <SceneContext.Provider value={{ currentScene, setCurrentScene }}>
      <ThemeContext.Provider value={theme}>
        <ParallaxBackground scrollSpeedMultiplier={1} />
        <Header />
        <SceneSelector />
        {children}
      </ThemeContext.Provider>
    </SceneContext.Provider>
  );
}

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;

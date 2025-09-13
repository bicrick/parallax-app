import React, { useEffect, createContext, useContext, useState, useCallback, useRef } from 'react';
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

// Simple streaming text hook - word by word with moving cursor
function useStreamingText(text, delay = 0, wordDelay = 200) {
  const [visibleWordIndex, setVisibleWordIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  const words = text ? text.split(' ') : [];

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state
    setVisibleWordIndex(-1);
    setIsComplete(false);

    if (!text || words.length === 0) return;

    // Start animation after delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      
      const showNextWord = () => {
        if (currentIndex < words.length) {
          setVisibleWordIndex(currentIndex);
          currentIndex++;
          
          if (currentIndex < words.length) {
            timeoutRef.current = setTimeout(showNextWord, wordDelay);
          } else {
            setIsComplete(true);
          }
        }
      };
      
      showNextWord();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, wordDelay, words.length]);

  return { words, visibleWordIndex, isComplete };
}

// Simple streaming text component
function StreamingText({ text, delay = 0, wordDelay = 200, className = '', style = {} }) {
  const { words, visibleWordIndex } = useStreamingText(text, delay, wordDelay);
  
  return (
    <span className={className} style={style}>
      {words.map((word, index) => (
        <span 
          key={index} 
          className={`streaming-word ${index <= visibleWordIndex ? 'visible' : 'hidden'}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}


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
  const [ghostText, setGhostText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [textColors, setTextColors] = useState({
    title: 'rgba(255, 255, 255, 0.98)',
    subtitle: 'rgba(255, 255, 255, 0.7)',
    keyFeatures: '#ff6b35'
  });
  const { currentScene } = useScene();

  const ghostTexts = React.useMemo(() => [
    "A serene mountain landscape at sunset...",
    "Mystical forest with glowing fireflies...",
    "Underwater coral reef with tropical fish...",
    "Desert oasis with palm trees and camels...",
    "Northern lights over snowy mountains...",
    "Cherry blossom garden in spring...",
    "Futuristic cityscape at night..."
  ], []);

  // Image analysis for top third brightness detection
  const analyzeImageBrightness = useCallback(async (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas to match image size
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image to canvas
          ctx.drawImage(img, 0, 0);
          
          // Get image data for top third only
          const topThirdHeight = Math.floor(img.height / 3);
          const imageData = ctx.getImageData(0, 0, img.width, topThirdHeight);
          const pixels = imageData.data;
          
          let totalBrightness = 0;
          let pixelCount = 0;
          
          // Calculate average brightness of top third
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const alpha = pixels[i + 3];
            
            // Skip transparent pixels
            if (alpha > 0) {
              // Calculate luminance using standard formula
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
              totalBrightness += luminance;
              pixelCount++;
            }
          }
          
          const averageBrightness = totalBrightness / pixelCount;
          
          // Normalize to 0-1 range
          const normalizedBrightness = averageBrightness / 255;
          
          resolve({
            brightness: normalizedBrightness,
            isDark: normalizedBrightness < 0.5,
            isVeryDark: normalizedBrightness < 0.3,
            isLight: normalizedBrightness > 0.7,
            isVeryLight: normalizedBrightness > 0.85
          });
          
        } catch (error) {
          console.warn('Error analyzing image brightness:', error);
          // Default to medium brightness if analysis fails
          resolve({
            brightness: 0.5,
            isDark: false,
            isVeryDark: false,
            isLight: false,
            isVeryLight: false
          });
        }
      };
      
      img.onerror = () => {
        console.warn('Failed to load image for brightness analysis:', imagePath);
        resolve({
          brightness: 0.5,
          isDark: false,
          isVeryDark: false,
          isLight: false,
          isVeryLight: false
        });
      };
      
      img.src = imagePath;
    });
  }, []);

  // Intelligent color analysis based on actual image brightness
  const analyzeSceneColors = useCallback(async (scene) => {
    if (!scene) return;

    try {
      // Get the current scene's background image path
      let imagePath = '';
      
      if (typeof scene.id === 'string' && scene.id.startsWith('ocean')) {
        const oceanNumber = scene.id.replace('ocean', '');
        // Use the frontmost layer (highest number) for analysis
        const layerNumbers = {
          '1': 4, '2': 5, '3': 5, '4': 5, '5': 5, '6': 5, '7': 6, '8': 6
        };
        const layerNum = layerNumbers[oceanNumber] || 5;
        imagePath = `${process.env.PUBLIC_URL}/ocean-and-clouds-free-pixel-art-backgrounds/Ocean_${oceanNumber}/${layerNum}.png`;
      } else {
        // Nature scenes - use the frontmost layer
        const layerNumbers = {
          1: 8, // Use layer 8 for Lake Meadow
          2: 4, // Grasslands
          3: 4, // Mountain  
          4: 4, // Forested Meadow
          5: 5, // Flower Meadow
          6: 3  // Northern Lights
        };
        const layerNum = layerNumbers[scene.id] || 4;
        imagePath = `${process.env.PUBLIC_URL}/Nature Landscapes Free Pixel Art/nature_${scene.id}/${layerNum}.png`;
      }

      // Analyze the top third of the image
      const analysis = await analyzeImageBrightness(imagePath);
      
      // Determine text colors based on brightness analysis
      let newColors = { ...textColors };
      let shadowIntensity = 'medium';

      if (analysis.isVeryDark) {
        // Very dark backgrounds need bright white text with strong shadows
        newColors = {
          title: 'rgba(255, 255, 255, 0.98)',
          subtitle: 'rgba(255, 255, 255, 0.88)',
          keyFeatures: '#ff6b35'
        };
        shadowIntensity = 'strong';
      } else if (analysis.isDark) {
        // Dark backgrounds need bright text
        newColors = {
          title: 'rgba(255, 255, 255, 0.95)',
          subtitle: 'rgba(255, 255, 255, 0.82)',
          keyFeatures: '#ff6b35'
        };
        shadowIntensity = 'strong';
      } else if (analysis.isVeryLight) {
        // Very light backgrounds need dark text
        newColors = {
          title: 'rgba(0, 0, 0, 0.9)',
          subtitle: 'rgba(0, 0, 0, 0.7)',
          keyFeatures: '#d4491f'
        };
        shadowIntensity = 'light';
      } else if (analysis.isLight) {
        // Light backgrounds can use either dark or light text
        newColors = {
          title: 'rgba(0, 0, 0, 0.85)',
          subtitle: 'rgba(0, 0, 0, 0.68)',
          keyFeatures: '#c63e1f'
        };
        shadowIntensity = 'light';
      } else {
        // Medium brightness - default to white text with good shadows
        newColors = {
          title: 'rgba(255, 255, 255, 0.96)',
          subtitle: 'rgba(255, 255, 255, 0.78)',
          keyFeatures: '#ff6b35'
        };
        shadowIntensity = 'medium';
      }

      // Create adaptive shadows based on background brightness
      if (analysis.isVeryLight || analysis.isLight) {
        // Light backgrounds need subtle dark shadows
        newColors.textShadow = shadowIntensity === 'light' ? 
          '0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)' :
          '0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)';
        
        newColors.titleShadow = shadowIntensity === 'light' ?
          '0 1px 3px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4)' :
          '0 1px 4px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.5)';
      } else {
        // Dark backgrounds need strong black shadows with some blur
        newColors.textShadow = shadowIntensity === 'strong' ? 
          '0 0 4px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)' :
          '0 0 3px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)';
        
        newColors.titleShadow = shadowIntensity === 'strong' ?
          '0 0 6px rgba(0, 0, 0, 1), 0 0 12px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)' :
          '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 2px 6px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)';
      }

      setTextColors(newColors);
      
    } catch (error) {
      console.warn('Error in scene color analysis:', error);
      // Fallback to default styling
      setTextColors({
        title: 'rgba(255, 255, 255, 0.98)',
        subtitle: 'rgba(255, 255, 255, 0.8)',
        keyFeatures: '#ff6b35',
        textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6)',
        titleShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.7)'
      });
    }
  }, [analyzeImageBrightness, textColors]);

  // Typing ghost text effect - wait for title animations to complete
  useEffect(() => {
    if (prompt.length === 0) {
      // Calculate when title animations finish:
      // Main title: 500ms start + (4 words * 180ms) = ~1220ms
      // Subtitle: 1500ms start + (8 words * 150ms) = ~2700ms
      // Add 400ms buffer = ~3100ms total delay
      const ANIMATION_DELAY = 3100;
      
      let activeInterval = null;
      
      const startGhostAnimation = () => {
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        const typeText = () => {
          const currentText = ghostTexts[currentTextIndex];
          
          if (!isDeleting) {
            setGhostText(currentText.substring(0, currentCharIndex + 1));
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
              setTimeout(() => {
                isDeleting = true;
              }, 2000);
            }
          } else {
            setGhostText(currentText.substring(0, currentCharIndex - 1));
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
              isDeleting = false;
              currentTextIndex = (currentTextIndex + 1) % ghostTexts.length;
            }
          }
        };

        setIsTyping(true);
        activeInterval = setInterval(typeText, isDeleting ? 15 : 25);
      };

      const delayTimeout = setTimeout(startGhostAnimation, ANIMATION_DELAY);
      
      return () => {
        clearTimeout(delayTimeout);
        if (activeInterval) clearInterval(activeInterval);
      };
    } else {
      setIsTyping(false);
      setGhostText('');
    }
  }, [prompt, ghostTexts]);

  // Analyze colors when scene changes
  useEffect(() => {
    analyzeSceneColors(currentScene);
  }, [currentScene, analyzeSceneColors]);

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
        justifyContent: 'flex-start',
        width: '100%',
        height: '100vh',
        padding: '2rem',
        paddingTop: '140px' // Move much higher to showcase background
      }}>
        <div className="dora-style-container">
          <div className="dora-header-section">
            <h1 
              className="dora-main-title"
              style={{ 
                color: textColors.title,
                textShadow: textColors.titleShadow 
              }}
            >
              <StreamingText 
                text="Generate Your Perfect Background"
                delay={500}
                wordDelay={180}
              />
            </h1>
            <p 
              className="dora-subtitle"
              style={{ 
                color: textColors.subtitle,
                textShadow: textColors.textShadow 
              }}
            >
              <StreamingText 
                text="Create stunning parallax scenes from any description"
                delay={1500}
                wordDelay={150}
              />
            </p>
          </div>
          
          <div className="dora-input-container">
            <div className="dora-input-wrapper">
              <div className="ai-icon">
                <img 
                  src={`${process.env.PUBLIC_URL}/ai-star.png`} 
                  alt="AI" 
                  className="ai-star-image"
                />
              </div>
              
              <div className="input-content">
                <input
                  type="text"
                  className="dora-prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
                {prompt.length === 0 && isTyping && (
                  <div className="ghost-text">
                    {ghostText}
                    <span className="typing-cursor">|</span>
                  </div>
                )}
              </div>
              
              <button 
                className="dora-generate-button"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
              >
                {isGenerating ? (
                  <div className="dora-spinner"></div>
                ) : (
                  <>
                    Generate
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
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

// Function to get a random scene from all available scenes
const getRandomScene = () => {
  const allScenes = [...natureScenes, ...oceanScenes];
  const randomIndex = Math.floor(Math.random() * allScenes.length);
  return allScenes[randomIndex];
};

const defaultScene = getRandomScene();

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
    // Keep the panel open so users can easily switch between scenes
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
            src={`${process.env.PUBLIC_URL}/parallax-logo-cropped.png`} 
            alt="Parallax Icon" 
            className="header-logo header-icon-logo"
            onError={(e) => {
              console.error('Icon logo failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
          <img 
            src={`${process.env.PUBLIC_URL}/parallax-text-logo-cropped.png`} 
            alt="Parallax Text" 
            className="header-logo header-text-logo"
            onError={(e) => {
              console.error('Text logo failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
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

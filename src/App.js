import React, { useMemo, useState } from 'react';
import './App.css';

// All scenes from images directory
const scenes = [
  // Numbered scenes
  { id: '1', folder: '1', layers: [1, 2, 3, 4] },
  { id: '2', folder: '2', layers: [1, 2] },
  { id: '3', folder: '3', layers: [1, 2, 3, 4, 5, 6, 7] },
  { id: '4', folder: '4', layers: [1, 2, 3, 4, 5, 6] },
  { id: '5', folder: '5', layers: [1, 2, 3, 4, 5, 6] },
  { id: '6', folder: '6', layers: [1, 2, 3, 4] },
  { id: '7', folder: '7', layers: [1, 2, 3, 4] },
  { id: '8', folder: '8', layers: [1, 2, 3, 4] },
  
  // Nature scenes
  { id: 'nature1', folder: 'nature_1', layers: [1, 2, 3, 5, 6, 7, 8] },
  { id: 'nature2', folder: 'nature_2', layers: [1, 2, 3, 4] },
  { id: 'nature3', folder: 'nature_3', layers: [1, 2, 3, 4] },
  { id: 'nature4', folder: 'nature_4', layers: [1, 2, 3, 4] },
  { id: 'nature5', folder: 'nature_5', layers: [1, 2, 3, 4, 5] },
  { id: 'nature6', folder: 'nature_6', layers: [1, 2, 3] },
  { id: 'nature7', folder: 'nature_7', layers: [1, 2] },
  { id: 'nature8', folder: 'nature_8', layers: [1] },
  
  // Ocean scenes
  { id: 'ocean1', folder: 'ocean background 1', layers: [1, 2, 3, 4, 5] },
  { id: 'ocean2', folder: 'ocean background 2', layers: [1, 2, 3, 4, 5] },
  { id: 'ocean3', folder: 'ocean background 3', layers: [1, 2, 3, 4, 5, 6] },
  { id: 'ocean4', folder: 'ocean background 4', layers: [1, 2, 3, 4] },
  
  // Desert scenes (reversed: high number = background, low = foreground)
  { id: 'desert1', folder: 'desert background 1', layers: [5, 4, 3, 2, 1], prefix: 'Plan-' },
  { id: 'desert2', folder: 'desert background 2', layers: [6, 5, 4, 3, 2, 1], prefix: 'Plan-' },
  { id: 'desert3', folder: 'desert background 3', layers: [6, 5, 4, 3, 2, 1], prefix: 'Plan-' },
  { id: 'desert4', folder: 'desert background 4', layers: [6, 5, 4, 3, 2, 1], prefix: 'Plan-' },
  
  // Summer scenes
  { id: 'summer1', folder: 'summer 1', layers: [1, 2, 3, 4] },
  { id: 'summer2', folder: 'summer 2', layers: [1, 2, 3, 4] },
  { id: 'summer3', folder: 'summer 3', layers: [1, 2, 3, 4] },
  { id: 'summer4', folder: 'summer 4', layers: [1, 2, 3] },
  { id: 'summer5', folder: 'summer5', layers: [1, 2, 3, 4] },
  { id: 'summer6', folder: 'summer6', layers: [1, 2, 3, 4, 5] },
  { id: 'summer7', folder: 'summer7', layers: [1, 2, 3, 4] },
  { id: 'summer8', folder: 'summer8', layers: [1, 2, 3, 4] },
];

const buildLayerPath = (scene, layerNumber) => {
  const prefix = scene.prefix || '';
  const filename = prefix ? `${prefix}${layerNumber}.png` : `${layerNumber}.png`;
  // Encode spaces in folder names for URL compatibility
  const encodedFolder = encodeURIComponent(scene.folder);
  return `${process.env.PUBLIC_URL}/images/${encodedFolder}/${filename}`;
};

const getLayerPaths = (scene) => scene.layers.map((layer) => buildLayerPath(scene, layer));

// All layers move - background slowest, foreground fastest
const getAnimationStyle = (index) => {
  const base = 150; // 2.5 minutes for background layer
  const decrement = 12; // Each closer layer is ~12s faster
  const duration = Math.max(45, base - index * decrement);
  return { animationDuration: `${duration}s` };
};

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = scenes[sceneIndex];

  const layers = useMemo(() => getLayerPaths(currentScene), [currentScene]);

  const goPrevious = () => {
    setSceneIndex((prev) => (prev === 0 ? scenes.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSceneIndex((prev) => (prev === scenes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="wallpaper">
      <div className="parallax-container">
        <div className="scene active">
          {layers.map((path, index) => (
            <div
              key={`${currentScene.id}-${index}`}
              className={`parallax-layer layer-${index + 1}`}
              style={{
                backgroundImage: `url("${path}")`,
                ...getAnimationStyle(index)
              }}
            />
          ))}
        </div>
      </div>

      <div className="mini-nav">
        <button className="mini-arrow" onClick={goPrevious} aria-label="Previous">
          ‹
        </button>
        <span className="scene-indicator">{sceneIndex + 1}/{scenes.length}</span>
        <button className="mini-arrow" onClick={goNext} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, Music2 } from 'lucide-react';

interface PianoKey {
  note: string;
  frequency: number;
  type: 'white' | 'black';
  keyBinding?: string;
}

const VirtualPiano: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(0.3);

  // Piano keys configuration
  const pianoKeys: PianoKey[] = [
    { note: 'C4', frequency: 261.63, type: 'white', keyBinding: 'a' },
    { note: 'C#4', frequency: 277.18, type: 'black', keyBinding: 'w' },
    { note: 'D4', frequency: 293.66, type: 'white', keyBinding: 's' },
    { note: 'D#4', frequency: 311.13, type: 'black', keyBinding: 'e' },
    { note: 'E4', frequency: 329.63, type: 'white', keyBinding: 'd' },
    { note: 'F4', frequency: 349.23, type: 'white', keyBinding: 'f' },
    { note: 'F#4', frequency: 369.99, type: 'black', keyBinding: 't' },
    { note: 'G4', frequency: 392.00, type: 'white', keyBinding: 'g' },
    { note: 'G#4', frequency: 415.30, type: 'black', keyBinding: 'y' },
    { note: 'A4', frequency: 440.00, type: 'white', keyBinding: 'h' },
    { note: 'A#4', frequency: 466.16, type: 'black', keyBinding: 'u' },
    { note: 'B4', frequency: 493.88, type: 'white', keyBinding: 'j' },
    { note: 'C5', frequency: 523.25, type: 'white', keyBinding: 'k' },
    { note: 'C#5', frequency: 554.37, type: 'black', keyBinding: 'o' },
    { note: 'D5', frequency: 587.33, type: 'white', keyBinding: 'l' },
    { note: 'D#5', frequency: 622.25, type: 'black', keyBinding: 'p' },
    { note: 'E5', frequency: 659.25, type: 'white', keyBinding: ';' }
  ];

  // Initialize Audio Context
  useEffect(() => {
    const initAudioContext = () => {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);
    };

    const handleUserInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Play note function
  const playNote = useCallback((frequency: number, duration: number = 0.5) => {
    if (!audioContext || isMuted) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }, [audioContext, isMuted, volume]);

  // Handle key press
  const handleKeyPress = (key: PianoKey) => {
    setPressedKeys(prev => new Set(prev).add(key.note));
    playNote(key.frequency);
    
    setTimeout(() => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key.note);
        return newSet;
      });
    }, 150);
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = pianoKeys.find(k => k.keyBinding === event.key.toLowerCase());
      if (key && !pressedKeys.has(key.note)) {
        handleKeyPress(key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [pressedKeys]);

  // Demo songs
  const playDemo = (song: 'twinkle' | 'happy') => {
    const songs = {
      twinkle: [
        { note: 'C4', delay: 0 },
        { note: 'C4', delay: 300 },
        { note: 'G4', delay: 600 },
        { note: 'G4', delay: 900 },
        { note: 'A4', delay: 1200 },
        { note: 'A4', delay: 1500 },
        { note: 'G4', delay: 1800 }
      ],
      happy: [
        { note: 'C4', delay: 0 },
        { note: 'E4', delay: 200 },
        { note: 'G4', delay: 400 },
        { note: 'C5', delay: 600 },
        { note: 'G4', delay: 800 },
        { note: 'E4', delay: 1000 },
        { note: 'C4', delay: 1200 }
      ]
    };

    songs[song].forEach(({ note, delay }) => {
      setTimeout(() => {
        const key = pianoKeys.find(k => k.note === note);
        if (key) handleKeyPress(key);
      }, delay);
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Music2 className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Virtual Piano</h2>
        </div>
        <p className="text-gray-400">Try playing some notes! Use your mouse or keyboard keys (A-S-D-F-G-H-J-K-L)</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
            isMuted 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-white text-sm">Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-blue-500"
          />
        </div>

        <button
          onClick={() => playDemo('twinkle')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all"
        >
          🎵 Play Demo
        </button>

        <button
          onClick={() => setPressedKeys(new Set())}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </button>
      </div>

      {/* Piano Keys */}
      <div className="relative">
        {/* White Keys */}
        <div className="flex justify-center space-x-1 mb-4">
          {pianoKeys.filter(key => key.type === 'white').map((key) => (
            <button
              key={key.note}
              onMouseDown={() => handleKeyPress(key)}
              className={`relative w-12 h-40 bg-gradient-to-b from-gray-100 to-white border-2 border-gray-300 rounded-b-lg shadow-lg transition-all duration-75 hover:from-gray-200 hover:to-gray-100 active:from-gray-300 active:to-gray-200 ${
                pressedKeys.has(key.note) ? 'from-blue-200 to-blue-100 transform scale-95' : ''
              }`}
            >
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                {key.note}
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                {key.keyBinding?.toUpperCase()}
              </div>
            </button>
          ))}
        </div>

        {/* Black Keys */}
        <div className="flex justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            {pianoKeys.filter(key => key.type === 'black').map((key, index) => {
              // Calculate position for black keys
              const positions = [30, 78, 174, 222, 270, 366, 414, 462, 510]; // Approximate positions
              return (
                <button
                  key={key.note}
                  onMouseDown={() => handleKeyPress(key)}
                  style={{ 
                    position: 'absolute',
                    left: `${positions[index]}px`,
                    transform: 'translateX(-50%)'
                  }}
                  className={`w-8 h-24 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-b-lg shadow-xl transition-all duration-75 hover:from-gray-700 hover:to-gray-800 active:from-gray-600 active:to-gray-700 z-10 ${
                    pressedKeys.has(key.note) ? 'from-blue-600 to-blue-700 transform scale-95' : ''
                  }`}
                >
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white">
                    {key.note}
                  </div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300">
                    {key.keyBinding?.toUpperCase()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="bg-gray-800/50 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-white font-semibold mb-3">How to Play</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <strong className="text-blue-400">Mouse:</strong> Click on any key to play
            </div>
            <div>
              <strong className="text-green-400">Keyboard:</strong> Use A-S-D-F-G-H-J-K-L keys
            </div>
            <div>
              <strong className="text-purple-400">Demo:</strong> Click "Play Demo" for sample melody
            </div>
            <div>
              <strong className="text-yellow-400">Volume:</strong> Adjust using the volume slider
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPiano;
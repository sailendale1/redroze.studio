
import React, { useState, useEffect } from 'react';
import { ContentSchema } from '../types';

interface ExitIntentProps {
  content: ContentSchema['exitPopup'];
  onCtaClick: () => void;
}

const ExitIntent: React.FC<ExitIntentProps> = ({ content, onCtaClick }) => {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShow(false)}></div>
      <div className="relative glass p-8 rounded-3xl max-w-lg w-full text-center border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
        <button 
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 border border-white/10">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/flI2Mkw1_PU?si=NgVj-dpd9tzFXIi8&controls=0&autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-white/70 mb-8">{content.sub}</p>
        <button 
          onClick={() => {
            setShow(false);
            onCtaClick();
          }}
          className="w-full bg-gradient-glow py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
        >
          {content.button}
        </button>
      </div>
    </div>
  );
};

export default ExitIntent;

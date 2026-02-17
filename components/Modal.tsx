
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-4xl h-[95vh] bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/10 glass">
          <h3 className="text-xl font-bold text-gradient">Application Form</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white text-2xl"
          >
            &times;
          </button>
        </div>
        
        {/* Landscape Video Section at Top of Form */}
        <div className="w-full aspect-video bg-black flex-shrink-0 border-b border-white/10">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/flI2Mkw1_PU?si=NgVj-dpd9tzFXIi8&controls=0&autoplay=1&mute=1&loop=1" 
            title="Strategic Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Ensure full scrollability for the iframe container */}
        <div className="flex-1 w-full bg-white overflow-hidden">
          <iframe 
            src={url} 
            className="w-full h-full border-none overflow-y-auto"
            title="Google Form"
            style={{ minHeight: '100%' }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;

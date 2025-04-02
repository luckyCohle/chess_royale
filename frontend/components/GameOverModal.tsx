import React from "react";
import { X, Trophy, Handshake } from "lucide-react";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "draw" | "game_over";
  winner?: "w" | "b";  // Optional: Only used when game_over
  reason: string;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, onClose, type, winner, reason }) => {
  if (!isOpen) return null;

  // Determine title and emoji based on type
  let title = "";
  let emoji = null;
  
  if (type === "draw") {
    title = "Draw";
    emoji = <Handshake className="w-12 h-12 text-blue-400" />;
  } else if (winner === "w") {
    title = "White Won";
    emoji = <Trophy className="w-12 h-12 text-yellow-400" />;
  } else if (winner === "b") {
    title = "Black Won";
    emoji = <Trophy className="w-12 h-12 text-yellow-400" />;
  }

  return (
    // Use pointer-events-auto to ensure clicks work properly
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }} // Very subtle overlay
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-2xl w-80 text-center border border-gray-700 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Emoji/Icon */}
          <div className="mb-2">
            {emoji}
          </div>
          
          {/* Title with glow effect */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {title}
          </h2>
          
          {/* Reason with styled text */}
          <p className="text-lg text-gray-300 font-medium">
            by {reason}
          </p>
          
          {/* Game end message */}
          <div className="mt-4 text-sm text-gray-400">
            Game finished
          </div>
          
          {/* Play again button */}
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
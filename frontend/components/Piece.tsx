import { useDrag } from "react-dnd";
import { useRef, useEffect } from "react";
import { DragItem } from "@/utility/drag";

interface PieceProps {
  piece: string;
  square: string;
}

function Piece({ piece, square }: PieceProps) {
  // Use the current square as a dependency for useDrag to ensure it updates
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "piece",
    item: { piece, square }, // This will now update when square prop changes
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [square]); // Critical: Add square as dependency to recreate the drag source when square changes

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      drag(imgRef.current);
    }
  }, [drag]);

  return (
    <img
      ref={imgRef}
      src={piece} // Using the piece prop directly as in your original code
      alt={`Chess piece ${piece}`}
      className="w-full h-full"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab'
      }}
    />
  );
}

export default Piece;
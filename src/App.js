import { useRef } from "react";
import "./App.css";

const places = [
  { position: [100, 100], rotation: Math.random() * 360 },
  { position: [250, 100], rotation: Math.random() * 360 },
  { position: [400, 100], rotation: Math.random() * 360 },
  { position: [100, 250], rotation: Math.random() * 360 },
  { position: [250, 250], rotation: Math.random() * 360 },
  { position: [400, 250], rotation: Math.random() * 360 },
  { position: [100, 400], rotation: Math.random() * 360 },
  { position: [250, 400], rotation: Math.random() * 360 },
  { position: [400, 400], rotation: Math.random() * 360 },
];

const templatePosition = { position: [1000, 100] }

const pieces = [...places].map((piece) => ({
  position: [Math.random() * 300 + 600, Math.random() * 300 + 300],
}));

export default function App() {
  const selected = useRef();

  const handleMouseDown = (event, index) => {
    selected.current = { index, element: event.target };
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (event) => {
    const { element, index } = selected.current;

    const positionX = event.pageX - element.offsetWidth / 2;
    const positionY = event.pageY - element.offsetHeight / 2;

    const targetX = places[index].position[0];
    const targetY = places[index].position[1];

    const differenceX = Math.abs(positionX - targetX);
    const differenceY = Math.abs(positionY - targetY);

    if (differenceX < 16 && differenceY < 16) {
      const transform = `translate3d(${targetX}px, ${
        targetY
      }px, 0)`;
      const transition = `transform 300ms linear`;
      element.style.transform = transform;
      element.style.transition = transition;
      element.style.opacity = 1;
      endDrag();
    } else {
      const transform = `translate3d(${positionX}px, ${positionY}px, 0) rotate(${places[index].rotation}deg)`;
      element.style.transform = transform;
    }
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const endDrag = () => {
    selected.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <div className="App">
      {places.map((piece, index) => (
        <div
          key={index}
          className={`piece-helper p${index}`}
          style={{
            position: "absolute",
            transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)`,
            opacity: .2
          }}
        >
        </div>
      ))}


<div className="template"
          style={{
            position: "absolute",
            transform: `translate3d(${templatePosition.position[0]}px, ${templatePosition.position[1]}px, 0)`,
            opacity: 1,
          }}
        >
        </div>

      {pieces.map((piece, index) => (
        <div
          key={index}
          onMouseDown={(event) => handleMouseDown(event, index)}
          onMouseUp={handleMouseUp}
          className={`piece p${index}`}
          style={{
            position: "absolute",
            transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)  rotate(${places[index].rotation}deg)`
          }}
        >
        </div>
      ))}
    </div>
  );
}

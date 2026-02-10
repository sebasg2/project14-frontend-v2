import { useEffect, useState } from "react";

const frames = [
 "/images/pug-walk-1.png",
"/images/pug-walk-2.png",
];

export default function PugWalker() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 300); // classic slow 90s walk

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pug-walker">
      <img
        src={frames[frame]}
        alt="Pixel pug walking"
        draggable={false}
      />
    </div>
  );
}

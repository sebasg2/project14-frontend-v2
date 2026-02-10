import { useEffect, useState } from "react";

export default function IsadoraGhost() {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    let hideTimeout;

    const spawn = () => {
      const x = Math.random() * 70 + 10;
      const y = Math.random() * 60 + 10;

      setStyle({
        left: `${x}vw`,
        top: `${y}vh`,
      });

      setVisible(true);

      hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 3500);
    };

    spawn();

    const interval = setInterval(spawn, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      className={`isadora-ghost ${visible ? "show" : ""}`}
      style={style}
    >
      <img src="/images/isadora.png" alt="Isadora" draggable={false} />
      <div className="isadora-text">hmmm</div>
    </div>
  );
}

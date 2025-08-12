import { useState } from "react";

function TextButton({ icon, title, color, hover, onClick }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="TextButton"
      onClick={onClick}
      style={{ color: isHover ? hover : color }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icon && icon}
      <h4>{title}</h4>
    </div>
  );
}

export default TextButton;

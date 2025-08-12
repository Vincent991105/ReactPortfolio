function IconButton({ icon, title, backgroundColor, onClick, select }) {
  return (
    <div
      className="IconButton"
      onClick={onClick}
      style={{ backgroundColor, opacity: select ? 1 : undefined }}
    >
      {icon && icon}
      <h4>{title}</h4>
    </div>
  );
}

export default IconButton;

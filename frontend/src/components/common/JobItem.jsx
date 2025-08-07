function JobItem({ time, title, desc, logo, isDimmed, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={`JobItem ${isDimmed ? 'dimmed' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3>{time}</h3>
      <div className="Context">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <img src={logo} alt="company-logo" />
    </div>
  );
}

export default JobItem;

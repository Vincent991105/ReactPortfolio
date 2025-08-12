function NewsItem({ title, date, onClick }) {
  return (
    <div className="NewsItem" onClick={onClick}>
      <h4>{title}</h4>
      <p>{date}</p>
    </div>
  );
}

export default NewsItem;

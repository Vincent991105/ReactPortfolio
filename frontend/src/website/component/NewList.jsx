import NewsItem from "./common/NewsItem";

function NewList() {
  return (
    <div className="NewList">
      <div className="NL_Content">
        <div className="SubTitle">
          <h3>最新消息</h3>
        </div>
        <NewsItem
          title="金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近"
          date="2025/07/19"
        />
        <NewsItem
          title="金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近"
          date="2025/07/19"
        />
        <NewsItem
          title="金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近"
          date="2025/07/19"
        />
        <NewsItem
          title="金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近"
          date="2025/07/19"
        />
      </div>
      <div className="MainNewest">
        <img src="/Demo2.png" alt="Newest" />
        <div className="Text">
          <h3>
            【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近【金融危機恐!!】帕瑪斯規範露餡，可能導致金融風暴將近
          </h3>
          <p>2025/07/18</p>
        </div>
      </div>
    </div>
  );
}

export default NewList;

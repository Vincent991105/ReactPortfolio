import { FaPhotoVideo } from "react-icons/fa";
import HlsPlayer from "./HlsPlayer";


function Surveillance() {
  return (
    <div className="Surveillance">
      <HlsPlayer src="http://127.0.0.1:8888/my_camera/index.m3u8"/>
      <div className="ImageRecognition">
        <div className="Title">
          <FaPhotoVideo fontSize="1.5em" />
          <h2>AI 視覺辨識</h2>
        </div>
        <div className="ImageDetails">
          <div className="Details" style={{backgroundColor: '#90e99d'}}>
            <h4>破損 </h4>
            <span> 3 處</span>
          </div>
          <div className="Details" style={{backgroundColor: '#ecd73e'}}>
            <h4> 白華 </h4>
            <span> 10 處</span>
          </div>
          <div className="Details" style={{backgroundColor: '#ff4d4d'}}>
            <h4>滲漏 </h4>
            <span> 20 處</span>
          </div>
        </div>
        <div className="Conclusion">
          <h4>結論:</h4>
          <p>AI生成文字中....</p>
        </div>
      </div>
    </div>
  );
}

export default Surveillance;

import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

function HlsPlayer({ src }) {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => setHasError(true));
      });

      hls.on(Hls.Events.ERROR, function (_, data) {
        if (data.fatal) {
          setHasError(true);
          hls.destroy();
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => setHasError(true));
      });
    } else {
      setHasError(true);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  if (hasError) {
    return (
      <div className='HlsError'>
        📡 無法載入即時影像
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      style={{ height: '100%', borderRadius: '5px' }}
      muted
      autoPlay
      playsInline
    />
  );
}

export default HlsPlayer;

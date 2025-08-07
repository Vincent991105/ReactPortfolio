export function generateHistoryData(startDateStr, endDateStr) {
  const resultSensors = [
    "health",
    "seismic",
    "centroid_frequency",
    "cable_force",
    "damping_ratio",
  ];

  const getRandomFloat = (min, max) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));

  const generateTimes = (start, end, intervalMinutes) => {
    const times = [];
    const startTime = new Date(start);
    const endTime = new Date(end);
    for (
      let time = new Date(startTime);
      time <= endTime;
      time.setMinutes(time.getMinutes() + intervalMinutes)
    ) {
      const formatted = time.toISOString().replace("T", " ").slice(0, 19);
      times.push(formatted);
    }
    return times;
  };

  const generateResultData = (timeLength) => {
    return resultSensors.map((title) => {
      const Q1 = Array.from({ length: timeLength }, () => getRandomFloat(80, 90));
      const Q2 = Array.from({ length: timeLength }, () => getRandomFloat(85, 95));
      const Q3 = Array.from({ length: timeLength }, () => getRandomFloat(90, 100));
      const latestData = Q3[Q3.length - 1];
      return { title, Q1, Q2, Q3, latestData };
    });
  };

  const generateWeatherData = (timeLength) => {
    return {
      temperature: Array.from({ length: timeLength }, () => getRandomFloat(15, 35)),
      wind_speed: Array.from({ length: timeLength }, () => getRandomFloat(0, 20)),
      wind_direction: Array.from({ length: timeLength }, () => getRandomFloat(0, 360)),
      precipitation: Array.from({ length: timeLength }, () => getRandomFloat(0, 10)),
    };
  };

  // 計算時間範圍
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffMs = end - start;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  let interval = 60; // 預設每小時
  let mode = "hour";

  if (diffDays > 31) {
    interval = 30 * 24 * 60; // 每月 (30天)
    mode = "month";
  } else if (diffDays > 2) {
    interval = 24 * 60; // 每天
    mode = "day";
  } else {
    interval = 60; // 每小時
    mode = "hour";
  }

  const times = generateTimes(start, end, interval);

  return {
    success: true,
    mode,
    time: times,
    result: generateResultData(times.length),
    weather: generateWeatherData(times.length),
  };
}

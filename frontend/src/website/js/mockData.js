// mockData.js
export function generateMockData() {
  const resultSensors = [
    "health",
    "seismic",
    "centroid_frequency",
    "cable_force",
    "damping_ratio",
  ];

  const getRandomFloat = (min, max) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));

  const generateTimes = (intervalMinutes, count) => {
    const times = [];
    const now = new Date();
    for (let i = 0; i < count; i++) {
      const time = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
      const formatted = time.toISOString().replace("T", " ").slice(0, 19);
      times.unshift(formatted);
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

  const hourTimes = generateTimes(60, 24);
  const minuteTimes = generateTimes(1, 60);

  return {
    success: true,
    hour: {
      time: hourTimes,
      result: generateResultData(hourTimes.length),
      weather: generateWeatherData(hourTimes.length),
    },
    minute: {
      time: minuteTimes,
      result: generateResultData(minuteTimes.length),
      weather: generateWeatherData(minuteTimes.length),
    },
  };
}

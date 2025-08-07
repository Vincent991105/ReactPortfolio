const typeMapping = {
    health: { name: "健康度", unit: "%" },
    seismic: { name: "震度", unit: "grade" },
    centroid_frequency: { name: "中心頻率", unit: "Hz" },
    cable_force: { name: "索力", unit: "tonf" },
    damping_ratio: { name: "阻尼比", unit: "%" },
    temperature: { name: "溫度", unit: "" },
    wind_speed: { name: "風速", unit: "" },
    wind_direction: { name: "風向", unit: "" },
    precipitation: { name: "雨量", unit: "" },
    load_carry_capacity: { name: "撓度", unit: "" },
};

export default typeMapping;
import { createSlice } from '@reduxjs/toolkit';
import { generateMockData } from '../js/mockData';
import { generateHistoryData } from '../js/historyData';

const ProjectBridgeDataSlice = createSlice({
  name: 'ProjectBridgeData',
  initialState: {
    list: [
      {
        longitude: 121.284,
        latitude: 25.0564,
        id: 1,
        type:"橋梁",
        name: "彩虹橋",
        city: "桃園市",
        district: "蘆竹區",
        photoName: "bridgeDemo.png",
        latestHealth: 91,
        weather: {
          stationName:"桃園站台",
          latestWeatherTime: "2025-04-10 00:00:00",
          latestPrecipitation: 0.5,
          latestTemperature: 21,
          latestWindSpeed: 3.9,
          latestWindDirection: 335
        },
        earthquake: {
          id: 114072,
          originTime: "2025-03-14 18:50:12",
          endTime: "2025-03-14 18:52:12",
          magnitudeValue: 4,
          longitude: 121.09,
          latitude: 22.88,
          postEventHealth: 91
        },
        typhoon: {
          id: 202425,
          chtName: "天兔",
          engName: "USAGI",
          seaStartDatetime: "2024-11-14 05:30:00",
          seaEndDatetime: "2024-11-16 11:30:00",
          maxIntensity: "m",
          postEventHealth: 99
        },
        sensorList: [
          {
            type: "accelerometer",
            ip: 43,
            elasticity: 2.4,
            inertia: 1.1,
            mass: 30.5,
            status: 0,
            id: 1,
            latestTime: "2025-03-11 10:53:00",
            latestHealth: 89.82,
            sensorLocation: "cable",
            detailedLocation: "L-77",
            cableMassPerLength: 1.66,
            cableLength: 22.66,
            healthAlertIndex: 90,
            healthMoveIndex: 85,
            eventAlertIndex: 1,
            eventMoveIndex: 1,
            bridgeAlertIndex: 30,
            bridgeMoveIndex: 40,
            imageCoordinate: {
              x: 34.3,
              y: 34.56
            }
          },
          {
            type: "accelerometer",
            ip: 42,
            elasticity: null,
            inertia: null,
            mass: null,
            status: 0,
            id: 2,
            latestTime: "2025-03-11 10:52:00",
            latestHealth: 93.48,
            sensorLocation: "cable",
            detailedLocation: "L-80",
            cableMassPerLength: 1.102,
            cableLength: 26.146,
            healthAlertIndex: 90,
            healthMoveIndex: 85,
            eventAlertIndex: 1,
            eventMoveIndex: 1,
            bridgeAlertIndex: 1,
            bridgeMoveIndex: 0.1,
            imageCoordinate: {
              x: 63.3374,
              y: 63.3125
            }
          }
        ]
      },
      {
        longitude: 121.249,
        latitude: 25.1177,
        id: 2,
        type:"橋梁",
        name: "南崁橋",
        city: "桃園市",
        district: "蘆竹區",
        photoName: "bridgeDemo.png",
        latestHealth: null,
        stationName:"桃園站台",
        weather: null,
        earthquake: null,
        typhoon: null,
        sensorList: []
      },
    ],
    data: {
      longitude: 121.284,
      latitude: 25.0564,
      id: 1,
      type:"橋梁",
      name: "彩虹橋",
      city: "桃園市",
      district: "蘆竹區",
      photoName: "bridgeDemo.png",
      latestHealth: 91,
      weather: {
        latestWeatherTime: "2025-04-10 00:00:00",
        latestPrecipitation: 0.5,
        latestTemperature: 21,
        latestWindSpeed: 3.9,
        latestWindDirection: 335
      },
      earthquake: {
        id: 114072,
        originTime: "2025-03-14 18:50:12",
        endTime: "2025-03-14 18:52:12",
        magnitudeValue: 4,
        longitude: 121.09,
        latitude: 22.88,
        postEventHealth: 91
      },
      typhoon: {
        id: 202425,
        chtName: "天兔",
        engName: "USAGI",
        seaStartDatetime: "2024-11-14 05:30:00",
        seaEndDatetime: "2024-11-16 11:30:00",
        maxIntensity: "m",
        postEventHealth: 99
      },
      sensorList: [
        {
          type: "accelerometer",
          ip: 43,
          elasticity: 2.4,
          inertia: 1.1,
          mass: 30.5,
          status: 0,
          id: 1,
          latestTime: "2025-03-11 10:53:00",
          latestHealth: 89.82,
          sensorLocation: "cable",
          detailedLocation: "L-77",
          cableMassPerLength: 1.66,
          cableLength: 22.66,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 30,
          bridgeMoveIndex: 40,
          imageCoordinate: {
            x: 34.3,
            y: 34.56
          }
        },
        {
          type: "accelerometer",
          ip: 42,
          elasticity: null,
          inertia: null,
          mass: null,
          status: 0,
          id: 2,
          latestTime: "2025-03-11 10:52:00",
          latestHealth: 93.48,
          sensorLocation: "cable",
          detailedLocation: "L-80",
          cableMassPerLength: 1.102,
          cableLength: 26.146,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 1,
          bridgeMoveIndex: 0.1,
          imageCoordinate: {
            x: 63.3374,
            y: 63.3125
          }
        }
      ]
    },
    sensorData:{
      type: "accelerometer",
      ip: 43,
      elasticity: 2.4,
      inertia: 1.1,
      mass: 30.5,
      status: 0,
      id: 1,
      latestTime: "2025-03-11 10:53:00",
      latestHealth: 89.82,
      sensorLocation: "cable",
      detailedLocation: "L-77",
      cableMassPerLength: 1.66,
      cableLength: 22.66,
      healthAlertIndex: 90,
      healthMoveIndex: 85,
      eventAlertIndex: 1,
      eventMoveIndex: 1,
      bridgeAlertIndex: 30,
      bridgeMoveIndex: 40,
      imageCoordinate: {
        x: 34.3,
        y: 34.56
      }
    },
    earthSelect: null,
    colormode: true,
    realTimeData:generateMockData(),
    historyData:null,
  },
  reducers: {
    handleToggle: (state,action) => {
      const newSelected = state.earthSelect?.id === action.payload.id ? null : action.payload;
      state.earthSelect = newSelected
    },
    changeColorMode: (state) => {
      state.colormode = !state.colormode; 
    },
    SelectBridge: (state, action) => {
      const selected = state.list.find(item => item.id === action.payload);
      if (selected) {
        state.data = selected || {};
      }
      if (selected.sensorList.length === 0){
        state.sensorData = null;
        state.realTimeData = null;
      }else{
        state.sensorData = selected.sensorList[0];
        state.realTimeData = generateMockData();
      }
    },
    getHistoryData:(state,action) => {
      if(state.data.sensorList.length > 0){
        state.historyData = generateHistoryData(`${action.payload.start} 00:00:00`,`${action.payload.end} 23:59:59`);
      }else{
        state.historyData = null;
      }
    },
    selectSensor: (state, action) => {
      const selected = state.data.sensorList.find(
        item => item.id === action.payload
      );
      state.sensorData = selected || {};
      state.realTimeData = generateMockData();
    },
    addBridge: (state, action) => {
      const maxId = state.list.length > 0 
        ? Math.max(...state.list.map(item => item.id || 0)) 
        : 0

      const Data = {
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        id: maxId + 1,
        type:"橋梁",
        name: action.payload.name,
        city: action.payload.city,
        district: action.payload.district,
        photoName: null,
        base64:action.payload.base64,
        latestHealth: null,
        stationName:null,
        weather: null,
        earthquake: null,
        typhoon: null,
        sensorList: []
      }

      state.list.push(Data);
      state.data = Data;
      state.realTimeData = null;
    },
    updateBridge: (state, action) => {
      state.list = state.list.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name ?? item.name,
            base64: action.payload.base64 ?? item.base64,
          };
        }
        return item;
      });

      const fieldsToUpdate = ['name', 'base64'];

      state.data = {
        ...state.data,
        ...fieldsToUpdate.reduce((acc, key) => {
          if (action.payload[key] !== undefined) acc[key] = action.payload[key];
          return acc;
        }, {}),
      };
    }
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { handleToggle, changeColorMode, SelectBridge, getHistoryData, selectSensor, addBridge, updateBridge } = ProjectBridgeDataSlice.actions;
export default ProjectBridgeDataSlice.reducer;

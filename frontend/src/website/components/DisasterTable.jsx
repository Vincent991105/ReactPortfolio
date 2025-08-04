import React, { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import DataSet from './DataSet';
import { DisasterContext } from '../context/DisasterContext';
import { BasicContext } from '../context/BasicContext';

function DisasterTable({ selectDisaster, chooseDisaster }) {
    const {isMobile} = useContext(BasicContext);
    const{DisasterData} = useContext(DisasterContext)

    const data1 = [
        { name: 'before', value: selectDisaster.before},
        { name: 'after', value: selectDisaster.after },
      ];

    return (
        <div className="DisasterTable">
            <div className="ModalContent">
                <div className="title">
                    <h2>{selectDisaster.id}</h2>
                    <button className="close-button" onClick={() => chooseDisaster('')}>×</button>
                </div>
                <div className="tablelist">
                    <div className="fvRatio">
                        <h4>頻率變異比</h4>
                        <div className='fvData'>
                            <span className='ratio'>{selectDisaster.frequencyVarianceRatio}</span>
                            <ResponsiveContainer width="100%">
                                {isMobile ? (
                                    <BarChart data={data1} layout="vertical"> {/* 設定為水平佈局 */}
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" tick={false} axisLine={false} height={0}/> {/* 數值軸改為 X 軸 */}
                                        <YAxis type="category" dataKey="name" width={40} /> {/* 分類軸改為 Y 軸 */}
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" barSize="90%" />
                                    </BarChart>
                                ):(
                                    <BarChart data={data1} >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <YAxis type="number" tick={false} axisLine={false} width={0} /> {/* 定義數值軸 */}
                                        <XAxis type="category" dataKey="name" height={20}/> {/* 定義分類軸 */}
                                        <Tooltip /> {/* 提示框 */}
                                        <Bar dataKey="value" fill="#8884d8" barSize='80%' />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {DisasterData && DisasterData.success && (
                    <div className="sensorResult">
                        <h4>感測器情況</h4>
                        {DisasterData.data.result.map((chartdata, index) => (
                            <DataSet
                            lineActive={{q1: true, q2: true, q3: true,}}
                            key={index}
                            type={chartdata.title}
                            time={DisasterData.data.time}
                            q1={chartdata.Q1}
                            q2={chartdata.Q2}
                            q3={chartdata.Q3}
                            value={chartdata.latestData}
                            />
                        ))}
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default DisasterTable;

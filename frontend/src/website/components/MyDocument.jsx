
import { Page, Text, View, Document, StyleSheet, Image  } from "@react-pdf/renderer";
import { initReactPdf } from "../hook/initReactPdf";

// 設定樣式
const styles = StyleSheet.create({
  top: { display:'flex', padding: 20, flexDirection:'column', justifyContent:'space-around', alignItems:'center'},
  topview: { display:'flex', padding: 20, flexDirection:'column', alignItems:'center'},
  page: { padding: 50, paddingRight: 70 },
  RowSection: { display:'flex', flexDirection:"row", paddingBottom:20, width:'100%'},
  ColSection: { display:'flex', gap:20 },
  content: { display:'flex', flexDirection:"column", gap:10, width:'100%'},
  h1:{ fontSize: 26, marginBottom: 10, fontWeight: '700', fontFamily: "kaiu" },
  h2:{ fontSize: 18, marginBottom: 10, fontWeight: "bold", fontFamily: "kaiu" },
  h3:{ fontSize: 16, marginBottom: 10, fontFamily: "kaiu" },
  title: { fontSize: 14, marginBottom: 20, textAlign:'center', fontFamily: "kaiu"},
  text: { fontSize: 14, fontFamily: "kaiu", lineHeight:'24px' },
  subtitle: { fontSize: 14, fontFamily: "kaiu", textDecoration: 'underline', },
  sort:{ fontSize: 14, fontFamily: "kaiu" },
  remark: { fontSize: 14, fontFamily: "kaiu", textAlign:'center', width:'100%'},
  imageBox: { display:'flex', alignItems:'center', gap:'10px', width:'100%'},
  image: {width: '100%',  height: 'auto', objectFit: "contain", maxHeight:'500px'},
  container: {
    position: 'relative', // 使子元素可以使用绝对定位
  },
  dot: {
    position: 'absolute',  // 使用绝对定位
    width: 10,             // 圆点的宽度
    height: 10,            // 圆点的高度
    borderRadius: 5,       // 圆形
    backgroundColor: 'blue', // 圆点的颜色
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid black',
    backgroundColor:'black'
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    border: '1px solid black',
    padding: 5,
    textAlign: 'center',
    fontFamily: "kaiu",
    fontSize: 14,
  },
  header: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontFamily: "kaiu",
    fontSize: 14,
  },
});

const typeMapping = {
    cable: { name: "鋼索", type:"索力" },
    pier: { name: "橋柱", type:"有效長度" },
    deck: { name: "橋面板", type:"撓度" },
};

// 生成 PDF 文件
function MyDocument({ data, result }) {

    initReactPdf()

    return(
        <Document>
            {/* 首頁 */}
            <Page size="A4" style={styles.top}>
                <View style={styles.topview}>
                <Text style={styles.h1}>{data?.reportBasicData?.agencyName}</Text>
                <Text style={styles.h2}>{data?.reportBasicData?.reportName}安全評估報告</Text>
                </View>
                <View style={styles.topview}>
                <Text style={styles.h2}>{data?.reportBasicData?.userCompany}</Text>
                <Text style={styles.h2}>中華民國{data?.reportBasicData?.nowDate}</Text>
                </View>
            </Page>
            {/* 第一章：橋梁基本資料 */}
            <Page size="A4" style={styles.page}>
            <Text style={styles.title}>第壹章、目標概述</Text>
            <View style={styles.RowSection}>
                <Text style={styles.sort}>1.</Text>
                <View style={styles.content}>
                <Text style={styles.subtitle}>橋梁基本訊息</Text>
                <Text style={styles.text}>
                    {data?.reportBasicData?.bridgeName}位於{data?.reportBasicData?.area}，經緯度為({data?.reportBasicData?.latitude}, {data?.reportBasicData?.longitude})地理位置可參考下圖。
                </Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src={`data:image/jpg;base64,${data?.reportBasicData?.bridgeLocationImage?.base64}`} style={styles.image} />
                    <Text style={styles.remark}>圖{data?.reportBasicData?.bridgeLocationImage?.index}、{data?.reportBasicData?.bridgeName}地理位置</Text>
                </View>
                </View>
            </View>
            </Page>
            {/* 第一章：加速規安裝訊息 */}
            <Page size="A4" style={styles.page}>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>2.</Text>
                    <View style={styles.ColSection}>
                    <Text style={styles.subtitle}>加速規安裝訊息</Text>
                    <Text style={styles.text}>
                        {data?.reportBasicData?.bridgeName}總共安裝{data?.reportBasicData?.sensorData?.sensorConcept?.totalCount}顆加速規，
                        {data?.reportBasicData.sensorData.sensorConcept.cable && (
                            <Text style={styles.text}>
                                {data?.reportBasicData.sensorData.sensorConcept.cable}顆加速規監測之構件種類為鋼索；
                            </Text>
                        )}
                        {data?.reportBasicData.sensorData.sensorConcept.deck && (
                            <Text style={styles.text}>
                                {data?.reportBasicData.sensorData.sensorConcept.deck}顆加速規監測之構件種類為橋面板；
                            </Text>
                        )}
                        {data?.reportBasicData.sensorData.sensorConcept.pier && (
                            <Text style={styles.text}>
                                {data?.reportBasicData.sensorData.sensorConcept.pier}顆加速規監測之構件種類為橋柱；
                            </Text>
                        )}
                    </Text>
                    {data?.reportBasicData?.sensorData?.sensorList.map((item, index) => {
                        if (item.sensorLocation=== "cable") {
                            return (
                            <View style={styles.content} key={index}>
                                <Text style={styles.text}>
                                {'\u25C6'} 編號{item.detailedLocation}之鋼索，鋼索長度為{item.cableLength}m；鋼索線密度為{item.cableMassPerLength}kg/m。對應之感測器IP為{item.ip}。鋼索安全評估係數之警戒值為{item.healthAlertIndex}%；行動值為{item.healthMoveIndex}%。鋼索力之警戒值為{item.eventAlertIndex}；行動值為{item.eventMoveIndex}。設定點為可參考下圖。
                                </Text>
                                <View style={styles.imageBox} wrap={false}>
                                {/* <Image src="\image\bridge\bridgeDemo.png" style={styles.image} /> */}
                                <Image src={`data:image/png;base64,${item.sensorLocationImage.base64}`} style={styles.image} />
                                {/* <View style={[styles.dot,{ left: '63.3374%', top: '63.3125%' }]}></View> */}
                                <Text style={styles.remark}>圖{item.sensorLocationImage.index}、{item.detailedLocation}安狀位置圖</Text>
                                </View>
                            </View>
                            );
                        } else if (item.sensorLocation === "pier") {
                            return (
                            <View style={styles.content} key={index}>
                                <Text style={styles.text}>
                                {'\u25C6'} 編號{item.detailedLocation}之橋柱，楊式模數為{item.elasticity}；斷面慣性矩為{item.inertia}；質量為{item.mass}。對應之感測器IP為{item.ip}。橋柱安全評估係數之警戒值為{item.healthAlertIndex}%；行動值為{item.healthMoveIndex}%。橋柱之警戒值為{item.eventAlertIndex}；行動值為{item.eventMoveIndex}。設定點為可參考下圖。</Text>
                                <View style={styles.imageBox} wrap={false}>
                                {/* <Image src="\image\bridge\bridgeDemo.png" style={styles.image} /> */}
                                <Image src={`data:image/png;base64,${item.sensorLocationImage.base64}`} style={styles.image} />
                                {/* <View style={[styles.dot,{ left: '50%', top: '50%' }]}></View> */}
                                <Text style={styles.remark}>圖{item.sensorLocationImage.index}、{item.detailedLocation}安狀位置圖</Text>
                                </View>
                            </View>
                            );
                        } else if (item.sensorLocation === "deck") {
                            return (
                            <View style={styles.content} key={index}>
                                <Text style={styles.text}>
                                {'\u25C6'} 編號{item.detailedLocation}之橋面板。跨距為{item.span}公尺，擺放位置距最近橋柱距離約{item.nearestPierDistance}公尺。對應之感測器IP為{item.ip}。橋面板安全評估係數之警戒值為{item.healthAlertIndex}%；行動值為{item.healthMoveIndex}%。橋面板之警戒值為{item.eventAlertIndex}；行動值為{item.eventMoveIndex}。設定點為可參考下圖。</Text>
                                <View style={styles.imageBox} wrap={false}>
                                {/* <Image src="\image\bridge\bridgeDemo.png" style={styles.image} /> */}
                                <Image src={`data:image/png;base64,${item.sensorLocationImage.base64}`} style={styles.image} />
                                {/* <View style={[styles.dot,{ left: '50%', top: '50%' }]}></View> */}
                                <Text style={styles.remark}>圖{item.sensorLocationImage.index}、{item.detailedLocation}安狀位置圖</Text>
                                </View>
                            </View>
                            );
                        }
                        return null;
                        })}
                    </View>
                </View>
            </Page>
            {/* 第二章：最近狀態 */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>第貳章、狀態與趨勢分析</Text>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>1.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>最近狀態</Text>
                    <Text style={styles.text}>
                        {data?.reportSecondData.lastDate}之天氣溫度為{data?.reportSecondData.temperature}∘c、風速{data?.reportSecondData.windSpeed}m/s、風向{data?.reportSecondData.windDirection}∘。整體各參數狀態條列說明如下：          
                    </Text>
                    <View style={styles.ColSection}>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>A.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>量測震度：{data?.reportBasicData.bridgeName}整體之震度中位數為{data?.reportSecondData.bridgeData.seismic.Q2}，最大震度為{data?.reportSecondData.bridgeData.seismic.Q4}，最小震度為{data?.reportSecondData.bridgeData.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                            <Image src={`data:image/png;base64,${data?.reportSecondData.bridgeData.seismic.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportSecondData.bridgeData.seismic.chart.index}、整體震度</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>B.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：頻率值中位數為{data?.reportSecondData.bridgeData.centroidFrequency.Q2}，最大頻率值為{data?.reportSecondData.bridgeData.centroidFrequency.Q4}，最小頻率值為{data?.reportSecondData.bridgeData.centroidFrequency.Q0}，變化幅度達{data?.reportSecondData.bridgeData.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                            <Image src={`data:image/png;base64,${data?.reportSecondData.bridgeData.centroidFrequency.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportSecondData.bridgeData.centroidFrequency.chart.index}、整體基頻頻率值</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>C.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：阻尼比中位數為{data?.reportSecondData.bridgeData.dampingRatio.Q2}，最大阻尼比為{data?.reportSecondData.bridgeData.dampingRatio.Q4}，最小阻尼比為{data?.reportSecondData.bridgeData.dampingRatio.Q0}，變化幅度達{data?.reportSecondData.bridgeData.dampingRatio.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                            <Image src={`data:image/png;base64,${data?.reportSecondData.bridgeData.dampingRatio.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportSecondData.bridgeData.dampingRatio.chart.index}、整體基頻阻尼比</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>D.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：整體安全指標中位數為{data?.reportSecondData.bridgeData.health.Q2}，最大安全評估指標為{data?.reportSecondData.bridgeData.health.Q4}，最小安全評估指標為{data?.reportSecondData.bridgeData.health.Q0}，變化幅度達{data?.reportSecondData.bridgeData.health.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                            <Image src={`data:image/png;base64,${data?.reportSecondData.bridgeData.health.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportSecondData.bridgeData.health.chart.index}、整體安全評估指標</Text>
                            </View>
                        </View>
                        </View>
                    </View>
                    </View>
                </View>
            </Page>
            {/* 第二章：最近狀態_(Mapping)感測器資料 */}
            {data?.reportSecondData.sensorData.map((item, index) =>{
                return(
                    <Page key={index} size="A4" style={styles.page}>
                        <Text style={styles.text}>
                            編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}狀態條列說明如下：          
                        </Text>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>A.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>量測震度：震度中位數為{item.seismic.Q2}，最大震度為{item.seismic.Q4}，最小震度為{item.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.seismic.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}震度</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>B.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：頻率值中位數為{item.centroidFrequency.Q2}，最大頻率值為{item.centroidFrequency.Q4}，最小頻率值為{item.centroidFrequency.Q0}，變化幅度達{item.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.centroidFrequency.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}基頻頻率值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>C.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：阻尼比中位數為{item.dampingRatio.Q2}，最大阻尼比為{item.dampingRatio.Q4}，最小阻尼比為{item.dampingRatio.Q4}，變化幅度達{item.dampingRatio.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.dampingRatio.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.dampingRatio.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}基頻阻尼</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>D.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>{typeMapping[item.sensorLocation].type}值：{typeMapping[item.sensorLocation].type}中位數為{item.sensorFeature.Q2}，最大{typeMapping[item.sensorLocation].type}值為{item.sensorFeature.Q4}，最小{typeMapping[item.sensorLocation].type}為{item.sensorFeature.Q0}，變化幅度達{item.sensorFeature.variation}。{typeMapping[item.sensorLocation].type}下四分位數{item.sensorFeature.alertMessage}，{typeMapping[item.sensorLocation].type}狀態{item.sensorFeature.resultMessage}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.sensorFeature.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.sensorFeature.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}{typeMapping[item.sensorLocation].type}值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>E.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：整體安全指標中位數為{item.health.Q2}，最大安全評估指標為{item.health.Q4}，最小安全評估指標為{item.health.Q0}，變化幅度達{item.health.variation}。安全評估指標下四分位數{item.health.alertMessage}，{typeMapping[item.sensorLocation].name}安全評估結果為{item.health.resultMessage}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.health.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.health.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}安全評估指標</Text>
                            </View>
                            </View>
                        </View>
                    </Page>
                )
            })}
            {/* 第二章：月 */}
            <Page size="A4" style={styles.page}>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>2.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>月趨勢分析</Text>
                    <Text style={styles.text}>
                        以{data?.reportMonthData.startDate}至以{data?.reportMonthData.endDate}進行趨勢分析，其間{data?.reportBasicData?.bridgeName}整體各參數狀態條列如下：          
                    </Text>
                    <View style={styles.ColSection}>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>A.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>量測震度：逐時震度中位數為{data?.reportMonthData.bridgeData.seismic.Q2}，最大逐時震度為{data?.reportMonthData.bridgeData.seismic.Q4}，最小逐時震度為{data?.reportMonthData.bridgeData.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportMonthData.bridgeData.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportMonthData.bridgeData.seismic.chart.index}、整體逐時震度</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>B.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：逐時頻率值中位數為{data?.reportMonthData.bridgeData.centroidFrequency.Q2}，最大逐時頻率值為{data?.reportMonthData.bridgeData.centroidFrequency.Q4}，最小逐時頻率值為{data?.reportMonthData.bridgeData.centroidFrequency.Q0}，變化幅度達{data?.reportMonthData.bridgeData.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportMonthData.bridgeData.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportMonthData.bridgeData.centroidFrequency.chart.index}、整體逐時基頻頻率值</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>C.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：逐時阻尼比中位數為{data?.reportMonthData.bridgeData.dampingRatio.Q2}，最大逐時阻尼比為{data?.reportMonthData.bridgeData.centroidFrequency.Q4}，最小逐時阻尼比為{data?.reportMonthData.bridgeData.centroidFrequency.Q0}，變化幅度達{data?.reportMonthData.bridgeData.centroidFrequency.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportMonthData.bridgeData.dampingRatio.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportMonthData.bridgeData.dampingRatio.chart.index}、整體逐時基頻阻尼比</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>D.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：整體逐時安全指標中位數為{data?.reportMonthData.bridgeData.health.Q2}，最大逐時安全評估指標為{data?.reportMonthData.bridgeData.health.Q4}，最小逐時安全評估指標為{data?.reportMonthData.bridgeData.health.Q0}，變化幅度達{data?.reportMonthData.bridgeData.health.variation}。對整體逐時安全評估指標進行迴歸，其逐時變化趨勢為{data?.reportMonthData.bridgeData.health.slope}，{data?.reportMonthData.endDate}最終逐時安全評估指標值為{data?.reportMonthData.bridgeData.health.latestValue}，預計{data?.reportMonthData.bridgeData.health.timeToAlertIndex}小時後整體安全評估指標有降至告警值之風險；預計{data?.reportMonthData.bridgeData.health.timeToMoveIndex}小時後整體安全評估指標有降至行動值之風險。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportMonthData.bridgeData.health.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportMonthData.bridgeData.health.chart.index}、整體逐時安全評估指標</Text>
                            </View>
                        </View>
                        </View>
                    </View>
                    </View>
                </View>
            </Page>
            {/* 第二章：月_(Mapping)感測器資料 */}
            {data?.reportMonthData.sensorData.map((item, index) =>{
                return(
                    <Page key={index} size="A4" style={styles.page}>
                        <Text style={styles.text}>
                            編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}狀態條列說明如下：          
                        </Text>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>A.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>量測震度：逐時震度中位數為{item.seismic.Q2}，最大逐時震度為{item.seismic.Q4}，最小逐時震度為{item.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.seismic.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐時震度</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>B.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：逐時頻率值中位數為{item.centroidFrequency.Q2}，最大逐時頻率值為{item.centroidFrequency.Q4}，最小逐時頻率值為{item.centroidFrequency.Q0}，變化幅度達{item.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.centroidFrequency.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐時基頻頻率值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>C.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：逐時阻尼比中位數為{item.dampingRatio.Q2}，最大逐時阻尼比為{item.dampingRatio.Q4}，最小逐時阻尼比為{item.dampingRatio.Q4}，變化幅度達{item.dampingRatio.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.dampingRatio.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.dampingRatio.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐時基頻阻尼</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>D.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>{typeMapping[item.sensorLocation].type}值：{typeMapping[item.sensorLocation].type}中位數為{item.sensorFeature.Q2}，最大{typeMapping[item.sensorLocation].type}值為{item.sensorFeature.Q4}，最小{typeMapping[item.sensorLocation].type}為{item.sensorFeature.Q0}，變化幅度達{item.sensorFeature.variation}。對{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐時{typeMapping[item.sensorLocation].type}值中位數進行迴歸，其逐時變化趨勢為{item.sensorFeature.slope}，{data?.reportMonthData.endDate}最終逐時{typeMapping[item.sensorLocation].type}值為{item.sensorFeature.latestValue}，預計{item.sensorFeature.timeToAlertIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐時{typeMapping[item.sensorLocation].type}值有降至告警值之風險；預計{item.sensorFeature.timeToMoveIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐時{typeMapping[item.sensorLocation].type}值有降至行動值之風險。；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.sensorFeature.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.sensorFeature.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐時{typeMapping[item.sensorLocation].type}值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>E.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：逐時整體安全指標中位數為{item.health.Q2}，最大逐時安全評估指標為{item.health.Q4}，最小逐時安全評估指標為{item.health.Q0}，變化幅度達{item.health.variation}。對{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐時安全評估指標中位數進行迴歸，其逐時變化趨勢為{item.health.slope}，{data?.reportMonthData.endDate}最終逐時安全評估指標為{item.health.latestValue}，預計{item.health.timeToAlertIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至告警值之風險；預計{item.health.timeToMoveIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至行動值之風險。。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.health.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.health.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐時安全評估指標</Text>
                            </View>
                            </View>
                        </View>
                    </Page>
                )
            })}
            {/* 第二章：年 */}
            <Page size="A4" style={styles.page}>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>3.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>年趨勢分析</Text>
                    <Text style={styles.text}>
                        以{data?.reportYearData.startDate}至以{data?.reportYearData.endDate}進行趨勢分析，其間{data?.reportBasicData?.bridgeName}整體各參數狀態條列如下：
                    </Text>
                    <View style={styles.ColSection}>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>A.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>量測震度：逐日震度中位數為{data?.reportYearData.bridgeData.seismic.Q2}，最大逐日震度為{data?.reportYearData.bridgeData.seismic.Q4}，最小逐日震度為{data?.reportYearData.bridgeData.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportYearData.bridgeData.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportYearData.bridgeData.seismic.chart.index}、整體逐日震度</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>B.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：逐日頻率值中位數為{data?.reportYearData.bridgeData.centroidFrequency.Q2}，最大逐日頻率值為{data?.reportYearData.bridgeData.centroidFrequency.Q4}，最小逐日頻率值為{data?.reportYearData.bridgeData.centroidFrequency.Q0}，變化幅度達{data?.reportYearData.bridgeData.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportYearData.bridgeData.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportYearData.bridgeData.centroidFrequency.chart.index}、整體逐日基頻頻率值</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>C.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：逐日阻尼比中位數為{data?.reportYearData.bridgeData.dampingRatio.Q2}，最大逐日阻尼比為{data?.reportYearData.bridgeData.centroidFrequency.Q4}，最小逐日阻尼比為{data?.reportYearData.bridgeData.centroidFrequency.Q0}，變化幅度達{data?.reportYearData.bridgeData.centroidFrequency.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportYearData.bridgeData.dampingRatio.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportYearData.bridgeData.dampingRatio.chart.index}、整體逐日基頻阻尼比</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.RowSection}>
                        <Text style={styles.sort}>D.</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：整體逐日安全指標中位數為{data?.reportYearData.bridgeData.health.Q2}，最大逐日安全評估指標為{data?.reportYearData.bridgeData.health.Q4}，最小逐日安全評估指標為{data?.reportYearData.bridgeData.health.Q0}，變化幅度達{data?.reportYearData.bridgeData.health.variation}。對整體逐時安全評估指標進行迴歸，其逐時變化趨勢為{data?.reportYearData.bridgeData.health.slope}，{data?.reportYearData.endDate}最終逐時安全評估指標值為{data?.reportYearData.bridgeData.health.latestValue}，預計{data?.reportYearData.bridgeData.health.timeToAlertIndex}小時後整體安全評估指標有降至告警值之風險；預計{data?.reportYearData.bridgeData.health.timeToMoveIndex}小時後整體安全評估指標有降至行動值之風險。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportYearData.bridgeData.health.chart.base64}`} style={styles.image} />
                            <Text style={styles.remark}>圖{data?.reportYearData.bridgeData.health.chart.index}、整體逐日安全評估指標</Text>
                            </View>
                        </View>
                        </View>
                    </View>
                    </View>
                </View>
            </Page>
            {/* 第二章：年_(Mapping)感測器資料 */}
            {data?.reportYearData.sensorData.map((item, index) =>{
                return(
                    <Page key={index} size="A4" style={styles.page}>
                        <Text style={styles.text}>
                            編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}狀態條列說明如下：          
                        </Text>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>A.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>量測震度：逐日震度中位數為{item.seismic.Q2}，最大逐日震度為{item.seismic.Q4}，最小逐日震度為{item.seismic.Q0}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.seismic.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐日震度</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>B.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻頻率值：逐日頻率值中位數為{item.centroidFrequency.Q2}，最大逐日頻率值為{item.centroidFrequency.Q4}，最小逐日頻率值為{item.centroidFrequency.Q0}，變化幅度達{item.centroidFrequency.variation}；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.centroidFrequency.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐日基頻頻率值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>C.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>基頻阻尼比：逐日阻尼比中位數為{item.dampingRatio.Q2}，最大逐日阻尼比為{item.dampingRatio.Q4}，最小逐日阻尼比為{item.dampingRatio.Q4}，變化幅度達{item.dampingRatio.variation}。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.dampingRatio.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.dampingRatio.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐日基頻阻尼</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>D.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>{typeMapping[item.sensorLocation].type}值：{typeMapping[item.sensorLocation].type}中位數為{item.sensorFeature.Q2}，最大{typeMapping[item.sensorLocation].type}值為{item.sensorFeature.Q4}，最小{typeMapping[item.sensorLocation].type}為{item.sensorFeature.Q0}，變化幅度達{item.sensorFeature.variation}。對{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐日{typeMapping[item.sensorLocation].type}值中位數進行迴歸，其逐時變化趨勢為{item.sensorFeature.slope}，{data?.reportMonthData.endDate}最終逐日{typeMapping[item.sensorLocation].type}值為{item.sensorFeature.latestValue}，預計{item.sensorFeature.timeToAlertIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐日{typeMapping[item.sensorLocation].type}值有降至告警值之風險；預計{item.sensorFeature.timeToMoveIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐日{typeMapping[item.sensorLocation].type}值有降至行動值之風險。；</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.sensorFeature.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.sensorFeature.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐日{typeMapping[item.sensorLocation].type}值</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>E.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>安全評估指標：逐時整體安全指標中位數為{item.health.Q2}，最大逐日安全評估指標為{item.health.Q4}，最小逐日安全評估指標為{item.health.Q0}，變化幅度達{item.health.variation}。對{item.detailedLocation}{typeMapping[item.sensorLocation].name}之逐日安全評估指標中位數進行迴歸，其逐日變化趨勢為{item.health.slope}，{data?.reportMonthData.endDate}最終逐日安全評估指標為{item.health.latestValue}，預計{item.health.timeToAlertIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至告警值之風險；預計{item.health.timeToMoveIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至行動值之風險。。</Text>
                            <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${item.health.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{item.health.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}逐日安全評估指標</Text>
                            </View>
                            </View>
                        </View>
                    </Page>
                )
            })}
            {/* <Page size="A4" style={styles.page}>
            <Text style={styles.text}>
                編號L-44之鋼索狀態條列說明如下：          
            </Text>
            <View style={styles.RowSection} wrap={false}>
                <Text style={styles.sort}>A.</Text>
                <View style={styles.content}>
                <Text style={styles.text}>逐日震度中位數為V_Q2，最大逐日震度為V_Q4，最小逐日震度為V_Q0；</Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src="image/bridge/bridgeDemo.png" style={styles.image} />
                    <Text style={styles.remark}>圖4、L-44鋼索逐日震度</Text>
                </View>
                </View>
            </View>
            <View style={styles.RowSection} wrap={false}>
                <Text style={styles.sort}>B.</Text>
                <View style={styles.content}>
                <Text style={styles.text}>逐日頻率值中位數為f_Q2，最大逐日頻率值為f_Q4，最小逐日頻率值為f_Q0，變化幅度達(1- f_Q0/f_Q4)X100%；</Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src="image/bridge/bridgeDemo.png" style={styles.image} />
                    <Text style={styles.remark}>圖5、L-44鋼索逐日基頻頻率值</Text>
                </View>
                </View>
            </View>
            <View style={styles.RowSection} wrap={false}>
                <Text style={styles.sort}>C.</Text>
                <View style={styles.content}>
                <Text style={styles.text}>逐日阻尼比中位數為d_Q2，最大逐日阻尼比為d_Q4，最小逐日阻尼比為d_Q0，變化幅度達(1- d_Q0/d_Q4)X100%。</Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src="image/bridge/bridgeDemo.png" style={styles.image} />
                    <Text style={styles.remark}>圖6、L-44鋼索逐日基頻阻尼</Text>
                </View>
                </View>
            </View>
            <View style={styles.RowSection} wrap={false}>
                <Text style={styles.sort}>D.</Text>
                <View style={styles.content}>
                <Text style={styles.text}>逐日鋼索力中位數為C_Q2，最大逐日鋼索力值為C_Q4，最小逐日鋼索力為C_Q0，變化幅度達(1-C_Q0/C_Q4)X100%。對L-44剛索之逐日索力值中位數進行迴歸，其逐時變化趨勢為(中位數年迴歸斜率值)，2025年2月28日最終逐日索力值為C_e，預計((C_e-告警值)/中位數月迴歸斜率值) 日後L-44剛索之逐時索力值有降至行動值之風險；預計((C_e-行動值)/中位數月迴歸斜率值) 日後L-44剛索之逐時索力值有降至行動值之風險。</Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src="image/bridge/bridgeDemo.png" style={styles.image} />
                    <Text style={styles.remark}>圖7、L-44鋼索逐日索力值</Text>
                </View>
                </View>
            </View>
            <View style={styles.RowSection} wrap={false}>
                <Text style={styles.sort}>E.</Text>
                <View style={styles.content}>
                <Text style={styles.text}>逐日整體安全指標中位數為S_Q2，最大逐日安全評估指標為S_Q4，最小逐日安全評估指標為S_Q0，變化幅度達(1- S_Q0/S_Q4)X100%。對L-44剛索之逐日安全評估指標中位數進行迴歸，其逐日變化趨勢為(中位數年迴歸斜率值)，2025年2月28日最終逐日安全評估指標為S_e，預計((S_e-告警值)/中位數年迴歸斜率值)日後L-44剛索之逐日安全評估指標有降至告警值之風險；預計((S_e-行動值)/中位數年迴歸斜率值)日後L-44剛索之逐日安全評估指標有降至行動值之風險。</Text>
                <View style={styles.imageBox} wrap={false}>
                    <Image src="image/bridge/bridgeDemo.png" style={styles.image} />
                    <Text style={styles.remark}>圖7、L-44鋼索逐日安全評估指標</Text>
                </View>
                </View>
            </View>
            </Page> */}
            {/* 第三章：天災資料 地震事件列表  */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>第參章、天災事件影響</Text>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>1-1.</Text>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>{data?.reportBasicData.eventListDate}份地震事件列表</Text>
                        {data?.reportEarthquakeData ? (
                            <>
                                <Text style={styles.text}>
                                    {data?.reportBasicData.eventListDate}發生之地震事件。如下表所列          
                                </Text>
                                <View style={styles.tableBox}>
                                    <Text style={styles.remark}>表1、地震事件列表</Text>
                                    {/* 表頭 */}
                                    <View style={[styles.row, styles.header]}>
                                        <Text style={styles.cell}>天災編號</Text>
                                        <Text style={styles.cell}>開始時間</Text>
                                        <Text style={styles.cell}>結束時間</Text>
                                    </View>
                                    {/* 表格內容 */}
                                    {data?.reportEarthquakeData.earthquakeTable.map((item, index) => (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.cell}>{item.earthquakeId}</Text>
                                        <Text style={styles.cell}>{item.startTime}</Text>
                                        <Text style={styles.cell}>{item.endTime}</Text>
                                    </View>
                                    ))}
                                </View>
                            </>
                        ) : (
                            <Text style={styles.text}>
                                {data?.reportBasicData.eventListDate}未發生任何區域內的地震時間。
                            </Text>
                        )}
                        
                    </View>
                </View>
            </Page>
            {/* 第三章：天災資料 地震資訊與影響評估  */}
            {data?.reportEarthquakeData && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.RowSection}>
                        <Text style={styles.sort}>1-2.</Text>
                        <View style={styles.content}>
                        <Text style={styles.subtitle}>地震資訊與影響評估</Text>
                        <Text style={styles.text}>
                            {data?.reportBasicData.eventListDate}發生之地震事件。如下表所列          
                        </Text>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>A.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>第{data?.reportEarthquakeData.earthquakeId}號地震 之報告如下圖所示(中央氣象署地震報告)</Text>
                            <View style={styles.imageBox}>
                                <Image src={`data:image/png;base64,${data?.reportEarthquakeData.earthquakeReport.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportEarthquakeData.earthquakeReport.index}、{data?.reportEarthquakeData.earthquakeId}地震報告</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>B.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>第{data?.reportEarthquakeData.earthquakeId}號地震過程之影響評估</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>整體各參數狀態條列如下：</Text>
                                <Text style={styles.text}>{'\u25C6'} 最大震度：{data?.reportEarthquakeData.earthquakeRank}級</Text>
                                <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportEarthquakeData.bridgeData.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportEarthquakeData.bridgeData.seismic.chart.index}、整體震度</Text>
                                </View>
                                <Text style={styles.text}>{'\u25C6'} 地震過程最大頻率變化量：事件過程整體最小頻率為{data?.reportEarthquakeData.bridgeData.seismic.fMin}；整體最大頻率為{data?.reportEarthquakeData.bridgeData.seismic.fMax}。地震過程最大頻率變化量為{data?.reportEarthquakeData.bridgeData.seismic.featureRatio}。</Text>
                                <Text style={styles.text}>{'\u25C6'} 事件前後頻率比值：事件前整體頻率值為{data?.reportEarthquakeData.bridgeData.centroidFrequency.Q3}；事件後整體頻率值為{data?.reportEarthquakeData.bridgeData.centroidFrequency.Q1}。事件前後頻率比值為{data?.reportEarthquakeData.bridgeData.centroidFrequency.featureRatio}。事件前後頻率比值{data?.reportEarthquakeData.bridgeData.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{data?.reportEarthquakeData.bridgeData.centroidFrequency.resultMessage}。</Text>
                                <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportEarthquakeData.bridgeData.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportEarthquakeData.bridgeData.centroidFrequency.chart.index}、整體頻率</Text>
                                </View>
                            </View>
                            {/* 地震感測器Mapping */}
                            {data?.reportEarthquakeData.sensorData.map((item, index) =>{
                                return(
                                    <View key={index} style={styles.content}>
                                        <Text style={styles.text}>編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}各參數狀態條列如下：</Text>
                                        <Text style={styles.text}>{'\u25C6'} 最大震度：{data?.reportEarthquakeData.earthquakeRank}級</Text>
                                        <View style={styles.imageBox} wrap={false}>
                                        <Image src={`data:image/png;base64,${item.seismic.chart.base64}`} style={styles.image} />
                                        <Text style={styles.remark}>圖{item.seismic.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}震度</Text>
                                        </View>
                                        <Text style={styles.text}>{'\u25C6'} 地震過程最大頻率變化量：事件過程整體最小頻率為{item.seismic.fMin}；整體最大頻率為{item.seismic.fMax}。地震過程最大頻率變化量為{item.seismic.featureRatio}。</Text>
                                        <Text style={styles.text}>{'\u25C6'} 事件前後頻率比值：事件前整體頻率值為{item.centroidFrequency.Q3}；事件後整體頻率值為{item.centroidFrequency.Q1}。事件前後頻率比值為{item.centroidFrequency.featureRatio}。事件前後頻率比值{item.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{item.centroidFrequency.resultMessage}。</Text>
                                        <View style={styles.imageBox} wrap={false}>
                                        <Image src={`data:image/png;base64,${item.centroidFrequency.chart.base64}`} style={styles.image} />
                                        <Text style={styles.remark}>圖{item.centroidFrequency.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}頻率</Text>
                                        </View>
                                    </View>
                                )
                            })}
                            </View>
                        </View>
                        </View>
                    </View>
                </Page>
            )}
            {/* 第三章：天災資料 颱風事件列表  */}
            <Page size="A4" style={styles.page}>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>2-1.</Text>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>{data?.reportBasicData.eventListDate}份颱風事件列表</Text>
                        {data?.reportTyphoonData ? (
                            <>
                                <Text style={styles.text}>
                                {data?.reportBasicData.eventListDate}發生之颱風事件。如下表所列          
                                </Text>
                                <View style={styles.tableBox}>
                                    <Text style={styles.remark}>表2-1、颱風事件列表</Text>
                                    {/* 表頭 */}
                                    <View style={[styles.row, styles.header]}>
                                        <Text style={styles.cell}>天災編號</Text>
                                        <Text style={styles.cell}>開始時間</Text>
                                        <Text style={styles.cell}>結束時間</Text>
                                    </View>
                                    {/* 表格內容 */}
                                    {data?.reportTyphoonData.typhoonTable.map((item, index) => (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.cell}>{item.chtName}</Text>
                                        <Text style={styles.cell}>{item.startTime}</Text>
                                        <Text style={styles.cell}>{item.endTime}</Text>
                                    </View>
                                    ))}
                                </View>
                            </>
                        ) : (
                            <Text style={styles.text}>
                                {data?.reportBasicData.eventListDate}未發生任何區域內的颱風時間。
                            </Text>
                        )}
                        
                    </View>
                </View>
            </Page>
            {/* 第三章：天災資料 地震資訊與影響評估  */}
            {data?.reportTyphoonData && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.RowSection}>
                        <Text style={styles.sort}>2-2.</Text>
                        <View style={styles.content}>
                        <Text style={styles.subtitle}>颱風資訊與影響評估</Text>
                        <Text style={styles.text}>
                            {data?.reportBasicData.eventListDate}發生之地震事件。如下表所列          
                        </Text>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>A.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>{data?.reportTyphoonData.typhoonName}颱風之報告如下圖所示(中央氣象署颱風報告)</Text>
                            <View style={styles.imageBox} wrap={false}>
                                {/* {data?.reportTyphoonData.typhoonReport.base64.map((item, index) =>{
                                    <Image key={index} src={`data:image/png;base64,${item}`} style={styles.image} />
                                })} */}
                                <Image src={`data:image/png;base64,${data?.reportTyphoonData.typhoonReport.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportTyphoonData.typhoonReport.index}、{data?.reportTyphoonData.typhoonName}颱風報告</Text>
                            </View>
                            </View>
                        </View>
                        <View style={styles.RowSection}>
                            <Text style={styles.sort}>B.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>{data?.reportTyphoonData.typhoonName}颱風過程之影響評估</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>整體各參數狀態條列如下：</Text>
                                <Text style={styles.text}>{'\u25C6'} 最大震度：{data?.reportTyphoonData.typhoonRank}級</Text>
                                <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportTyphoonData.bridgeData.seismic.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportTyphoonData.bridgeData.seismic.chart.index}、整體震度</Text>
                                </View>
                                <Text style={styles.text}>{'\u25C6'} 颱風過程最大頻率變化量：事件過程整體最小頻率為{data?.reportTyphoonData.bridgeData.seismic.fMin}；整體最大頻率為{data?.reportTyphoonData.bridgeData.seismic.fMax}。颱風過程最大頻率變化量為{data?.reportTyphoonData.bridgeData.seismic.featureRatio}。</Text>
                                <Text style={styles.text}>{'\u25C6'} 事件前後頻率比值：事件前整體頻率值為{data?.reportTyphoonData.bridgeData.centroidFrequency.Q3}；事件後整體頻率值為{data?.reportTyphoonData.bridgeData.centroidFrequency.Q1}。事件前後頻率比值為{data?.reportTyphoonData.bridgeData.centroidFrequency.featureRatio}。事件前後頻率比值{data?.reportTyphoonData.bridgeData.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{data?.reportTyphoonData.bridgeData.centroidFrequency.resultMessage}。</Text>
                                <View style={styles.imageBox} wrap={false}>
                                <Image src={`data:image/png;base64,${data?.reportTyphoonData.bridgeData.centroidFrequency.chart.base64}`} style={styles.image} />
                                <Text style={styles.remark}>圖{data?.reportTyphoonData.bridgeData.centroidFrequency.chart.index}、整體頻率</Text>
                                </View>
                            </View>
                            {/* 颱風感測器Mapping */}
                            {data?.reportTyphoonData.sensorData.map((item, index) =>{
                                return(
                                    <View key={index} style={styles.content}>
                                        <Text style={styles.text}>編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}各參數狀態條列如下：</Text>
                                        <Text style={styles.text}>{'\u25C6'} 最大震度：{data?.reportTyphoonData.typhoonRank}級</Text>
                                        <View style={styles.imageBox} wrap={false}>
                                        <Image src={`data:image/png;base64,${item.seismic.chart.base64}`} style={styles.image} />
                                        <Text style={styles.remark}>圖{item.seismic.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}震度</Text>
                                        </View>
                                        <Text style={styles.text}>{'\u25C6'} 颱風過程最大頻率變化量：事件過程整體最小頻率為{item.seismic.fMin}；整體最大頻率為{item.seismic.fMax}。颱風過程最大頻率變化量為{item.seismic.featureRatio}。</Text>
                                        <Text style={styles.text}>{'\u25C6'} 事件前後頻率比值：事件前整體頻率值為{item.centroidFrequency.Q3}；事件後整體頻率值為{item.centroidFrequency.Q1}。事件前後頻率比值為{item.centroidFrequency.featureRatio}。事件前後頻率比值{item.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{item.centroidFrequency.resultMessage}。</Text>
                                        <View style={styles.imageBox} wrap={false}>
                                        <Image src={`data:image/png;base64,${item.centroidFrequency.chart.base64}`} style={styles.image} />
                                        <Text style={styles.remark}>圖{item.centroidFrequency.chart.index}、{item.detailedLocation}{typeMapping[item.sensorLocation].name}頻率</Text>
                                        </View>
                                    </View>
                                )
                            })}
                            </View>
                        </View>
                        </View>
                    </View>
                </Page>
            )}
            {/* 第四章：總結 */}
            <Page size="A4" style={styles.page}>
            <Text style={styles.title}>第肆章、結論</Text>
            <View style={styles.RowSection} >
                <Text style={styles.sort}>1.</Text>
                <View style={styles.content}>
                <Text style={styles.subtitle}>最近狀態</Text>
                {data?.reportSecondData.sensorData.map((item, index) =>{
                    return(
                        <View key={index} style={styles.RowSection}>
                            <Text style={styles.sort}>{String.fromCharCode(65 + index)}.</Text>
                            <View style={styles.content}>
                            <Text style={styles.text}>編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}受力狀態{item.sensorFeature.resultMessage}；安全評估指標下四分位數{item.health.alertMessage}，鋼索安全評估結果為{item.health.resultMessage}。</Text>
                            </View>
                        </View>
                    )
                })}
                </View>
            </View>
            <View style={styles.RowSection} >
                <Text style={styles.sort}>2.</Text>
                <View style={styles.content}>
                <Text style={styles.subtitle}>趨勢分析：</Text>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>A.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>月趨勢分析</Text>
                    {data?.reportMonthData.sensorData.map((item, index) =>{
                        return(
                            <Text key={index} style={styles.text}>
                                {data?.reportMonthData.endDate}最終逐時安全評估指標為{item.health.latestValue}，預計{item.health.timeToAlertIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至告警值之風險；預計{item.health.timeToMoveIndex}小時後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至行動值之風險。
                            </Text>
                        )
                    })}
                    </View>
                </View>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>B.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>年趨勢分析</Text>
                    {data?.reportYearData.sensorData.map((item, index) =>{
                        return(
                            <Text key={index} style={styles.text}>
                                {data?.reportYearData.endDate}最終逐日安全評估指標為{item.health.latestValue}，預計{item.health.timeToAlertIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至告警值之風險；預計{item.health.timeToMoveIndex}日後{item.detailedLocation}{typeMapping[item.sensorLocation].name}之安全評估指標有降至行動值之風險。
                            </Text>
                        )
                    })}
                    </View>
                </View>
                {/* <View style={styles.RowSection}>
                    <Text style={styles.sort}>A.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>2025年2月28日最終逐時安全評估指標為S_e，預計((S_e-告警值)/中位數月迴歸斜率值)小時後L-44剛索之安全評估指標有降至告警值之風險；預計((S_e-行動值)/中位數月迴歸斜率值)小時後L-44鋼索之安全評估指標有降至行動值之風險。</Text>
                    </View>
                </View>
                <View style={styles.RowSection}>
                    <Text style={styles.sort}>B.</Text>
                    <View style={styles.content}>
                    <Text style={styles.subtitle}>2025年2月28日最終逐日安全評估指標為S_e，預計((S_e-告警值)/中位數年迴歸斜率值)日後L-44剛索之逐日安全評估指標有降至告警值之風險；預計((S_e-行動值)/中位數年迴歸斜率值)日後L-44剛索之逐日安全評估指標有降至行動值之風險。</Text>
                    </View>
                </View> */}
                </View>
            </View>
            <View style={styles.RowSection} >
                <Text style={styles.sort}>3.</Text>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>事件評估：</Text>
                    <View style={styles.RowSection}>
                        <Text style={styles.sort}>A.</Text>
                        <View style={styles.content}>
                            {data?.reportEarthquakeData ? (
                                <Text style={styles.subtitle}>第{data?.reportEarthquakeData.earthquakeId}號地震</Text>
                            ):(
                                <Text style={styles.subtitle}>本月並未發生地震</Text>
                            )}
                            {data?.reportEarthquakeData?.sensorData.map((item, index) =>{
                                return(
                                    <Text key={index} style={styles.text}>
                                        {'\u25C6'} 編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}：事件前後頻率比值{item.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{item.centroidFrequency.resultMessage}。
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.RowSection}>
                        <Text style={styles.sort}>B.</Text>
                        <View style={styles.content}>
                        {data?.reportTyphoonData ? (
                                <Text style={styles.subtitle}>{data?.reportTyphoonData.typhoonName}颱風</Text>
                            ):(
                                <Text style={styles.subtitle}>本月並未發生颱風</Text>
                            )}
                        {data?.reportTyphoonData?.sensorData.map((item, index) =>{
                            return(
                                <Text key={index} style={styles.text}>
                                    {'\u25C6'} 編號{item.detailedLocation}之{typeMapping[item.sensorLocation].name}：事件前後頻率比值{item.centroidFrequency.alertMessage}，整體系統安全評估結果結果為{item.centroidFrequency.resultMessage}。
                                </Text>
                            )
                        })}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.RowSection} >
                <Text style={styles.sort}>4.</Text>
                <View style={styles.content}>
                <Text style={styles.subtitle}>結論：</Text>
                <Text style={styles.text}>
                    {result}
                </Text>
                </View>
            </View>
            </Page>
        </Document>
    )
    
}

export default MyDocument;
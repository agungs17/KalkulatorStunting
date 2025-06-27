import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg from 'react-native-svg';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryTooltip,
  VictoryLegend,
} from 'victory-native';
import { COLORS } from '../../utils/themes';
import { configLineChart, findArray, HeightPercentageToDP } from '../../utils/script';
import { dataSD, orderSD, sdColors } from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const heightChart = HeightPercentageToDP('48%')

const LineChart = ({ 
  type = 'tinggi', // berat || tinggi || tinggivsberat
  gender = "P", // L || P
  dataHistoryChildren = [
    { age_in_months: 0, weight: 3.1, height: 50, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1"  },
    { age_in_months: 1, weight: 3.5, height: 51, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 1, weight: 3.9, height: 52, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 2, weight: 4.7, height: 54, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 20, weight: 10.3, height: 80, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 30, weight: 12.1, height: 85, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 45, weight: 14.2, height: 95, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 57, weight: 15.8, height: 100, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 58, weight: 15.8, height: 101, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 59, weight: 15.8, height: 102, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
    { age_in_months: 60, weight: 15.8, height: 103, z_score_weight : "+3.1", z_score_height : "+3.1", z_score_heightvsweight : "+3.1" },
  ]
}) => {
  const dataUsed = dataSD?.[type]

  if(!dataUsed) return null

  const dataChartType = findArray(dataUsed, { jenis_kelamin: gender });
  const dataChart = configLineChart(dataChartType, type);
  const { domain, chartKey, dataKey } = dataChart || {}
  const { x : xChartKey } = chartKey
  const { x : xDataKey, y : yDataKey, zScore } = dataKey
  const { y, x } = domain

  return (
    <View style={{ paddingVertical: 10 }}>
      <Svg width={screenWidth} height={heightChart}>
        <VictoryChart
          width={screenWidth}
          height={heightChart}
          domain={{ x, y }}
          padding={{ top: 30, bottom: 50, left: 60, right: 20 }}
          standalone={false}
        >
          <VictoryLegend
            x={screenWidth / 2 - 50}
            orientation="horizontal"
            gutter={20}
            style={{
              border: { stroke: "transparent" },
              labels: { fontSize: 10 },
            }}
            data={[
              {
                name: "Data Anak",
                symbol: {
                  fill: COLORS.WHITE,
                  stroke: COLORS.BLACK,
                  type: "circle",
                },
              },
              {
                name: "Garis Anak",
                symbol: {
                  fill: COLORS.BLACK,
                  type: "minus",
                },
              },
            ]}
          />

          <VictoryAxis
            label={dataChart.xLine.title}
            tickValues={dataChart.xLine.data}
            style={{
              axisLabel: { padding: 30, fontSize: 12 },
              tickLabels: { fontSize: 10 },
              grid: {
                stroke: "#D9D9D9",
                strokeDasharray: "4,4",
              },
            }}
          />

          <VictoryAxis
            dependentAxis
            label={dataChart.yLine.title}
            tickValues={dataChart.yLine.data}
            style={{
              axisLabel: { padding: 40, fontSize: 12 },
              tickLabels: { fontSize: 10 },
              grid: {
                stroke: "#D9D9D9",
                strokeDasharray: "4,4",
                strokeOpacity: ({ tick }) => tick === Math.min(...dataChart.yLine.data) || tick === Math.max(...dataChart.yLine.data) ? 0 : 1,
              },
            }}
          />

          {orderSD.map((key) => (
            <VictoryLine
              key={key}
              data={dataChart.sd.map((d) => ({
                x: d?.[xChartKey] || [],
                y: d[key],
              }))}
              style={{
                data: {
                  stroke: sdColors[key],
                  strokeWidth: 1,
                },
              }}
            />
          ))}

          <VictoryLine
            data={dataHistoryChildren.map((d) => ({
              x: d?.[xDataKey] || [],
              y: d?.[yDataKey] || [],
            }))}
            style={{
              data: {
                stroke: COLORS.BLACK,
                strokeWidth: 1.2,
              },
            }}
          />

          <VictoryScatter
            data={dataHistoryChildren.map((d) => ({
               x: d?.[xDataKey] || [],
               y: d?.[yDataKey] || [],
              label: ` ${dataChart.xLine.title} : ${d?.[xDataKey] || ''} \n ${dataChart.yLine.title} : ${d?.[yDataKey] || ''} \n Z-score : ${d?.[zScore] || ''} `,
            }))}
            size={4}
            style={{
              data: {
                fill: COLORS.WHITE,
                stroke: COLORS.BLACK,
                strokeWidth: 1.2,
              },
            }}
            labels={({ datum }) => datum.label}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                flyoutStyle={{ fill: COLORS.WHITE }}
                flyoutPadding={{ top: 4, bottom: 4, left: 7, right: 7 }}
                style={{ fontSize: 10 }}
              />
            }
          />
        </VictoryChart>
      </Svg>
    </View>
  );
};

export default LineChart;

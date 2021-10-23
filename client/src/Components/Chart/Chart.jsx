import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { dataForVaccine, dataForAge, dataForInjectionUnit } from "./data";
export const ChartForVaccine = () => {
  return (
    <div className='row'>
      <div className='col'>
        <div
          style={{ margin: "2rem", width: "100%", height: "400px" }}
          className='d-flex justify-content-center align-items-center'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={dataForVaccine}
              margin={{
                top: 20,
                right: 0,
                bottom: 20,
              }}
              maxBarSize={50}
              barCategoryGap={"2%"}
            >
              <CartesianGrid strokeDasharray='5 5' />
              <XAxis dataKey='name'>
                <Label
                  value='Biểu đồ tiêm chủng theo vaccine'
                  offset={0}
                  position='bottom'
                  style={{ fontSize: 20, fontWeight: "600" }}
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Legend verticalAlign='top' height={50} />
              <Bar dataKey='VeroCell' stackId='a' fill='#8884d8' />
              <Bar dataKey='Moderna' stackId='a' fill='#82ca9d' />
              <Bar dataKey='AstraZeneca' stackId='a' fill='#ffc658' />
              <Bar dataKey='Pfizer' stackId='a' fill='#DE7970' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export const ChartForAge = () => {
  return (
    <div className='row '>
      <div className='col'>
        <div
          style={{ margin: "2rem", width: "100%", height: "400px" }}
          className='d-flex justify-content-center align-items-center '
        >
          <ResponsiveContainer>
            <BarChart
              data={dataForAge}
              margin={{
                top: 20,
                right: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name'>
                <Label
                  value='Biểu đồ tiêm chủng theo độ tuổi'
                  offset={0}
                  position='bottom'
                  style={{ fontSize: 20, fontWeight: "600", margin: 20 }}
                />
              </XAxis>
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => {
                  if (props.name === "less_18") {
                    props.name = "< 18 tuổi";
                  }
                  if (props.name === "greater_18") {
                    props.name = " >= 18 tuổi";
                  }
                  if (props.name === "greater_60") {
                    props.name = " >= 60 tuổi";
                  }
                  return [value, props.name];
                }}
              />
              <Legend
                verticalAlign='top'
                height={50}
                formatter={(value, entry, index) => {
                  if (value === "less_18") {
                    value = "< 18 tuổi";
                  }
                  if (value === "greater_18") {
                    value = ">= 18 tuổi";
                  }
                  if (value === "greater_60") {
                    value = ">= 60 tuổi";
                  }
                  return value;
                }}
              />
              <Bar dataKey='less_18' fill='#8884d8' />
              <Bar dataKey='greater_18' fill='#82ca9d' />
              <Bar dataKey='greater_60' fill='#ffc658' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const ChartForInjectionUnitCol = () => {
  return (
    <div className='row '>
      <div className='col'>
        <div
          style={{ margin: "2rem", width: "100%", height: "400px" }}
          className='d-flex justify-content-center align-items-center '
        >
          <ResponsiveContainer>
            <BarChart
              data={dataForInjectionUnit}
              margin={{
                top: 20,
                right: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name'>
                <Label
                  value='Biểu đồ tiêm chủng theo độ tuổi'
                  offset={0}
                  position='bottom'
                  style={{ fontSize: 20, fontWeight: "600", margin: 20 }}
                />
              </XAxis>
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => {
                  if (props.name === "less_18") {
                    props.name = "< 18 tuổi";
                  }
                  if (props.name === "greater_18") {
                    props.name = " >= 18 tuổi";
                  }
                  if (props.name === "greater_60") {
                    props.name = " >= 60 tuổi";
                  }
                  return [value, props.name];
                }}
              />
              <Legend
                verticalAlign='top'
                height={50}
                formatter={(value, entry, index) => {
                  if (value === "less_18") {
                    value = "< 18 tuổi";
                  }
                  if (value === "greater_18") {
                    value = ">= 18 tuổi";
                  }
                  if (value === "greater_60") {
                    value = ">= 60 tuổi";
                  }
                  return value;
                }}
              />
              <Bar dataKey='da_dang_ky' fill='#8884d8' />
              <Bar dataKey='da_tiem' fill='#82ca9d' />
              <Bar dataKey='phan_ung' fill='#ffc658' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

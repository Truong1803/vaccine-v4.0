import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getAPI } from "../../api/FetchData";
import { getDataVaccine } from "../../redux/actions/vaccineAction";

export const ChartForVaccine = ({ provinceId, startDate, endDate }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FC35A7",
    "#FF2E6F",
    "#8830F0",
    "#28a745",
  ];
  const distpatch = useDispatch();

  const [dataForVaccine, setDataForVaccine] = useState([]);

  const { vaccine } = useSelector((state) => state);
  useEffect(() => {
    const getData = async () => {
      const res = await getAPI(
        `/report/report-injection-organ-chart?provinceId=${provinceId}&startDate=${startDate}&endDate=${endDate}`
      );
      setDataForVaccine(res.data.data);
    };
    getData();
  }, [provinceId, startDate, endDate]);
  useEffect(() => {
    distpatch(getDataVaccine());
  }, [distpatch]);

  return (
    <div className='row justify-content-center align-items-center'>
      <div className='col-10'>
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
              barCategoryGap={"5%"}
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
              <Legend verticalAlign='top' height={70} />
              {vaccine.map((item, index) => (
                <Bar
                  dataKey={item.name_vaccine}
                  stackId={1}
                  fill={COLORS[index]}
                  key={item._id}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export const ChartForAge = ({ provinceId, startDate, endDate }) => {
  const [dataForAge, setDataForAge] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getAPI(
        `/report/report-injection-age?provinceId=${provinceId}&startDate=${startDate}&endDate=${endDate}`
      );

      let data = [];
      for (const item of res.data.data) {
        data.push({
          name: item?.healthOrganization?.name,
          less_18: item.agelt18,
          greater_18: item.agegte18,
          greater_60: item.agegte60,
        });
      }
      setDataForAge(data);
    };
    getData();
  }, [provinceId, startDate, endDate]);
  return (
    <div className='row justify-content-center align-items-center'>
      <div className='col-10'>
        <div
          style={{ margin: "2rem", width: "100%", height: "400px" }}
          className='d-flex justify-content-center align-items-center '
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={dataForAge}
              margin={{
                top: 20,
                right: 0,
                bottom: 20,
                left: 90,
              }}
              maxBarSize={50}
              barCategoryGap={"5%"}
            >
              <CartesianGrid strokeDasharray='5 5' />
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

export const BarChartForInjectionUnit = ({ data, label, key_data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className=' row '>
      <div className='col'>
        <div
          style={{ width: "100%", height: "550px" }}
          className='d-flex justify-content-center align-items-center '
        >
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 0,
                bottom: 20,
              }}
              maxBarSize={50}
              barCategoryGap={"5%"}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => {
                  if (props.name === "da_dang_ky") {
                    props.name = "Đã đăng ký";
                  }
                  if (props.name === "da_tiem") {
                    props.name = "Đã tiêm";
                  }
                  if (props.name === "phan_ung") {
                    props.name = "Phản ứng sau tiêm";
                  }

                  return [value, props.name];
                }}
              />
              <Legend
                verticalAlign='bottom'
                height={40}
                formatter={(value, entry, index) => {
                  if (value === "da_dang_ky") {
                    value = "Đã đăng ký";
                  }
                  if (value === "da_tiem") {
                    value = "Đã tiêm";
                  }
                  if (value === "phan_ung") {
                    value = "Phản ứng sau tiêm";
                  }

                  return value;
                }}
              />

              {key_data.map((item, index) => {
                return (
                  <Bar
                    dataKey={item}
                    fill={COLORS[index + (1 % COLORS.length)]}
                    stackId='a'
                    key={index}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
export const PieChartForInjectionUnit = ({ label, key_data, data }) => {
  const COLORS = [
    "#0088FE",
    "$FF8042 ",
    "#0088FE",
    "#FF8042",
    "#FFBB28",
    "#0088FE",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className='row '>
      <div className='col'>
        <div
          style={{ width: "90%", height: "550px" }}
          className='d-flex justify-content-center align-items-center '
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey={key_data}
                isAnimationActive={false}
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index + (2 % COLORS.length)]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign='bottom' height={40} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

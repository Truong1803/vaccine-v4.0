import React from "react";
import { ChartForAge, ChartForVaccine } from "../../Components/Chart/Chart";
import {
  TableDataForAge,
  TableDataForVaccine,
} from "../../Components/Chart/TableData";
import TopData from "../../Components/Chart/TopData";

function Dashboard() {
  return (
    <div>
      <TopData />
      <TableDataForVaccine />
      <ChartForVaccine />
      <TableDataForAge />
      <ChartForAge />
    </div>
  );
}

export default Dashboard;

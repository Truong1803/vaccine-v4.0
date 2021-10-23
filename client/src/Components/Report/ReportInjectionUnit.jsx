import React from "react";
import { ChartForInjectionUnitCol } from "../Chart/Chart";
import { TableDataForInjectionUnit } from "../Chart/TableData";

function ReportInjectionUnit() {
  return (
    <>
      <TableDataForInjectionUnit />
      <div className='row'>
        <div className='col-6'>
          <ChartForInjectionUnitCol />
        </div>
      </div>
    </>
  );
}

export default ReportInjectionUnit;

import "./home.css";

import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { activeEmail } from "../../redux/actions/authActions";
import {
  TableDataForAge,
  TableDataForVaccine,
} from "../../Components/Chart/TableData";
import TopData from "../../Components/Chart/TopData";
import { ChartForAge, ChartForVaccine } from "../../Components/Chart/Chart";

function Home() {
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(activeEmail({ active_token: slug }));
    }
  }, [slug]);
  return (
    <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
      <TopData />
      <TableDataForVaccine />
      <ChartForVaccine />
      <TableDataForAge />
      <ChartForAge />
    </div>
  );
}

export default Home;

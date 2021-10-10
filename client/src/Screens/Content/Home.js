import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { postAPI } from "../../api/FetchData";
import Toast from "../../Components/alert/Toast";
import { activeEmail } from "../../redux/actions/authActions";
import "./home.css";
function Home() {
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(activeEmail({ active_token: slug }));
    }
  }, [slug]);
  return <div className="bg-home"></div>;
}

export default Home;

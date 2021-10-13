import './home.css';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { activeEmail } from '../../redux/actions/authActions';

function Home() {
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(activeEmail({ active_token: slug }));
    }
  }, [slug]);
  return <div>Home</div>;
}

export default Home;

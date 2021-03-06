import React from 'react';

import { useSelector } from 'react-redux';

import LeftBar from '../../Components/Nav/LeftBar';
import TopBar from '../../Components/Nav/TopBar';

function Menu() {
  const { auth } = useSelector((state) => state);
  return (
    <>
      {auth.user?.role !== 1 &&
      auth.user?.role !== 2 &&
      Object.keys(auth).length !== 0 &&
      auth !== "pending" ? (
        <>
          <TopBar />
          <LeftBar />
        </>
      ) : (
        <TopBar />
      )}
    </>
  );
}

export default Menu;

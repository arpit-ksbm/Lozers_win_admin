import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import * as CommonActions from '../redux/actions/commonAction';

const Layout = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(state => state?.commonReducer);

  const handleClickOutside = () => {
    dispatch(CommonActions.setIsSidebarOpne(!isSidebarOpen));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        dispatch(CommonActions.setIsSidebarOpne(true));
      } else if (window.innerWidth < 900) {
        dispatch(CommonActions.setIsSidebarOpne(false));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
          {/* <Header /> */}
          <main style={{ color: "#000", backgroundColor: "#F4F5F9", minHeight: "100vh" }}>
            <Outlet />
          </main>
        </div>
        <div onClick={handleClickOutside} className={`overlay ${isSidebarOpen ? "show" : ""}`}></div>
      </div>
    </>
  );
};

export default Layout;
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo_icon from "../../assets/images/logo.png";
import MobileLogo from "../../assets/images/logo_small.png";
import SidebarMenu from "../../components/features/SidebarMenu";
import { RouteName } from '../../utils/route-name';
import "../../assets/styles/sidebar.css";

const SideBar = () => {
  const { isSidebarOpen } = useSelector(state => state?.commonReducer);
  const { adminPermissionData: adminPermission } = useSelector(state => state?.authReducer);

  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setHiddenSidebarWidth(65);
      else setHiddenSidebarWidth(0);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <motion.div animate={{ width: isSidebarOpen ? "240px" : `${hiddenSidebarWidth}px` }} className={`sidebar`}>
        {isSidebarOpen ? (
          <div className="top_section">
            <img src={logo_icon} style={{ width: 170, height: 60 }} />
          </div>
        ) : (
          <div className="top_section_icon">
            <img src={MobileLogo} style={{ width: 30, height: 30 }} />
          </div>
        )}

        <section className="routes">
          {RouteName.map((route, index) => {
            const permittedData = adminPermission && adminPermission.find(curr => curr === route?.name);

            if (permittedData === route.name && route.subRoutes) {
              // if (route.subRoutes) {
              return (
                <SidebarMenu route={route} key={index} showAnimation={showAnimation} />
              );
            }

            return (
              <div key={index} className={`${permittedData == route.name ? 'side_Bar' : 'display-none'}`}>
                <NavLink to={permittedData == route.name && route.path} className="link" activeclassname="active">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            );
          })}
        </section>
      </motion.div>
    </>
  );
};

export default SideBar;
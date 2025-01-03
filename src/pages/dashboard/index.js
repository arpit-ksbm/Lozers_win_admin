import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header";
import { Color } from "../../assets/color";
import * as DashboardAction from '../../redux/actions/dashboardAction';
import { useDispatch, useSelector } from "react-redux";


export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state?.dashboardReducer);

  useEffect(() => {
    dispatch(DashboardAction?.getDashboard());
  }, [dispatch]);

  console.log(dashboardData, "dashboarddata ggg");
  

  return (
    <>
      <Header />

      <div style={{ padding: "20px", backgroundColor: '#F0EEEE' }}>
        <div style={{ padding: "3px 5px 10px 5px" }}>
          <div style={{ fontWeight: "600", fontSize: "25px" }}>Dashboard</div>
        </div>

        <Grid container spacing={2}>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Today Biding Amount</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>50,689</div>
                </div>
                <img src={require("../../assets/images/icon1.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Today Winning Amount</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>40,689</div>
                </div>
                <img src={require("../../assets/images/Icon2.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Total Users</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>{dashboardData.users}</div>
                </div>
                <img src={require("../../assets/images/Icon3.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Active Users</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>{dashboardData?.activeUser}</div>
                </div>
                <img src={require("../../assets/images/Icon4.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Today Deposit</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>{dashboardData?.totalDeposit}</div>
                </div>
                <img src={require("../../assets/images/Icon4.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <div className="TopCard" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "15px", color: Color.white }}>Today Withdraw</div>
                  <div style={{ fontSize: "25px", fontWeight: "600" }}>{dashboardData?.totalWithdraw}</div>
                </div>
                <img src={require("../../assets/images/Icon4.png")} style={{ height: "40px", width: "40px" }} />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

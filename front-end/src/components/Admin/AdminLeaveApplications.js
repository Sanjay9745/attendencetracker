import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminSideNav from "./AdminSideNav";
import { useNavigate } from "react-router-dom";
import AdminLeaveTable from "./AdminLeaveTable";
import "../../styles/dashboard.css";

function AdminLeaveApplications() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(localStorage.getItem("logo"));
const [data,setData] =useState([])
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": adminToken,
      };

      axios
        .get("/api/admin/protected", { headers })
        .then((res) => {
          if (res.status === 200) {
            if (!logo) {
              axios.get("/api/admin/admin-details", { headers }).then((res) => {
                if (res.status === 200) {
                  localStorage.setItem("logo", res.data.logo);
                  setLogo(res.data.logo);
                }
              });
            }
          } else {
            navigate("/admin/login");
          }
        })
        .catch(() => localStorage.removeItem("adminToken"));
    } else {
      navigate("/admin/login");
    }
  }, [logo, navigate]);
  useEffect(()=>{
    const headers = {
      "Content-Type": "application/json",
      "x-access-token":  localStorage.getItem("adminToken"),
    };
    axios.get("/api/admin/all-leave-applications",{headers}).then((res)=>{
      if(res.status===200){
        setData(res.data);
      }
    })
    
  })
  return (
    <>
      <AdminNavbar logo={logo} />
      <div className="dashboard">
        <AdminSideNav logo={logo} />

        <AdminLeaveTable data={data}/>
      </div>
    </>
  );
}

export default AdminLeaveApplications;

import Sidebar from "./Sidebar";
import "./styles/common.scss";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="row layout-container">
      <div className="col-2 sidebar-container">
        <Sidebar />
      </div>
      <div className="col-10 child-container">
        <Outlet />
      </div>
    </div>
  );
}

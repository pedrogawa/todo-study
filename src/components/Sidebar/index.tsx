import { useMemo, useState } from "react";

import "./styles.css";

import { BsPlus, BsListTask } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { RiDashboardFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { useMediaQuery } from "../../utils/useMediaQuery";

export default function Sidebar() {
  const isSmall = useMediaQuery("(min-width: 1200px)");

  const sideBarIcons = useMemo(() => {
    if (isSmall) {
      return (
        <ul>
          <li className="active">All tasks (11)</li>
          <li>To do (4)</li>
          <li>In progress (4)</li>
          <li>Done (3)</li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className="active">
            <RiDashboardFill size={26} />
          </li>
          <li>
            <BsListTask size={32} />
          </li>
          <li>
            <FaTasks size={26} />
          </li>
          <li>
            <GoTasklist size={26} />
          </li>
        </ul>
      );
    }
  }, [isSmall]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Tasks</h1>
        <div className="sidebar-icon">
          <BsPlus size={22} />
        </div>
      </div>
      {sideBarIcons}
    </div>
  );
}

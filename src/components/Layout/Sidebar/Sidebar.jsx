import { useState } from "react";
import "./Sidebar.scss";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { HiOutlineUserGroup } from "react-icons/hi2";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProSidebar collapsed={collapsed} className="app">
      <Menu>
        <MenuItem
          className="menu1"
          icon={<MenuRoundedIcon />}
          onClick={() => setCollapsed(!collapsed)}
        >
          <h2> RemitBae</h2>
        </MenuItem>
        {/* Business */}
        <MenuItem className="sub_menus">Business </MenuItem>
        <NavLink to="/admin/dashboaed">
          <MenuItem
            icon={<DashboardOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/stocks">
          <MenuItem
            icon={<DashboardOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            Stocks
          </MenuItem>
        </NavLink> 
      

        <NavLink to="/admin/sales">
          <MenuItem
            icon={<DashboardOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            Sales
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/clients">
          <MenuItem
            icon={<DashboardOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            Clients
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/quotation-generator">
          <MenuItem
            icon={<DashboardOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            Quotation
          </MenuItem>
        </NavLink>
        
        {/* Accounts */}
        <MenuItem className="sub_menus">Accounts </MenuItem>
        <NavLink to="/admin/dash2">
          <MenuItem
            icon={<PeopleAltOutlinedIcon style={{ fontSize: "20px" }} />}
          >
            
            Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/holidays">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
          Vouchers
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/leaderboard">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
          Reports
          </MenuItem>
        </NavLink>
        {/* Human resources */}
        <MenuItem className="sub_menus">Human resources </MenuItem>
        <NavLink to="/admin/dash3">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
            
          Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/employees">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
          Employes
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/customers">
          <MenuItem icon={<HiOutlineUserGroup style={{ fontSize: "20px" }} />}>
          Attendance
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/forex">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
          Salary
          </MenuItem>
        </NavLink>
        <NavLink to="/admin/forex2">
          <MenuItem icon={<GridViewRoundedIcon style={{ fontSize: "20px" }} />}>
          Holidays
          </MenuItem>
        </NavLink>
        {/* Settings */}
        <MenuItem className="sub_menus">Settings </MenuItem>
        
        
       
      </Menu>
    </ProSidebar>
  );
}

export default Sidebar;

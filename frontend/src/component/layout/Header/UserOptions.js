import React,{Fragment, useState} from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UserOptions = ({user}) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Profile.png"}
            alt="Profile"
          />
        }
        >
        <SpeedDialAction icon={<DashboardIcon/>} tooltipOpen="Dashboard"/>
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
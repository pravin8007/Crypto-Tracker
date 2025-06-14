import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from "react-router-dom";
import ThemeToggleButton from "../../Theme/ThemeToggleButton";

export default function AnchorTemporaryDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon style={{ color: "var(--white)" }} />
            </IconButton>
            <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
                <div className="drawer-div">
                    <Link to="/" className='link'>Home</Link>
                    <Link to="/compare" className='link'>Compare</Link>
                    <Link to="/dashboard" className='link' >Dashboard</Link>
                   <div className='toggle-btn'> <ThemeToggleButton /></div>
                </div>
            </Drawer>
        </div>
    );
}

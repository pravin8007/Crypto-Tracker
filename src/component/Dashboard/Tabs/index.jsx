import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./styles.css";
import Grid from "../Grid";
import List from "../List";
import { Button } from "@mui/material";

export default function TabsComponent({ coins, clearSearch, search }) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontFamily: "Inter",
        fontWeight: "600",
        textTransform: "capitalize",
    };

    return (
        <div className="tabs-container">
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Grid" value="grid" sx={style} />
                    <Tab label="List" value="list" sx={style} />
                </TabList>

                {
                    coins.length > 0 ? <div>
                        <TabPanel value="grid">
                            <div className="grid-flex">
                                {coins.map((coin, index) => (
                                    <Grid coin={coin} key={coin.id} index={index} search={search} />
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel value="list" className="list-tab-panel">
                            <table className="table">
                                <tbody>
                                    {coins.map((coin, index) => (
                                        <List coin={coin} key={coin.id} index={index} search={search} />
                                    ))}
                                </tbody>
                            </table>
                        </TabPanel>
                    </div>
                        :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <h4 style={{ color: "var(--white)", textAlign: "center" }}>No coins Available</h4>
                            <Button variant="outlined" onClick={clearSearch}>
                                Clear Search
                            </Button>
                        </div>
                }
            </TabContext>

        </div>
    );
}

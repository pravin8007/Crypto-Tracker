import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./styles.css";

export default function Pricetype({ priceType, handlePriceTypeChange }) {
    return (
        <div className="toggle-prices">
            <ToggleButtonGroup
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                sx={{
                    borderRadius: "8px",
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid var(--blue)",
                        color: "var(--blue)",
                        fontWeight: 500,
                        padding: "10px 16px",
                        "&.Mui-selected": {
                            backgroundColor: "var(--blue)",
                            color: "#fff",
                        },
                        "&:hover": {
                            backgroundColor: "rgba(58, 128, 233, 0.1)",
                        },
                    },
                }}
            >
                <ToggleButton value="prices" className="toggle-btn">
                    Price
                </ToggleButton>
                <ToggleButton value="total_volumes" className="toggle-btn">
                    Total Volume
                </ToggleButton>
                <ToggleButton value="market_caps" className="toggle-btn">
                    Market Cap
                </ToggleButton>

            </ToggleButtonGroup>
        </div>
    );
}

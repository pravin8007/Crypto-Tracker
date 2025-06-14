import React, { useEffect, useState } from 'react'
import { get100coins } from '../../../function/get100Coins';
import { MenuItem, Select } from '@mui/material';
import "./styles.css"
import SelectDays from '../../Coin/SelectDays';

function SelectCoins({ crypto1, crypto2, handleCoinChange }) {

    const [allCoins, setAllCoins] = useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#3a80e9",
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const myCoins = await get100coins();
        if (Array.isArray(myCoins)) {
            setAllCoins(myCoins);
        } else {
            console.error("get100coins() did not return an array", myCoins);
            setAllCoins([]);
        }
    }


    return (
        <div className='coin-flex'>
            <p>Crypto 1 :-</p>
            <Select
                sx={styles}
                value={crypto1}
                onChange={(event) => handleCoinChange(event, false)}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            width: '200px',
                        },
                    },
                }}
            >
                {allCoins.filter((coin,) => coin.id !== crypto2)
                    .map((coin) => (
                        <MenuItem key={coin.id} value={coin.id}>
                            {coin.name}
                        </MenuItem>
                    ))}
            </Select>

            <p>Crypto 2 :-</p>
            <Select
                sx={styles}
                value={crypto2}
                onChange={(event) => handleCoinChange(event, true)}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            width: '200px',
                        },
                    },
                }}
            >
                {allCoins
                    .filter((coin) => coin.id !== crypto1)
                    .map((coin) => (
                        <MenuItem key={coin.id} value={coin.id}>
                            {coin.name}
                        </MenuItem>
                    ))}
            </Select>
        </div>
    );

}

export default SelectCoins

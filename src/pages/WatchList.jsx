import React, { useEffect, useState } from "react";
import Button from "../component/Common/Button";
import Header from "../component/Common/Header";
import TabsComponent from "../component/Dashboard/Tabs";
import Search from "../component/Dashboard/Search";
import { get100coins } from "../function/get100Coins";
import { Link } from "react-router-dom";

function Watchlist() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const allCoins = await get100coins();
    if (allCoins && watchlist.length > 0) {
      const filtered = allCoins.filter((coin) => watchlist.includes(coin.id));
      setCoins(filtered);
    }
  };

  useEffect(() => {
    const result = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(result);
  }, [search, coins]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div>
      <Header />
      <Search search={search} onSeacrhChange={onSearchChange} />

      {watchlist?.length > 0 ? (
        <TabsComponent
          coins={search ? filteredCoins : coins}
          search={search}
          clearSearch={clearSearch}
        />
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "var(--grey)" }}>
            Oops..! <br /> No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Link to="/dashboard" className="navigate">
              <Button text={"Dashboard"} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;

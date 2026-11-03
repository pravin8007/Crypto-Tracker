import React, { useEffect, useState } from 'react'
import Header from '../component/Common/Header';
import TabsComponent from '../component/Dashboard/Tabs';
import Search from "../component/Dashboard/Search"
import Loader from '../component/Common/Loader';
import PaginationControl from '../component/Dashboard/Pagination';
import BackToTop from '../component/Common/backToTop';
import { get100coins } from '../function/get100Coins';
import Footer from '../component/Common/Footer';


function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  var filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => {
    setSearch("")
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const myCoins = await get100coins();
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
      setError(myCoins.length === 0 ? "Unable to load coin data." : "");
    } catch (requestError) {
      console.error("Dashboard coin request failed:", requestError);
      setCoins([]);
      setPaginatedCoins([]);
      setError("Unable to load coin data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      {
        loading ? (
          <Loader />
        ) :
          (
            <div className="dashboard">
              {error ? (
                <h4 style={{ color: "var(--white)", textAlign: "center" }}>{error}</h4>
              ) : (
                <>
                  <Search search={search} onSeacrhChange={onSearchChange} />
                  <TabsComponent coins={search ? filteredCoins : paginatedCoins} search={search ? search : ""} clearSearch={clearSearch} />
                  {
                    !search && (
                      <PaginationControl page={page} handlePageChange={handlePageChange} />
                    )
                  }
                </>
              )}
              <BackToTop />
            </div>
          )
      }
      <Footer />
    </div>
  )
}

export default DashboardPage
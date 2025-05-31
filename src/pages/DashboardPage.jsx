import React, { useEffect, useState } from 'react'
import Header from '../component/Common/Header';
import TabsComponent from '../component/Dashboard/Tabs';
import Search from "../component/Dashboard/Search"
import Loader from '../component/Common/Loader';
import axios from 'axios';
import PaginationControl from '../component/Dashboard/Pagination';
import BackToTop from '../component/Common/backToTop';


function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((response) => {
        console.log(response.data);
        setCoins(response.data);
        setLoading(false);
        setPaginatedCoins(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(true);
      });
  }, []);

  return (
    <div>
      <Header />
      {
        loading ? (
          <Loader />
        ) :
          (
            <div className="dashboard">
              <Search search={search} onSeacrhChange={onSearchChange} />
              <TabsComponent coins={search ? filteredCoins : paginatedCoins} clearSearch={clearSearch} />
              {
                !search && (
                  <PaginationControl page={page} handlePageChange={handlePageChange} />
                )
              }
               <BackToTop />
            </div>
          )
      }
    </div>
  )
}

export default DashboardPage
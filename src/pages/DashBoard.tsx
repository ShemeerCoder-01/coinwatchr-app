import React, { useEffect, useState } from "react";
import Tabs from "../components/DashBoard/ViewTab";
import Search from "../components/DashBoard/Search";
import PaginationComponent from "../components/DashBoard/Pagination";
import BacktoTop from "../components/Common/BacktoTop";
import Layout from "../components/Layout";
import { Coin } from "../types";
import { useCoins } from "../hooks/useCoins";

const DashBoardPage: React.FC = () => {
  const { coins } = useCoins();
  const [currPage, setCurrPage] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (coins) {
      setCurrPage(coins?.slice(0, 10));
    }
  }, []);
  
  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    let prevIndex = (value - 1) * 10;
    setCurrPage(coins?.slice(prevIndex, prevIndex + 10));
  };
  const onchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    let filtered = coins?.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFiltered(filtered);
  };

  return (
    <Layout>
      <div className="dashBoardPage">
        <div>
          <Search search={search} onchangeSearch={onchangeSearch} />
          <Tabs coins={search ? filtered : currPage} handleRemove={() => {}} />
          {search && filtered.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                  margin: 0,
                  letterSpacing: "1.2px",
                }}
              >
                <i>Sorry...</i>
              </h1>
              <p>
                <i>Search item not found</i>
              </p>
            </div>
          )}
          {!search && (
            <PaginationComponent page={page} onPageChange={onPageChange} />
          )}
          <BacktoTop />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoardPage;

import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import Tabs from '../components/DashBoard/ViewTab';
import Search from '../components/DashBoard/Search';
import PaginationComponent from '../components/DashBoard/Pagination';
import LoaderComponent from '../components/Common/Loader';
import BacktoTop from '../components/Common/BacktoTop';
import { getFullCoins } from '../functions/getFullCoins';
import Footer from '../components/Common/Footer';

function DashBoardPage() {
  const [crypto,setCrypto] = useState([]);
  const [currPage,setCurrPage] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [search,setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(true);

  const onPageChange = (event, value) => {
    setPage(value);
    let prevIndex = (value -1) * 10;
    setCurrPage(crypto.slice(prevIndex,prevIndex+10));
  };
  console.log(crypto);

  const onchangeSearch = (e)=>{
    setSearch(e.target.value);
    let filtered = crypto.filter((item)=> item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
    item.symbol.toLowerCase().includes(e.target.value.toLowerCase()) );
    setFiltered(filtered)
    console.log(filtered);
  }

  

  useEffect(()=>{
    getData();
  },[])

  async function getData(){
    const coins = await getFullCoins();
    setCrypto(coins);
    setCurrPage(coins.slice(0,10));
    setIsLoading(false);
  }

  return (
    <div>
      <Header/>
      {isLoading?<LoaderComponent/>:
        <div>
          <Search search={search} onchangeSearch={onchangeSearch} />
          <Tabs coins={search?filtered:currPage}/>
          {!search && 
            <PaginationComponent page={page} onPageChange={onPageChange}/>
          }
          <BacktoTop/>
          <Footer/>
        </div>
      }
      
    </div>
  )
}

export default DashBoardPage;
import React from 'react';
import Pagination from '@mui/material/Pagination';
import './style.css';


export default function PaginationComponent({page,onPageChange}) {
 

  return (
    <div className='paginationDiv'>
      <Pagination count={10} page={page} onChange={(event,value)=> onPageChange(event,value)}
      sx={{
        color: "var(--white)",
        "& .Mui-selected ": {
          backgroundColor: "var(--blue) !important",
          color: "#fff !important",
          borderColor: "var(--blue) !important",
        },
        "& .MuiPaginationItem-ellipsis": {
          border: "0px solid var(--grey) !important",
        },
        "& .MuiPaginationItem-text": {
          color: "var(--white)",
          border: "1px solid var(--grey)",
        },
      }}
      />
    </div>
  );
}
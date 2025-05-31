import React from 'react';
import Pagination from '@mui/material/Pagination';
import "./styles.css"

export default function PaginationControl({page, handlePageChange }) {

    return (
        <div className='pagination'>
            <Pagination
                count={10}
                page={page}
                onChange={(event , value) => handlePageChange(event , value)}
                sx={{
                    color : "var(--white)",
                    "& .Mui-selected " : {
                        backgroundColor :"var(--blue) !important",
                        color : "var(--white) !important",
                        borderColor : "var(--blue) !important",
                    },
                    "& .MuiPaginationItem-ellipsis" : {
                        border : "0px solid var(--gray) !important",
                    },
                    "& .MuiPaginationItem-text" : {
                        color:"var(--white)",
                        border:"1px solid var(--gray)"
                    },
                }}
            />
        </div>
    );
}

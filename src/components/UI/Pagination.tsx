import React, { useState } from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>{
  return createStyles({
    pagination:{
      marginTop: theme.spacing(3)
    },
    button: {
      padding: theme.spacing(1),
      borderRadius: '50%',
      minWidth: '42px',
    },
    active:{
      color: `${theme.palette.grey[300]} !important`
    },
    input: {
      display: 'none',
    }
  })
}
);

export const Pagination: React.FC<PaginationProps> = (props:PaginationProps) => {
  const classes:any = useStyles();
  const pages: Array<number> = [];
  for(let i = 1; i <= props.pageCount; i++){
    pages.push(i);
  }
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (e: React.MouseEvent<HTMLElement>) =>{
    setCurrentPage(+(e.currentTarget.innerText));
    return props.handlePageChange(+(e.currentTarget.innerText));
  }

  return (
    <div className={classes.pagination}>
      {
        pages.length > 1 ? 
          pages.map(p=>
            <Button 
              key={p} 
              className={`${classes.button} ${p === currentPage ? classes.active : null}`} 
              onClick={changePage} 
              disabled={currentPage === p}>
                {p}
              </Button>
          ) : 
        null 
      }      
    </div>
  )
}

interface PaginationProps{
  pageCount: number;
  handlePageChange: (page: number)=>void
}
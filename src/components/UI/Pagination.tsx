import React from 'react';

export const Pagination: React.FC<PaginationProps> = (props:PaginationProps) => {
  const pages: Array<number> = [];
  for(let i = 1; i <= props.pageCount; i++){
    pages.push(i);
  }

  const changePage = (e: React.MouseEvent<HTMLElement>) =>{
    return props.handlePageChange(+(e.currentTarget.innerText))
  }

  return (
    <div className="pagination">
      {pages.length > 1 ? pages.map(p=><p key={p} onClick={changePage}>{p}</p>) : null }      
    </div>
  )
}


interface PaginationProps{
  pageCount: number;
  handlePageChange: (page: number)=>void
}
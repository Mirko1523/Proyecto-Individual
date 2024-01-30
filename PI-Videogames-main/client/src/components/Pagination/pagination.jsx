
import React, { useEffect } from 'react';
import './pagination.css'; 

export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (Math.ceil(totalCards / cardPerPage) < currentPage) {
      paginate(1);
    }
  }, [currentPage, totalCards, cardPerPage, paginate]);

  


  if (pageNumbers.length <= 1) {

    return null;
  }

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        {pageNumbers.map((p, i) => (
          <li key={i} className="pagination-item">
            <button
              className="pagination-button"
              onClick={() => paginate(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


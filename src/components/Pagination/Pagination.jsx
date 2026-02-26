import { useNavigate, useLocation } from 'react-router-dom';

function Pagination({ currentPage = 1, totalPages = 1, baseUrl }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageClick = (e, page) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const url = page === 1 ? baseUrl : `${baseUrl}page/${page}/`;
    navigate(url + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      const searchParams = new URLSearchParams(location.search);
      const url = `${baseUrl}page/${currentPage + 1}/`;
      navigate(url + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
    }
  };

  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="navigation pagination">
      <div className="nav-links">
        {startPage > 1 && (
          <>
            <a
              className="page-link"
              href={`${baseUrl}`}
              onClick={(e) => handlePageClick(e, 1)}
            >
              1
            </a>
            {startPage > 2 && (
              <span className="extend">
                ...
              </span>
            )}
          </>
        )}
        {pages.map((page) => (
          <a
            key={page}
            className={`page-link ${page === currentPage ? 'current' : ''}`}
            href={`${baseUrl}page/${page}/`}
            onClick={(e) => handlePageClick(e, page)}
          >
            {page}
          </a>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="extend">
                ...
              </span>
            )}
            <a
              className="page-link"
              href={`${baseUrl}page/${totalPages}/`}
              onClick={(e) => handlePageClick(e, totalPages)}
            >
              {totalPages}
            </a>
          </>
        )}
        {currentPage < totalPages && (
          <a
            href={`${baseUrl}page/${currentPage + 1}/`}
            onClick={handleNext}
          >
            NEXT
          </a>
        )}
      </div>
    </nav>
  );
}

export default Pagination;

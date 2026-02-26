import { useLocation, useNavigate } from 'react-router-dom';

function CategoryTabs({ categoryName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type') || 'movies-series';

  const isTypeRoute = location.pathname.includes('/type/');
  const basePath = isTypeRoute ? `/category/type/${categoryName}/` : `/category/${categoryName}/`;
  
  const tabs = [
    { label: 'All', type: 'movies-series', url: basePath },
    { label: 'Movies', type: 'movies', url: `${basePath}?type=movies` },
    { label: 'Series', type: 'series', url: `${basePath}?type=series` },
  ];

  const handleTabClick = (e, url) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <ul className="aa-tbs cat-t">
      {tabs.map((tab) => {
        const isActive = currentType === tab.type;
        return (
          <li key={tab.type}>
            <a
              href={tab.url}
              className={isActive ? 'on' : ''}
              onClick={(e) => handleTabClick(e, tab.url)}
            >
              {tab.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryTabs;

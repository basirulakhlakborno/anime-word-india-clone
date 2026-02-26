import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import PostGrid from '../../components/PostGrid/PostGrid';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Skeleton from '../../components/Skeleton/Skeleton';
import BottomNav from '../../components/BottomNav/BottomNav';
import '../../styles/torofilm-public.css';
import '../../styles/tippy.css';
import './Category.css';

function Category() {
  const params = useParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Determine route type and extract name
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isLetterRoute = pathParts[0] === 'letter';
  const isGenreRoute = pathParts[0] === 'category' && pathParts[1] === 'genre';
  const isLanguageRoute = pathParts[0] === 'category' && pathParts[1] === 'language';
  const isTypeRoute = pathParts[0] === 'category' && pathParts[1] === 'type';
  const isNetworkRoute = pathParts[0] === 'category' && pathParts[1] === 'network';
  const isFranchiseRoute = pathParts[0] === 'category' && pathParts[1] === 'franchise';
  
  const categoryName = params.categoryName || params.genreName || params.languageName || params.networkName || params.franchiseName || params.letter;

  // Determine category title based on route type
  let categoryTitle = 'Category';
  if (isLetterRoute) {
    categoryTitle = categoryName === '0-9' ? '0-9' : categoryName ? categoryName.toUpperCase() : 'Letter';
  } else if (isGenreRoute) {
    categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Genre';
  } else if (isLanguageRoute) {
    categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Language';
  } else if (isNetworkRoute) {
    categoryTitle = categoryName ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Network';
  } else if (isFranchiseRoute) {
    categoryTitle = categoryName ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Franchise';
  } else {
    categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category';
  }

  // Determine base URL for pagination
  let baseUrl = `/category/${categoryName}/`;
  if (isLetterRoute) {
    baseUrl = `/letter/${categoryName}/`;
  } else if (isGenreRoute) {
    baseUrl = `/category/genre/${categoryName}/`;
  } else if (isLanguageRoute) {
    baseUrl = `/category/language/${categoryName}/`;
  } else if (isTypeRoute) {
    baseUrl = `/category/type/${categoryName}/`;
  } else if (isNetworkRoute) {
    baseUrl = `/category/network/${categoryName}/`;
  } else if (isFranchiseRoute) {
    baseUrl = `/category/franchise/${categoryName}/`;
  }

  // Parse page from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const pageIndex = pathParts.indexOf('page');
    if (pageIndex !== -1 && pathParts[pageIndex + 1]) {
      const page = parseInt(pathParts[pageIndex + 1], 10);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      } else {
        setCurrentPage(1);
      }
    } else {
      setCurrentPage(1);
    }
  }, [location.pathname]);

  // Get type filter from query params
  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type');

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      try {
        let response;
        if (isLetterRoute) {
          response = await api.getLetter(categoryName, currentPage);
        } else {
          // For nested routes (network, franchise), build the full path
          let categoryPath = categoryName;
          if (isNetworkRoute) {
            categoryPath = `network/${categoryName}`;
          } else if (isFranchiseRoute) {
            categoryPath = `franchise/${categoryName}`;
          } else if (isGenreRoute) {
            categoryPath = `genre/${categoryName}`;
          } else if (isLanguageRoute) {
            categoryPath = `language/${categoryName}`;
          } else if (isTypeRoute) {
            categoryPath = `type/${categoryName}`;
          }
          response = await api.getCategory(categoryPath, currentPage);
        }

        if (response.success && response.data && response.data.items) {
          let items = response.data.items;
          
          // Filter by type if type filter is present
          if (typeFilter && typeFilter !== 'movies-series') {
            items = items.filter(item => {
              if (typeFilter === 'movies') {
                return item.type === 'movie' || item.type === 'movies';
              } else if (typeFilter === 'series') {
                return item.type === 'series';
              }
              return true;
            });
          }
          
          const transformedPosts = items.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            image: item.image,
            url: item.type === 'series' ? `/series/${item.id}/` : `/movies/${item.id}/`,
          }));
          
          setPosts(transformedPosts);
          setTotalPages(response.totalPages || response.data.totalPages || 1);
          // Don't update currentPage here - it's managed by the URL parsing useEffect
        } else {
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
      setIsLoading(false);
      }
    };

    if (categoryName) {
    fetchPosts();
    }
  }, [categoryName, currentPage, location.pathname, isLetterRoute, typeFilter]);

  return (
    <>
      <Helmet>
        <title>{categoryTitle} - Anime World India</title>
        <meta name="description" content={`Browse ${categoryTitle} content on Anime World India`} />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <CategoryHeader />
          
          <div className="bd">
            <div className="dfxc">
              <main className="main-site">
                <section className="section movies">
                  <header className="section-header">
                    <div className="rw alg-cr jst-sb">
                      <h1 className="section-title">{categoryTitle}</h1>
                    </div>
                    {/* Only show tabs for category type routes */}
                    {isTypeRoute && <CategoryTabs categoryName={categoryName} />}
                  </header>
                  
                  {isLoading ? (
                    <div className="aa-cn" id="aa-movies">
                      <div id="movies-a" className="aa-tb hdd on">
                        <ul className="skeleton-post-grid post-lst rw sm rcl2 rcl3a rcl4b rcl3c rcl4d rcl6e">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <li key={i} className="skeleton-post-item">
                              <Skeleton type="card" count={1} className="skeleton-card" />
                              <Skeleton type="text" className="skeleton-title" count={1} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <PostGrid posts={posts} />
                      {totalPages > 1 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          baseUrl={baseUrl}
                        />
                      )}
                    </>
                  )}
                </section>
              </main>
            </div>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}

export default Category;

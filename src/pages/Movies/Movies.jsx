import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import PostGrid from '../../components/PostGrid/PostGrid';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Skeleton from '../../components/Skeleton/Skeleton';
import BottomNav from '../../components/BottomNav/BottomNav';
import '../../styles/torofilm-public.css';
import '../../styles/tippy.css';
import '../Category/Category.css';

function Movies() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch posts - only movies
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      try {
        const response = await api.getCategory('movies', currentPage);
        if (response.success && response.data && response.data.items) {
          const transformedPosts = response.data.items.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            image: item.image,
            url: `/movies/${item.id}/`,
          }));
          
          setPosts(transformedPosts);
          setTotalPages(response.totalPages || 1);
        } else {
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const baseUrl = '/movies/';

  return (
    <>
      <Helmet>
        <title>Movies - Anime World India</title>
        <meta name="description" content="Browse Movies on Anime World India" />
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
                      <h1 className="section-title">Movies</h1>
                    </div>
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

export default Movies;

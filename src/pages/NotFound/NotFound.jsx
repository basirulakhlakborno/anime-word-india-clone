import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import './NotFound.css';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found - Anime World India</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <Header />
          
          <div className="bd">
            <div className="dfxc">
              <main className="main-site">
                <div className="error-page error-404">
                  <div className="error-content">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-title">Page Not Found</h2>
                    <p className="error-message">
                      Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="error-actions">
                      <Link to="/" className="btn btn-primary">
                        Go to Homepage
                      </Link>
                      <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-secondary"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
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

export default NotFound;

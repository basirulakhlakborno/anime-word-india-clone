import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import './ServiceUnavailable.css';

function ServiceUnavailable() {
  return (
    <>
      <Helmet>
        <title>503 - Service Unavailable - Anime World India</title>
        <meta name="description" content="The service is temporarily unavailable. Please try again later." />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <Header />
          
          <div className="bd">
            <div className="dfxc">
              <main className="main-site">
                <div className="error-page error-503">
                  <div className="error-content">
                    <h1 className="error-code">503</h1>
                    <h2 className="error-title">Service Unavailable</h2>
                    <p className="error-message">
                      We're currently experiencing some technical difficulties. Our team is working hard to fix the issue.
                    </p>
                    <p className="error-submessage">
                      Please try again in a few moments.
                    </p>
                    <div className="error-actions">
                      <Link to="/" className="btn btn-primary">
                        Go to Homepage
                      </Link>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-secondary"
                      >
                        Retry
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

export default ServiceUnavailable;

import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  const location = useLocation();

  useEffect(() => {
    // Get the current page URL path
    const currentPath = location.pathname;
    
    // Select all menu links (React Router Link components render as <a> tags)
    const menuLinks = document.querySelectorAll('.ulbotoes a.botao, .ulbotoes a.botao-fab');
    
    // Remove active class from all links
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Loop through each link and check if its path matches the current path
    menuLinks.forEach((link) => {
      // React Router Link components have the path in the href attribute when rendered
      // We can also check the data attribute or use the href directly
      const linkPath = link.getAttribute('href') || link.getAttribute('to');
      
      if (!linkPath) return;
      
      // Normalize paths (remove trailing slashes for comparison)
      const normalizedLinkPath = linkPath.replace(/\/$/, '') || '/';
      const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
      
      // Special handling for home page - must be exact match
      if (normalizedLinkPath === '/') {
        if (normalizedCurrentPath === '/') {
          link.classList.add('active');
        }
      } else {
        // For other paths, check if current path starts with the link path
        if (normalizedCurrentPath.startsWith(normalizedLinkPath)) {
          link.classList.add('active');
        }
      }
    });
  }, [location.pathname]);

  return (
    <div id="mobile-contact-bar">
      <div className="menugeral">
        <div className="live-search" style={{ display: 'none' }}></div>
        <ul className="ulbotoes">
          {/* Centered Home Button as Floating Action Button */}
          <li className="li-fab" style={{ marginLeft: '-20px', animation: 'roamWholeScreen 5s ease-in-out forwards, roamAfter 5s 5s infinite ease-in-out' }}>
            <Link className="botao-fab" to="/">
              <img src="/files/AW_Smiley.png" alt="Home Icon" className="home-icon" />
            </Link>
          </li>
          {/* Movies */}
          <li className="li">
            <Link className="botao" to="/movies/">
              <i className="fa fa-film"></i>
              <br />
              <div className="textomenu">Movies</div>
            </Link>
          </li>
          {/* Series */}
          <li className="li">
            <Link className="botao" to="/series/">
              <i className="fas fa-layer-group"></i>
              <br />
              <div className="textomenu">Series</div>
            </Link>
          </li>
          <li className="li">
            <Link className="botao" to="/">
              <div className="textomenu" id="shuffle_anim" style={{ width: '100px' }}>HOME</div>
            </Link>
          </li>
          {/* Anime */}
          <li className="li">
            <Link className="botao" to="/category/type/anime/">
              <i className="fas fa-user-ninja"></i>
              <br />
              <div className="textomenu">Anime</div>
            </Link>
          </li>
          {/* Cartoon */}
          <li className="li">
            <Link className="botao" to="/category/type/cartoon/">
              <i className="fas fa-hat-wizard"></i>
              <br />
              <div className="textomenu">Cartoon</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNav;

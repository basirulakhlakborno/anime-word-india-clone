import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // Check if we're on a details page (series details route)
  const isDetailsPage = location.pathname.startsWith('/series/') && location.pathname !== '/series' && !location.pathname.startsWith('/series/page/');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 762);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {!isDetailsPage && <div className="bghd"><img loading="lazy" src="/images/129659-final-1-scaled.jpg" alt="" /></div>}
      <footer className="ft tac" style={{ paddingTop: '0px', position: 'relative', paddingBottom: isMobile ? '60px' : '0' }}>
       
        
        <section id="wdgt_letter-3" className="wdgt-home widget section wdgt_letter">
          <h3 className="widget-title">Quick A to Z Navigation</h3>
          <ul className="az-lst dfx fwp">
            <li><Link className="btn sm blk" to="/letter/0-9">#</Link></li>
            <li><Link className="btn sm blk" to="/letter/A">A</Link></li>
            <li><Link className="btn sm blk" to="/letter/B">B</Link></li>
            <li><Link className="btn sm blk" to="/letter/C">C</Link></li>
            <li><Link className="btn sm blk" to="/letter/D">D</Link></li>
            <li><Link className="btn sm blk" to="/letter/E">E</Link></li>
            <li><Link className="btn sm blk" to="/letter/F">F</Link></li>
            <li><Link className="btn sm blk" to="/letter/G">G</Link></li>
            <li><Link className="btn sm blk" to="/letter/H">H</Link></li>
            <li><Link className="btn sm blk" to="/letter/I">I</Link></li>
            <li><Link className="btn sm blk" to="/letter/J">J</Link></li>
            <li><Link className="btn sm blk" to="/letter/K">K</Link></li>
            <li><Link className="btn sm blk" to="/letter/L">L</Link></li>
            <li><Link className="btn sm blk" to="/letter/M">M</Link></li>
            <li><Link className="btn sm blk" to="/letter/N">N</Link></li>
            <li><Link className="btn sm blk" to="/letter/O">O</Link></li>
            <li><Link className="btn sm blk" to="/letter/P">P</Link></li>
            <li><Link className="btn sm blk" to="/letter/Q">Q</Link></li>
            <li><Link className="btn sm blk" to="/letter/R">R</Link></li>
            <li><Link className="btn sm blk" to="/letter/S">S</Link></li>
            <li><Link className="btn sm blk" to="/letter/T">T</Link></li>
            <li><Link className="btn sm blk" to="/letter/U">U</Link></li>
            <li><Link className="btn sm blk" to="/letter/V">V</Link></li>
            <li><Link className="btn sm blk" to="/letter/W">W</Link></li>
            <li><Link className="btn sm blk" to="/letter/X">X</Link></li>
            <li><Link className="btn sm blk" to="/letter/Y">Y</Link></li>
            <li><Link className="btn sm blk" to="/letter/Z">Z</Link></li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', padding: '1rem 0', fontSize: '0.9rem' }}>
          <a href="https://watchanimeworld.in/dmca/" target="_blank" rel="noopener noreferrer" style={{ color: 'yellow', textDecoration: 'underline' }}>
            DMCA Notice & Takedown Policy
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/images/footer-char.png" alt="Footer Character" style={{ width: '150px' }} />
          <nav className="top dfxc alg-cr">
            <ul className="social rw jst-cr">
              <li><a target="_blank" href="https://t.me/watch_anime_world_updates" rel="noopener noreferrer" className="fa-telegram-plane fab"></a></li>
            </ul>
          </nav>
        </div>

        <p className="copy" style={{ paddingBottom: '2rem' }}> © 2025 Anime World India. All Rights Reserved.</p>
        <nav className="kw">
        </nav>
      </footer>
    </>
  );
}

export default Footer;

import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

function PostGrid({ posts = [] }) {
  const navigate = useNavigate();
  if (posts.length === 0) {
    return (
      <div className="aa-cn" id="aa-movies">
        <div id="movies-a" className="aa-tb hdd on">
          <ul className="post-lst rw sm rcl2 rcl3a rcl4b rcl3c rcl4d rcl6e">
            <li className="loading" style={{ textAlign: 'center', padding: '2rem' }}>
              No posts found.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="aa-cn" id="aa-movies">
      <div id="movies-a" className="aa-tb hdd on">
        <ul className="post-lst rw sm rcl2 rcl3a rcl4b rcl3c rcl4d rcl6e">
          {posts.map((post) => (
            <li
              key={post.id}
              id={`post-${post.id}`}
              className={`post-${post.id} ${post.type} type-${post.type} status-publish`}
            >
              <article className="post dfx fcl movies">
                <header className="entry-header">
                  <h2
                    className="entry-title"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.title}
                  </h2>
                </header>
                <div className="post-thumbnail or-1">
                  <figure>
                    <ImageWithFallback
                      loading="lazy"
                      src={post.image}
                      alt={`Image ${post.title}`}
                    />
                  </figure>
                  <span className="post-ql"></span>
                  <span className="watch btn sm">
                    {post.type === 'movies' ? 'View Movie' : 'View Serie'}
                  </span>
                  <span className="play fa-play"></span>
                </div>
                <a
                  href={post.url}
                  className="lnk-blk"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(post.url);
                  }}
                ></a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostGrid;

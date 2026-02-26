import { useState } from 'react';

function Comments({ postId }) {
  const [comments, setComments] = useState([
    {
      id: 18908,
      author: 'Dev',
      date: 'December 16, 2025 at 8:43 pm',
      content: 'Very nice 👍 anime',
    },
    {
      id: 18857,
      author: 'Netin',
      date: 'December 16, 2025 at 11:36 am',
      content: 'I love this anime Waiting episode 3 🤩',
    },
    {
      id: 18007,
      author: 'Alisha',
      date: 'December 7, 2025 at 4:42 pm',
      content: 'I like anime',
    },
    {
      id: 17997,
      author: 'Nithin',
      date: 'December 7, 2025 at 1:18 pm',
      content: 'Send next episode',
    },
    {
      id: 17891,
      author: 'Rumon',
      date: 'December 6, 2025 at 7:54 am',
      content: 'Episode 2 kab aye ga',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages] = useState(2);

  return (
    <div id="comments" className="comments-area widget">
      <div className="comments-title widget-title">Comments</div>
      <div id="disqus_thread">
        <nav className="navigation pagination comments-nav">
          {currentPage > 1 && (
            <a className="prev page-numbers" href={`#comments`}>
              &laquo; Previous
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              className={`page-numbers ${currentPage === page ? 'current' : ''}`}
              href={`#comments`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          ))}
        </nav>
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li
              key={comment.id}
              id={`comment-${comment.id}`}
              className={`comment ${index % 2 === 0 ? 'even' : 'odd'} ${index % 2 === 0 ? 'thread-even' : 'thread-odd'} depth-1`}
            >
              <article id={`div-comment-${comment.id}`} className="comment-body">
                <footer className="comment-meta">
                  <div className="comment-author vcard">
                    <b className="fn">{comment.author}</b> <span className="says">says:</span>
                  </div>
                  <div className="comment-metadata">
                    <a href={`#comment-${comment.id}`}>
                      <time dateTime={comment.date}>{comment.date}</time>
                    </a>
                  </div>
                </footer>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
                <div className="reply">
                  <a
                    rel="nofollow"
                    className="comment-reply-link"
                    href={`#comment-${comment.id}`}
                    data-commentid={comment.id}
                    data-postid={postId}
                  >
                    Reply
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <nav className="navigation pagination comments-nav">
          <nav className="navigation comment-navigation" aria-label="Comments">
            <h2 className="screen-reader-text">Comments navigation</h2>
            <div className="nav-links">
              {currentPage < totalPages && (
                <div className="nav-previous">
                  <a href="#comments">Older comments</a>
                </div>
              )}
            </div>
          </nav>
        </nav>
        <div id="respond" className="comment-respond">
          <div id="reply-title" className="comments-title comment-reply-title widget-title">
            Leave a Reply <small><a rel="nofollow" id="cancel-comment-reply-link" href="#respond" style={{ display: 'none' }}>Cancel reply</a></small>
          </div>
          <form action="#" method="post" id="commentform" className="comment-form">
            <p className="comment-notes">
              <span id="email-notes">Your email address will not be published.</span>{' '}
              <span className="required-field-message">
                Required fields are marked <span className="required">*</span>
              </span>
            </p>
            <p className="comment-form-comment">
              <label htmlFor="comment">
                Comment <span className="required">*</span>
              </label>
              <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required></textarea>
            </p>
            <p className="comment-form-author">
              <label htmlFor="author">
                Name <span className="required">*</span>
              </label>
              <input id="author" name="author" type="text" size="30" maxLength="245" autoComplete="name" required />
            </p>
            <p className="comment-form-email">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input id="email" name="email" type="text" size="30" maxLength="100" aria-describedby="email-notes" autoComplete="email" required />
            </p>
            <p className="comment-form-url">
              <label htmlFor="url">Website</label>
              <input id="url" name="url" type="text" size="30" maxLength="200" autoComplete="url" />
            </p>
            <p className="comment-form-cookies-consent">
              <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
              <label htmlFor="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label>
            </p>
            <p className="form-submit">
              <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" />
              <input type="hidden" name="comment_post_ID" value={postId} id="comment_post_ID" />
              <input type="hidden" name="comment_parent" id="comment_parent" value="0" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments;

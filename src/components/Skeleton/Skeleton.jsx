import './Skeleton.css';

function Skeleton({ type = 'card', count = 1, className = '', style = {} }) {
  const skeletons = Array.from({ length: count }, (_, i) => {
    const baseClass = type === 'image' ? 'skeleton-image' : `skeleton-${type}`;
    return (
      <div key={i} className={`skeleton ${baseClass} ${className}`} style={style}>
        <div className="skeleton-shimmer"></div>
      </div>
    );
  });

  return <>{skeletons}</>;
}

export default Skeleton;

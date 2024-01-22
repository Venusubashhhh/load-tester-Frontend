import React from 'react';
import '../home/Home.scss'; // You can create a CSS file for styling

interface DotProps {
  style?: React.CSSProperties & { '--i'?: number };
}

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="dots">
        {[...Array(15)].map((_, i) => (
          <span key={i} style={{ '--i': i + 1 } as DotProps['style']}></span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
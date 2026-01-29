import React, { useState, useEffect } from 'react';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import "./styles.css";
import { Tooltip } from '@mui/material';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', scrollFunction);

    return () => { 
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Tooltip title="Back to Top">
      <button
        className={`btt-btn ${isVisible ? 'btt-btn--visible' : 'btt-btn--hidden'}`}
        onClick={scrollToTop}
        type="button"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <NorthRoundedIcon
          style={{ color: "var(--blue)" }}
        />
      </button>
    </Tooltip>
  );
}

export default BackToTop;
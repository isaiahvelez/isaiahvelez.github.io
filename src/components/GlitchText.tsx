import React, { useState, useEffect, useCallback } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
}

const chars = '!@#$%^&*()_+{}:"<>?-=[];,./';

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, scrambleSpeed = 30, triggerOnHover = false }) => {
  const [displayText, setDisplayText] = useState('');

  const scramble = useCallback(() => {
    let iteration = 0;
    const textArray = text.split('');
    const currentArray = new Array(text.length);

    const interval = setInterval(() => {
      for (let i = 0; i < text.length; i++) {
        if (i < iteration) {
          currentArray[i] = textArray[i];
        } else {
          currentArray[i] = chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(currentArray.join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return (
    <span 
      className={className} 
      aria-label={text}
      onMouseEnter={triggerOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;

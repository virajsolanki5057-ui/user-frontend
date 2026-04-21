import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Wrapper>
      <svg viewBox="0 0 48 48" className="loader">
        <g fill="none" strokeWidth="4">
          <line x1="24" y1="2" x2="24" y2="6" />
          <line x1="34" y1="4.6" x2="34" y2="8.6" />
          <line x1="41.3" y1="12" x2="41.3" y2="16" />
          <line x1="44" y1="22" x2="44" y2="26" />
          <line x1="41.3" y1="32" x2="41.3" y2="36" />
          <line x1="34" y1="39.3" x2="34" y2="43.3" />
          <line x1="24" y1="42" x2="24" y2="46" />
          <line x1="14" y1="39.3" x2="14" y2="43.3" />
          <line x1="6.6" y1="32" x2="6.6" y2="36" />
          <line x1="4" y1="22" x2="4" y2="26" />
          <line x1="6.6" y1="12" x2="6.6" y2="16" />
          <line x1="14" y1="4.6" x2="14" y2="8.6" />
        </g>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  .loader {
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  .loader line {
    stroke: #3498db;
    stroke-linecap: round;
    stroke-dasharray: 10;
    stroke-dashoffset: 10;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes dash {
    0% { stroke-dashoffset: 10; opacity: 1; }
    50% { stroke-dashoffset: 0; opacity: 0.3; }
    100% { stroke-dashoffset: 10; opacity: 1; }
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;

export default Loader;
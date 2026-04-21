import React from 'react';
import styled from 'styled-components';

const SearchBar = ({ value, onChange }) => {
  return (
    <StyledWrapper>
      <form className="form" onSubmit={(e) => e.preventDefault()}>

        <input
          className="input"
          placeholder="Search users..."
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .form {
    position: relative;
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 30px;
    padding: 8px 12px;
    border: 1px solid #ddd;
  }

  .input {
    border: none;
    width: 100%;
    outline: none;
    font-size: 14px;
    background: transparent;
  }

  @media (min-width: 640px) {
    width: 260px;
  }
`;

export default SearchBar;

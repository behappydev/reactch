import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;

import React from 'react';
import './spinner.css';

function Spinner() {
  return (
    <div data-testid="loading" className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;

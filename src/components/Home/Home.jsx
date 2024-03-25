import React from 'react';
import './Home.css'; // Uvezite CSS datoteku

const Home = ({ onLogout }) => {
    return (
      <div className="container">
        <div className="button-container">
          <button onClick={onLogout}>Odjava</button>
        </div>
      </div>
    );
  };
  
  export default Home;
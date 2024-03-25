import React from 'react';
import './Home.css'; // Uvezite CSS datoteku

const Home = ({ onLogout, onClientApp }) => {
    return (
        <div className="button-container">
          <button onClick={() => window.location.href = "https://pos-employees-app-tim56.vercel.app"}>
    Client app
    </button>
   <button onClick={onLogout}>Odjava</button>
        </div>
     
    );
  };
  
  export default Home;

import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Home from "../Home/Home";
import "./Statistics.css";
import useScript from "../../hooks/useScript";

const Statistics = () => {
  const [currentScriptParams, setCurrentScriptParams] = useState({
    scriptUrl:
      "https://prod-uk-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js",
    tableUrl:
      "https://prod-uk-a.online.tableau.com/t/nkrupalija1eeecd345e0/views/API/Sheet2",
  });

  useScript(currentScriptParams.scriptUrl, currentScriptParams.tableUrl);

  const handleButtonClick = (newScriptUrl, newTableUrl) => {
    setCurrentScriptParams({
      scriptUrl: newScriptUrl,
      tableUrl: newTableUrl,
    });
  };

  return (
    <Home>
      <h2>Statistics</h2>
      <div className="divWrapper" id="statisticsDiv">
        <div className="divDiagramButtons">
          <button
            className="diagramButton"
            onClick={() =>
              handleButtonClick(
                "https://prod-uk-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js",
                "https://prod-uk-a.online.tableau.com/t/nkrupalija1eeecd345e0/views/API/Sheet2"
              )
            }
          >
            Locations Daily Diagram
          </button>
          <button
            className="diagramButton"
            onClick={() =>
              handleButtonClick(
                "https://prod-uk-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js",
                "https://prod-uk-a.online.tableau.com/t/nkrupalija1eeecd345e0/views/API/Sheet3"
              )
            }
          >
            Sold Items Diagram
          </button>
        </div>
      </div>
    </Home>
  );
};

export default Statistics;

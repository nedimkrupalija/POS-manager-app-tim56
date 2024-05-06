import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Home from "../Home/Home";
import "./Statistics.css";
import useScript from "../../hooks/useScript";

const Statistics = () => {
  useScript(
    "https://prod-uk-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js",
    "https://prod-uk-a.online.tableau.com/t/nkrupalija1eeecd345e0/views/API/Sheet3"
  );

  return (
    <Home>
      <h2>Statistics</h2>
      <div className="divWrapper" id="statisticsDiv">
        <div className="divDiagramButtons">
          <button className="diagramButton">Diagram 1</button>
          <button className="diagramButton">Diagram 2</button>
        </div>
      </div>
    </Home>
  );
};

export default Statistics;

import { tab } from "@testing-library/user-event/dist/cjs/convenience/tab.js";
import { useEffect } from "react";

const useScript = (url, tableUrl) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.type = "module";

    const tableau = document.createElement("tableau-viz");
    tableau.src = tableUrl;
    tableau.async = true;
    tableau.id = "tableau-viz";
    tableau.toolbar = "bottom";
    tableau.hidetabs = true;

    tableau.style.height = "100%";
    tableau.style.width = "100%";
    tableau.style.margin = "0 auto";
    tableau.style.display = "block";

    const statisticsDiv = document.getElementById("statisticsDiv");

    document.body.appendChild(script);
    statisticsDiv.appendChild(tableau);

    return () => {
      document.body.removeChild(script);
      statisticsDiv.removeChild(tableau);
    };
  }, [url]);
};

export default useScript;

import { tab } from "@testing-library/user-event/dist/cjs/convenience/tab.js";
import { useEffect } from "react";


const useScript = (url, tableUrl) => {    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.type = 'module';

        
        const tableau = document.createElement('tableau-viz');
        tableau.src = tableUrl;
        tableau.async = true;
        tableau.id = "tableau-viz";
        tableau.toolbar = "bottom";
        tableau.hidetabs = true;   
        
       

        tableau.style.width = "80%";
       


      
        document.body.appendChild(script);
        document.body.appendChild(tableau);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(tableau);
        }
    }, [url]);
}




export default useScript;

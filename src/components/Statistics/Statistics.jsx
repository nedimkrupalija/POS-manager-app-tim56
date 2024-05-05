import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Home from '../Home/Home';
import useScript from '../../hooks/useScript';
import importTableauScript from '../../hooks/useScript';

const Statistics = () => { 

    useScript("https://prod-uk-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js","https://prod-uk-a.online.tableau.com/t/nkrupalija1eeecd345e0/views/API/Sheet2")
   
     
    return (
       <Home>
        <>
        </>
       </Home>
    )
};


export default Statistics;
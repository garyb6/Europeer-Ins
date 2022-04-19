import React from "react";
import '../css/CountrySearch.css'
import "../css/CountryCard.css"

const CountryInfo = ({countryInfo}) => {

    if (!countryInfo){
        return null;
    }

    return (
        <>
        <img src={countryInfo[1].flags.png} width="100%" height="80%" alt={`Flag of ${countryInfo[0].country}`} className="cardImage"/>
        <ul className="pulledInfo">
            <li>
            <span className="cardInfoLabel">Capital: </span> 
            <span className="cardInfoContent">{countryInfo[1].capital}</span>
            </li>
            <li>
            <span className="cardInfoLabel">Population: </span>
            <span className="cardInfoContent">{countryInfo[1].population}</span>
            </li>
            <li>
            <span className="cardInfoLabel">Greeting: </span>
            <span className="cardInfoContent">{countryInfo[0].greeting}</span>
            </li>
            <li>
            <span className="cardInfoLabel">National Animal: </span>
            <span className="cardInfoContent">{countryInfo[0].animal}</span>
            </li>
            <li>
            <span className="cardInfoLabel">National Dish: </span>
            <span className="cardInfoContent">{countryInfo[0].dish}</span>
            </li>
        </ul>
        </>
    )
}

export default CountryInfo;
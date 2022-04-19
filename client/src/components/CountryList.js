import React from "react";
import CountryListItem from "./CountryListItem";
import '../css/CountrySearch.css'

const CountryList = ({countryList, onCountryClick, checkFilter}) => {
    
    const listOfCountries = countryList.map((country, index) => {
        if (checkFilter(country)) {
        return <CountryListItem key={index} onCountryClick={onCountryClick} country={country}/>
        }
        return null;
    })

    return (
        <>
        <ul>{listOfCountries}</ul>
        </>
    )
}

export default CountryList;
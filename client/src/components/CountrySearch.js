import React from "react";
import "../css/CountrySearch.css"

const CountrySearch = ({setFilter}) => {

    const changeSearchValue = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div className="form">
            <input
                onChange={changeSearchValue}
                type="text"
                name="searchValue"
                placeholder="Search For A Country"
            />    
        </div>
    )
}

export default CountrySearch;


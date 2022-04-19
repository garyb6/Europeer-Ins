import React from "react";
import CountryInfo from "./CountryInfo";
import {Card, CloseButton} from 'react-bootstrap';
import "../css/CountryCard.css"

const CountryCard = ({ selectedCountry, countryInfo, handleClose }) => {
    return (
        <Card  text="light" bg="dark" border="dark" style={{width: '100%', height: '100%'}}>
            <CloseButton variant="white" onClick={handleClose} aria-label="hide"/>
            <Card.Body>
                <Card.Title as='h4'>
                    {selectedCountry}
                </Card.Title>
                <Card.Text>
                    <p><CountryInfo countryInfo={countryInfo}></CountryInfo></p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;
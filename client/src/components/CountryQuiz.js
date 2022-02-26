import React, { useState } from "react";
import "./CountryCard.css"
import "../containers/MapContainer.css"
import {Card, CloseButton} from 'react-bootstrap';

const CountryQuiz = ({countryList, getCountry, handleClose, setQuizInfo, setShowQuiz}) => {

    const [quizList, setQuizList] = useState(countryList.slice().sort(() => Math.random() - 0.5));
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(true);

    const handleChange = (event) =>{
        formData[event.target.id] = event.target.value;
        setFormData(formData);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        checkAnswer(formData.answer.trim(), event);
    }

    const startQuiz = () => {
        setStart(false)
        getCountry(quizList[quizList.length - 1])
        .then(result => setQuizInfo(result));
    }

    const resetQuiz = () => {

        setScore(0)
        setMessage("")
        setQuizInfo(null)
        setStart(true)
        handleClose()
        setQuizList(countryList.slice().sort(() => Math.random() - 0.5))
        setShowQuiz(false)
    }

    const checkAnswer = (answer, event) => {
        const correctAnswer = () => {
            setMessage("Correct!");
            quizList.pop();
            event.target[0].value = "";
            setScore(score + 1);
        }

        const wrongAnswer = () => {
            setMessage("That's not right - try again?");
        }

        switch (quizList.length) {
            case 0:
                break;
            case 1:
                if ((quizList[0]).toUpperCase() === answer.toUpperCase()){
                    correctAnswer();
                    setMessage("Wow! You named every country in Europe!");
                    setQuizInfo(null);
                } else {
                    wrongAnswer();
                }
                break;
            default:
                if ((quizList[quizList.length - 1]).toUpperCase() === answer.toUpperCase()){
                    correctAnswer();
                    getCountry(quizList[quizList.length - 1])
                    .then(result => setQuizInfo(result));
                } else {
                    wrongAnswer();
                }
        }
    }


        return (
            <div className="country-quiz">
            <Card  text="light" bg="dark" border="dark" style={{height:"35rem", width:"25rem"}}>
                <CloseButton variant="white" onClick={resetQuiz} aria-label="hide"/>
                    <Card.Body className="appBody">
                    <Card.Title as='h4'>Can you name the countries?</Card.Title>
                                    <Card.Text>
                                    <div className= "subtitle">Type in the country that the indicator is hovering over</div>
                                        {start ? <button className="submit-start-button" onClick={startQuiz}>Click to start</button> 
                                        :
                                        <div>
                                            <form className = "quiz-form" onSubmit={onSubmit}>
                                                <input type="text" id="answer" onChange={handleChange}/>
                                                <input type="submit"/>
                                            </form> 
                                            <p id="score-message">{message} {score}/46</p>
                                        </div>
                                        }
                                        
                                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
}

export default CountryQuiz;
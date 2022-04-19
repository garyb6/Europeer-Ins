import React, { useState } from "react";
import QuizOption from "./QuizOption";
import '../css/FlagsandCapitalQuiz.css'

const Quiz = ({newQuestion, correctAnswer, setHasAnswered, hasAnswered, score, setScore}) => {

    const [correctText, setCorrectText] = useState("")

    const handleClick = (event) => {
        setHasAnswered(true);
        if (event.target.textContent === correctAnswer) {
            setScore(score => score + 1);
            setCorrectText("Well done!!!");
        } else {
            setCorrectText("Unlucky!");
        }
    }

    const optionList = newQuestion.answers.map((answer, index) => {
        const answerName = answer.text;
        return <QuizOption answerName={answerName} key={index} handleClick={handleClick}/>
    })

    return (
        <>
    <div id="question-container">
                <div id="header">
                    <div id="question">{newQuestion.question}</div>
                </div>
                <div id="answer-options">
                {hasAnswered ? 
                    <div className="question-answered">
                        <h5 className="correctText">{correctText}</h5>
                        <p>The answer was {correctAnswer}</p>
                        <div id="score-container">Score: {score}/10</div>
                    </div> :
                    <ul>{optionList}</ul>
                }
                </div>
    </div>
        </>
    )
}

export default Quiz;

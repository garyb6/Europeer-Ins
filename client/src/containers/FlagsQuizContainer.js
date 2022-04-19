import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import {Modal, Button} from 'react-bootstrap';
import '../css/FlagsandCapitalQuiz.css'

const FlagsQuizContainer = ({ countryList, getCountry }) => {

    const [show, setShow] = useState(false);
    const [start, setStart] = useState(true);
    const [endPage, setEndPage] = useState(false);
    const [startButton, setStartButton] = useState("Start");
    const [newQuestion, setNewQuestion] = useState({});
    const [questionCount, setQuestionCount] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [hasAnswered, setHasAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizList, setQuizList] = useState(countryList.slice().sort(() => Math.random() - 0.5));

    useEffect(() => {
        let countries = quizList.slice(0, 4);
        getQuestion(countries);
    }, [])

    const getQuestion = (countries) => {

        let data = [];
        if (countries) {
            Promise.all(
                countries.map(country => getCountry(country)
                .then(value => data.push(value))))
                .finally(() => {
                    let answer = data[Math.floor(Math.random() * 4)];
                    let question = `Who does this flag belong to?`;
                    let answers = [
                        { text: (data[0][0].country), correct: (data[0] === answer) },
                        { text: (data[1][0].country), correct: (data[1] === answer) },
                        { text: (data[2][0].country), correct: (data[2] === answer) },
                        { text: (data[3][0].country), correct: (data[3] === answer) }
                    ];
                    setNewQuestion({ question: question, answers: answers, flag: answer[1].flags.png });
                    setCorrectAnswer(answer[0].country);
                })
        }
    }

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleStart = () => {
        let countries = quizList.slice(0, 4);
        getQuestion(countries);
        setScore(0);
        setEndPage(false);
        setStart(false);
        setQuestionCount(1);
    }

    const handleNext = () => {
        setHasAnswered(false);
        if (questionCount < 10) {
            let countries = quizList.slice((questionCount * 4), ((questionCount * 4) + 4));
            getQuestion(countries);
            setQuestionCount(questionCount => questionCount + 1);
        } else {
            setStartButton("Restart");
            setStart(true);
            setEndPage(true);
            setQuestionCount(0);
            setQuizList(countryList.slice().sort(() => Math.random() - 0.5));
        }
    }

    return (
        <>
            <button className="nameQuiz" onClick={handleShow}><div className="linkText">How is your flag knowledge?</div></button>
            <Modal show={show} onHide={handleClose}>
                        <Modal.Header className="modHead" closeButton>
                            <Modal.Title className="modTitle">Flags Quiz</Modal.Title>
                        </Modal.Header>
                                <Modal.Body>
                                    <div className="controls">
                                        {start ?
                                            <div>
                                                {endPage ? <h5>Your final score is {score}/10 </h5> : null}
                                                <button id="start-btn" onClick={handleStart}>{startButton}</button>
                                            </div>
                                            :
                                            <div className="quiz">
                                            <img className="questionFlag" src={newQuestion.flag}></img>
                                                <Quiz
                                                    newQuestion={newQuestion}
                                                    correctAnswer={correctAnswer}
                                                    setHasAnswered={setHasAnswered}
                                                    hasAnswered={hasAnswered}
                                                    score={score}
                                                    setScore={setScore}
                                                />
                                                <button id="next-btn" onClick={handleNext}>Next</button>
                                            </div>}
                                    </div>
                                </Modal.Body>
            </Modal>
        </>
    )
}

export default FlagsQuizContainer;
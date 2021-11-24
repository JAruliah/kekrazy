import React, {useState, useEffect, useRef} from 'react'
import randomWords from 'random-words'
import {Content} from '../components/Content'
import {Header} from '../components/Header'
import { MDBBtn } from 'mdb-react-ui-kit'

interface MainProps {
    userEmail:string|undefined,
    isAuthenticated:Boolean,
    setScores:React.Dispatch<React.SetStateAction<[]>>,
    scores:[],
    user:any
}

// constants for number of generated words and seconds for the game timer
const NUMB_OF_WORDS:number = 150
const SECONDS:number = 60

export const Main: React.FC<MainProps> = ({userEmail, isAuthenticated,setScores, scores, user}) => {
    const [words, setWords] = useState<string[]>([])
    const [countDown, setCountDown] = useState<number>(SECONDS)
    const [currentInput, setCurrentInput] = useState<string>("")
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
    const [correctChar, setCorrectChar] = useState<number>(0)
    const [incorrectChar, setIncorrectChar] = useState<number>(0)
    const [completedWords, setCompletedWords] = useState<number>(0)
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)
    const [currentChar, setCurrentChar] = useState<string[]>([])
    const [status, setStatus] = useState<string>("waiting")
    const [startCountDown, setStartCountDown] = useState<number>(-1)
    const [accuracyScore, setAccuracyScore] = useState<number>(0)
    const textInput = useRef<null|any>(null)

    // generate random on mount
    useEffect(() => {
        setWords(generateWords())
    }, [])

    // when the game status changes check if the game is started
    useEffect(() => {
        let isMounted = true; 

        if (status === "start"){
            textInput.current.focus()
        }
        if (status === "finished"){
            setAccuracyScore((correctChar / (correctChar + incorrectChar) * 100))
            if (isAuthenticated){
                if (userEmail !== undefined){
                    if (accuracyScore > 0){
                        if (isMounted){
                            fetch(`${process.env.REACT_APP_BASE_URL}scores`, {
                                method:'POST',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({email:userEmail,score:completedWords, accuracy:accuracyScore})
                            })
                            .then(res => res.json())
                            .then(data => {
                                setScores(data[0].scores)
        
                            })
                            .catch(err => console.log(err))
    
                        }
                    }

                }
            }
        }
        return () => { isMounted = false };

    }, [status,userEmail,completedWords, isAuthenticated, setScores, accuracyScore, incorrectChar, correctChar])

    // generate random words for the typing content 
    const generateWords = () :string[] => {
        return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords()+" ")
    }

    // start button, starts interval and sets coundown state
    const start = ():number|void => {
        // if the game is finished reset all values
        if (status === "finished" || status === "post-game"){
            setWords(generateWords())
            setCurrentWordIndex(0)
            setCurrentCharIndex(0)
            setCurrentChar([])
            setCompletedWords(0)
            setCorrectChar(0)
            setIncorrectChar(0)

        }
        // change game status to start
        if (status !== "start" ){
            // set the countdown time and change status to status timer
            setStartCountDown(5)
            setStatus("start-timer")
            // begin start countdown interval
            let startInvertal = setInterval(() =>{
                setStartCountDown((prevStartCountDown) => {
                    // when the start countdown reaches 0 start the game
                    if(prevStartCountDown === 0){
                        clearInterval(startInvertal)
                        setStatus("start")
                        let interval = setInterval(() => {
                            setCountDown((prevCountDown) => {
                                // if the countdown hits 0 clear the interval and set status to finished
                                if(prevCountDown === 0){
                                    setStatus("finished")
                                    clearInterval(interval)
                                    setCurrentInput("")
                                    setStatus("post-game")
                                    return SECONDS
                                }
                                // if countdown is not 0 continue reducing the countdown
                                return prevCountDown - 1   
                            })
                        }, 1000)
                        return -1
                    }
                    return prevStartCountDown - 1
                })
            }, 1000)
        }
    }

    // on space keydown check if the word matches the current word, if it does move to next word and clear input
    const handleKeyDown = ({key} :React.KeyboardEvent<HTMLInputElement>) => {
        // if the key is not a backspace append the key to the current char array
        if (key !== "Backspace"){
            currentChar.push(key)

        }
        // if the key is a backspace pop off the current char array and decrease currentCharIndex by 1
        if (key === "Backspace"){
            currentChar.pop()
            // check if previous words match, if they do then backspace
            if (currentChar[currentChar.length -1] === words[currentWordIndex][currentCharIndex - 2] && currentChar[currentChar.length -2] === words[currentWordIndex][currentCharIndex - 3]){
                if (currentCharIndex <= 0){
                }
                else{
                    setCurrentCharIndex(currentCharIndex - 1)
                }
            }
            return
        }
        // if the key character is equal to the currentCharIndex character and the previous char in the input is equal to the previous char of the word
        if (key === words[currentWordIndex][currentCharIndex] && currentChar[currentChar.length -2] === words[currentWordIndex][currentCharIndex-1] && currentChar[currentChar.length -3] === words[currentWordIndex][currentCharIndex-2]){
            setCorrectChar(correctChar+1)
            if (key === " "){
                // if the key down if a space check if word matches, move to next word if it does
                if(words[currentWordIndex] === currentInput.trim()+" "){
                    setCurrentInput("")
                    setCurrentWordIndex(currentWordIndex + 1)
                    setCurrentCharIndex(0)
                    setCurrentChar([])
                    setCompletedWords(completedWords + 1)
                }
            }
                // if key is not a space, move the index up by one 
                else{
                    setCurrentCharIndex(currentCharIndex + 1)
                }
            return    
        // if an incorrect letter has been inputted, increament incorrect characters count
        }else if (key !== words[currentWordIndex][currentCharIndex]){ 
            setIncorrectChar(incorrectChar+1)
        }
    }

        return (
            <main>
                <Header user={user} isAuthenticated={isAuthenticated} scores={scores}/>
                <div className="section">
                    {status === "start" || status === "post-game" ? 
                        <div className="d-flex justify-content-center mt-3">
                            <div className="text-center mx-3">{correctChar === 0 && incorrectChar === 0 ? <h3>Accuracy: 0%</h3>:<h3>Accuracy: {Math.round((correctChar / (correctChar + incorrectChar) * 100))}%</h3>}</div>
                            <div className="text-center mx-3"><h3>WPM: {completedWords}</h3></div>
                        </div>
                    :null }
                    <div className="timer text-center">
                        {startCountDown !== -1 ? <h3 className="text-danger" >Starts in: {startCountDown}</h3>: null}
                        {status === "start" ? <h3>{countDown}</h3>: null}
                    </div>
                    {status === "start" || status === "start-timer" ? <Content words={words} contentStyle={""} currentCharIndex={currentCharIndex} currentWordIndex={currentWordIndex}/>
                    : 
                    status === "post-game"? <Content words={words} currentCharIndex={currentCharIndex} contentStyle={"#a3a3a3"} currentWordIndex={currentWordIndex}/>
                    : null}

                    {status === "waiting" ? null :<input className="w-100" value={currentInput} onChange={(e) => {setCurrentInput(e.target.value)}} onKeyDown={(e) => handleKeyDown(e)} disabled={status !== "start"} ref={textInput}></input>}
                    <div className="text-center mt-5">
                        {status === "waiting" ?<h3>Click the button to start a typing test</h3> : null}
                        {status === "start" || status === "start-timer" ? null : <MDBBtn onClick={start}>Start</MDBBtn>}
                    </div>
                </div>   
            </main>
        )
}
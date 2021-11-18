import React, {useState, useEffect, useRef} from 'react'
import randomWords from 'random-words'
import {Content} from './Content'

interface MainProps {

}

// constants for number of generated words and seconds for the game timer
const NUMB_OF_WORDS = 200
const SECONDS = 60

export const Main: React.FC<MainProps> = () => {
    const [words, setWords] = useState<[]>([])
    const [countDown, setCountDown] = useState<number>(SECONDS)
    const [currentInput, setCurrentInput] = useState<string>("")
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [incorrectWords, setIncorrectWords] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [currentChar, setCurrentChar] = useState([])
    const [status, setStatus] = useState("waiting")
    const textInput = useRef<null|any>(null)

    // generate random on mount
    useEffect(() => {
        setWords(generateWords())
    }, [])

    // when the game status changes check if the game is started
    useEffect(() => {
        if (status === "start"){
            textInput.current.focus()
        }
    }, [status])

    // generate random words for the typing content 
    const generateWords = () :any => {
        return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
    }

    // start button, starts interval and sets coundown state
    const start = () => {
        // if the game is finished reset all values
        if (status === "finished"){
            setWords(generateWords())
            setCurrentWordIndex(0)
            setCorrectWords(0)
            setIncorrectWords(0)
        }
        // change game status to start
        if (status !== "start" ){
            setStatus("start")
            let interval = setInterval(() => {
                setCountDown((prevCountDown) => {
                    // if the countdown hits 0 clear the interval and set status to finished
                    if(prevCountDown === 0){
                        setStatus("finished")
                        clearInterval(interval)
                        setCurrentInput("")
                        return SECONDS
                    }
                    // if countdown is not 0 continue reducing the countdown
                    return prevCountDown - 1   
                })
            }, 1000)
        }

    }

    // check if the word matches the inputed word
    const checkMatch = () => {
        const wordToCompare = words[currentWordIndex]
        const match = wordToCompare === currentInput.trim()
        if (match){
            setCorrectWords(correctWords + 1)
        }else{
            setIncorrectWords(incorrectWords + 1)
        }
    }
    // on space keydown check if the word matches the current word, if it does move to next word and clear input
    const handleKeyDown = ({key} :React.KeyboardEvent<HTMLInputElement> | any) => {
        console.log((words[currentWordIndex][currentCharIndex]))
        // if the key down if a space check if word matches
        if (key === " "){
            checkMatch()
            setCurrentInput("")
            setCurrentWordIndex(currentWordIndex + 1)
            setCurrentCharIndex(0)
        // else increment the character index
        }else{
            setCurrentCharIndex(currentCharIndex + 1)
            setCurrentChar(key)


        }
    }

        return (
            <main>
                <div className="section">
                    <div className="timer">
                        <h3>{countDown}</h3>
                    </div>
                    {status === "start" ? <Content words={words} currentCharIndex={currentCharIndex} currentChar={currentChar}/>: null}
                    <input className="w-100" value={currentInput} onChange={(e) => {setCurrentInput(e.target.value)}} onKeyDown={(e) => handleKeyDown(e)} disabled={status !== "start"} ref={textInput}></input>
                    <button onClick={start}>Start</button>
                    <div> Accuracy: {Math.round((correctWords / (correctWords + incorrectWords) * 100))}</div>
                    <div>WPM: </div>
                </div>
            </main>
        );
}
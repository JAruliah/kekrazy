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
    const [correctChar, setCorrectChar] = useState<number>(0)
    const [incorrectChar, setIncorrectChar] = useState<number>(0)
    const [completedWords, setCompletedWords] = useState<number>(0)
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)
    const [currentChar, setCurrentChar] = useState<any[]>([])
    const [status, setStatus] = useState<string>("waiting")
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
        return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords()+" ")
    }

    // start button, starts interval and sets coundown state
    const start = () => {
        // if the game is finished reset all values
        if (status === "finished"){
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


    // on space keydown check if the word matches the current word, if it does move to next word and clear input
    const handleKeyDown = ({key} :React.KeyboardEvent<HTMLInputElement> | any) => {
        // if the key is not a backspace append the key to the current char array
        if (key !== "Backspace"){
            currentChar.push(key)

        }
        // if the key is a backspace pop off the current char array and decrease currentCharIndex by 1
        if (key === "Backspace"){
            currentChar.pop()
            if (currentChar[currentChar.length -1] === words[currentWordIndex][currentCharIndex - 2]){
                if (currentCharIndex <= 0){
                }
                else{
                    setCurrentCharIndex(currentCharIndex - 1)
                }
            }
            return
        }
        // if the key character is equal to the currentCharIndex character and the previous char in the input is equal to the previous char of the word
        if (key === words[currentWordIndex][currentCharIndex] && currentChar[currentChar.length -2] === words[currentWordIndex][currentCharIndex-1]){
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
                <div className="section">
                    <div className="timer">
                        <h3>{countDown}</h3>
                    </div>
                    {status === "start" ? <Content words={words} currentCharIndex={currentCharIndex} currentWordIndex={currentWordIndex}/>: null}
                    <input className="w-100" value={currentInput} onChange={(e) => {setCurrentInput(e.target.value)}} onKeyDown={(e) => handleKeyDown(e)} disabled={status !== "start"} ref={textInput}></input>
                    <button onClick={start}>Start</button>
                    <div>{correctChar === 0 && incorrectChar === 0 ? <h3>Accuracy: 0%</h3>:<h3>Accuracy: {Math.round((correctChar / (correctChar + incorrectChar) * 100))}%</h3>}</div>
                    <div>WPM: {completedWords}</div>
                </div>
            </main>
        );
}
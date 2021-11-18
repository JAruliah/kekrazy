import React from 'react'

interface ContentProps {
    words:any,
    currentCharIndex:number,
    currentWordIndex:number
}

export const Content: React.FC<ContentProps> = ({words, currentWordIndex, currentCharIndex}) => {
        return (
            <div className="card">
                <div className="content">
                    {words.map((word:string, wordIndex:number) => {
                        // splitting all words into spans with 1 char, after the words an empty span
                        return (
                            <span key={wordIndex}>
                                <span>
                                    {word.split("").map((char, index) => {
                                        if (wordIndex === currentWordIndex && index === currentCharIndex){
                                            return (<span className="bg-success" key={index} >{char}</span>)
                                        }else{
                                            return (<span key={index} >{char}</span>)
                                        }
                                    })}
                                </span>
                            </span>
                        )
                    })}
                </div>
            </div>
        );
}
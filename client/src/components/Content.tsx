import React from 'react'

interface ContentProps {
    words:any,
    currentCharIndex:number,
    currentWordIndex:number,
    style:string
}

export const Content: React.FC<ContentProps> = ({words, currentWordIndex, currentCharIndex, style}) => {
        return (
            <div className="card">
                <div className="content fs-4" style={{backgroundColor:style}}>
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
import React from 'react'

interface ContentProps {
    words:any,
    currentCharIndex:number,
    currentChar:string[]
}

export const Content: React.FC<ContentProps> = ({words, currentCharIndex}) => {
        return (
            <div className="card">
                <div className="content">
                    {words.map((word:string, index:number) => {
                        // splitting all words into spans with 1 char, after the words an empty span
                        return (
                            <span key={index}>
                                <span>
                                    {word.split("").map((char, index) => {
                                        return (<span key={index} >{char}</span>)
                                    })}
                                </span>
                                <span> </span>
                            </span>
                        )
                    })}
                </div>
            </div>
        );
}
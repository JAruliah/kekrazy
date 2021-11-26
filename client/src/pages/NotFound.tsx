import React from 'react'
import {Link} from 'react-router-dom'

interface NotFoundProps {

}

export const NotFound: React.FC<NotFoundProps> = () => {
        return (
            <main>
                <div className="m-auto" style={{width:"fit-content"}}>
                    <img src="img/page-not-found.png" alt="not found" width="150" height="150"/>
                    <h3>Page not found</h3>
                    <Link to="/">Take me back please</Link>
                </div>
            </main>
        );
}
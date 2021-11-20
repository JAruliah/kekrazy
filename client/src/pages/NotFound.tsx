import React from 'react'
import {Link} from 'react-router-dom'

interface NotFoundProps {

}

export const NotFound: React.FC<NotFoundProps> = () => {
        return (
            <div>
                <h1>PAGE NOT FOUND</h1>
                <Link to="/">GO BACK</Link>
            </div>
        );
}
import React from 'react'
import {Link} from 'react-router-dom'
import Home from './Home'

//class LeftRight extends Home {data}
const camera = () => {
    return (
        <div>
            <h1>Camera</h1>
            <p>Select Left or Right Camera</p>
            <div>
                {Home.props.data['name']}
            </div>
            <Link to = "/WebCam">
                <button variant = "outlined">
                    Left
                </button>
            </Link>
            <Link to = "/WebCam">
                <button variant = "outlined">
                    Right
                </button>
            </Link>
        </div>
    );
}

export default camera;
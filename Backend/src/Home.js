import React from 'react'
import {CoolText} from 'react-cool-text'
import {Link} from 'react-router-dom'

/*class Home extends Component{
    constructor()
}*/
const home = () => {
    return (
        <div> 
            <h1>Home</h1>
            <p>HOME PAGE</p>
            <Link to = {{
                pathname : "/cameras",
                data : [{name: "MSC", direction: "NA"}]
            }}>
                <button variant = "outlined">
                    MSC
                </button>
            </Link>
            <Link to = {{
                pathname : "/cameras",
                data : [{name: "Zachary", direction: "NA"}]
            }}>
                <button variant = "outlined">
                    Zachary
                </button>
            </Link>
            <Link to = {{
                pathname : "/cameras",
                data : [{name: "Sbisa", direction: "NA"}]
            }}>
                <button variant = "outlined">
                    Sbisa
                </button>
            </Link>
        </div>
    );
}

export default home;
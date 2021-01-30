import React, { Component } from 'react';

// Import components
import Loading from './Loading';

//Import styling

class Widget extends Component {
    constructor(props) {
        super(props);

        // Create inline styles to make grid elements span multiple rows/columns
        this.spanStyles = {};
    }

    render() {
        return (
            <div className="Widget">
                <p>This is a widget</p>
            </div>
        );
    }
}

// Provide default settings for when they aren't supplied


// Enforce the type of props to send to this component


export default Widget;
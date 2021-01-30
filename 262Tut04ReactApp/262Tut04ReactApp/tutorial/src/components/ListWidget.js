import React, { Component } from 'react';

// Import components
import Widget from '../components/Widget';
import ListDisplay from '../components/ListDisplay';
import ListItem from '../components/ListItem';

// Import styling
import '../styles/ListWidget.css';

class ListWidget extends Component {
    //Sort items in descending order
    sortListItems() {
        let sortedItems = this.props.listItems.slice();
        return sortedItems;
    }

    // Decide whether to show widget
    showWidget() {
        let sortedItems = this.sortListItems();

        // Show loading indicator while initial data is being fetched
        if (this.props.listItems.length === 0) {
            return null;
        }

        // Get min/max values for progress bar
        let min = 0;
        let max = sortedItems[0].value;

        return (
            <ListDisplay>
                {/* Add a ListItem for each piece of data */}
            </ListDisplay>
        );
    }

    render() {
        return (
            // Wrap the list display component in the generic wrapper
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading} >
                <div className="ListWidget">
                    {/* Conditionally show the widget */}
                    {this.showWidget()}
                </div>
            </Widget>
        );
    }
}

// Enforce the type of props to send to this component
ListWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    loading: React.PropTypes.bool.isRequired,
    listItems: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default ListWidget;
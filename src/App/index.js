import React from 'react';
import PropTypes from 'prop-types';

import Component from '../Component';

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

    getChildContext() {
        return {
            theme: this.props.theme,
        };
    }

}

App.propTypes = {
    theme: PropTypes.string,
};

App.childContextTypes = {
    theme: PropTypes.string,
};

export default App;

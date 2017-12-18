import React from 'react';
import PropTypes from 'prop-types';
import Component from '../Component';

class Spinner extends Component {
    render() {
        return <span className={this.className()} />;
    }

    className() {
        let className = 'spin spin_visible';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' spin_theme_' + theme;
        }
        if (this.props.size) {
            className += ' spin_size_' + this.props.size;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }
}

Spinner.contextTypes = {
    theme: PropTypes.string,
};

Spinner.propTypes = {
    theme: PropTypes.string,
    size: PropTypes.string,
};

export default Spinner;

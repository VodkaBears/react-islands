import React from 'react';
import PropTypes from 'prop-types';
import Component from '../Component';

class RadioGroup extends Component {
    constructor(props) {
        super(props);

        this.onChildCheck = this.onChildCheck.bind(this);
    }

    render() {
        const { theme, size, type, name, disabled, value } = this.props;

        const children = React.Children.map(this.props.children, child => {
            const checked = child.props.value === value;
            return React.cloneElement(child, {
                theme,
                size,
                type,
                name,
                value,
                disabled,
                ...child.props,
                checked,
                onCheck: this.onChildCheck,
            });
        });

        return (
            <span className={this.className()}>
                {children}
            </span>
        );
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'radio-group radio-group_js_inited control-group';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' radio-group_theme_' + theme;
        }
        if (this.props.size) {
            className += ' radio-group_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' radio-group_type_' + this.props.type;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onChildCheck(_, radioProps) {
        const value = radioProps.value;
        if (value !== this.props.value) {
            this.props.onChange(value, this.props);
        }
    }
}

RadioGroup.contextTypes = {
    theme: PropTypes.string,
};

RadioGroup.propTypes = {
    theme: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
    onChange() {},
};

module.exports = RadioGroup;

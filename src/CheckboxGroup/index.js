import React from 'react';
import PropTypes from 'prop-types';

import Component from '../Component';

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);

        this.onChildCheck = this.onChildCheck.bind(this);
    }

    render() {
        const { theme, size, type, name, disabled, value } = this.props;

        const children = React.Children.map(this.props.children, child => {
            const checked = value.indexOf(child.props.value) !== -1;
            return React.cloneElement(child, {
                theme,
                size,
                type,
                name,
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
        var className = 'checkbox-group checkbox-group_js_inited control-group';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' checkbox-group_theme_' + theme;
        }
        if (this.props.size) {
            className += ' checkbox-group_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' checkbox-group_type_' + this.props.type;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onChildCheck(checked, childProps) {
        const { value } = this.props;
        const childValue = childProps.value;
        if (checked && value.indexOf(childValue) === -1) {
            //  FIXME: Не нужно ли тут возвращать массив в том же порядке,
            //  как эти значение в RadioGroup расположены?
            //
            const newValue = value.concat(childValue);
            this.props.onChange(newValue, this.props);
        } else if (!checked) {
            const newValue = value.filter(item => (item !== childValue));
            this.props.onChange(newValue, this.props);
        }
    }
}

CheckboxGroup.contextTypes = {
    theme: PropTypes.string,
};

CheckboxGroup.propTypes = {
    theme: PropTypes.string,
    size: PropTypes.oneOf(['m', 'l', 'xl']),
    type: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {
    value: [],
    onChange() {},
};

export default CheckboxGroup;

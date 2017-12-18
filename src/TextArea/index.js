import React from 'react';
import PropTypes from 'prop-types';
import Control from '../Control';

class TextArea extends Control {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        return (
            <textarea ref="control" {...this.getControlHandlers()} className={this.className()}
                id={this.props.id}
                name={this.props.name}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.props.value}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
                onChange={this.onInputChange}
                onClick={this.props.onClick}
            >
            </textarea>
        );
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'textarea textarea_js_inited';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' textarea_theme_' + theme;
        }
        if (this.props.size) {
            className += ' textarea_size_' + this.props.size;
        }
        if (this.props.disabled) {
            className += ' textarea_disabled';
        }
        if (this.state.hovered) {
            className += ' textarea_hovered';
        }
        if (this.state.focused) {
            className += ' textarea_focused';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onInputChange(e) {
        if (this.props.disabled) {
            return;
        }
        this.props.onChange(e.target.value, this.props);
    }
}

TextArea.contextTypes = {
    theme: PropTypes.string,
};

TextArea.propTypes = {
    theme: PropTypes.string,
    size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

TextArea.defaultProps = {
    onChange() {},
};

export default TextArea;

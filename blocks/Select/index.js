import React from 'react';
import ReactDOM from 'react-dom';

import Component from '../Component';
import Button from '../Button';
import Popup from '../Popup';
import Menu from '../Menu';
import Icon from '../Icon';
import MenuItem from '../Menu/MenuItem';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popupVisible: false
        };

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onMenuChange = this.onMenuChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    render() {
        const children = React.Children.toArray(this.props.children);

        const options = children.map(child => React.createElement(MenuItem, child.props));
        const hiddens = this.props.value.map(value =>
            <input type="hidden" name={this.props.name} value={value}/>
        );

        const texts = [];
        children.forEach(child => {
            if (this.props.value.indexOf(child.props.value) !== -1) {
                if (this.props.value.length === 1) {
                    texts.push(Component.textValue(child));

                } else {
                    texts.push(child.props.checkedText || Component.textValue(child));
                }
            }
        });
        const text = texts.join(', ') || this.props.text || '—';

        return (
            <div className={this.className()}>
                {hiddens}

                <Button ref="button" className="select__button"
                    size={this.props.size}
                    onClick={this.onButtonClick}
                >
                    {text}
                    <Icon className="select__tick"/>
                </Button>
                <Popup
                    visible={this.state.popupVisible}
                    target={() => ReactDOM.findDOMNode(this.refs.button)}
                >
                    <Menu size={this.props.size} mode={this.props.mode} value={this.props.value} onChange={this.onMenuChange}>
                        {options}
                    </Menu>
                </Popup>
            </div>
        );
    }

    className() {
        var className = 'select';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' select_theme_' + theme;
        }
        if (this.props.size) {
            className += ' select_size_' + this.props.size;
        }
        if (this.props.mode) {
            className += ' select_mode_' + this.props.mode;
        }
        if (this.props.disabled) {
            className += ' select_disabled';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return className;
    }

    onButtonClick() {
        this.setState({
            popupVisible: !this.state.popupVisible
        });
    }

    onMenuChange(value) {
        this.props.onChange(value, this.props);
    }

}

Select.defaultProps = {
    onChange() {}
};

Select.contextTypes = {
    theme: React.PropTypes.string
};

export default Select;

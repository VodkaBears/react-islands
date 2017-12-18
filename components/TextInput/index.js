'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Control2 = require('../Control');

var _Control3 = _interopRequireDefault(_Control2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = function (_Control) {
    (0, _inherits3.default)(TextInput, _Control);

    function TextInput(props) {
        (0, _classCallCheck3.default)(this, TextInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, props));

        _this.onClearClick = _this.onClearClick.bind(_this);
        _this.onInputChange = _this.onInputChange.bind(_this);
        return _this;
    }

    TextInput.prototype.render = function render() {
        var value = this.props.value;


        var hasClear = void 0;
        if (this.props.hasClear) {
            var clearClassName = 'input__clear';

            if (value) {
                clearClassName += ' input__clear_visible';
            }

            hasClear = _react2.default.createElement('i', { className: clearClassName, onClick: this.onClearClick });
        }

        return _react2.default.createElement(
            'span',
            { className: this.className() },
            _react2.default.createElement(
                'span',
                { className: 'input__box' },
                _react2.default.createElement('input', (0, _extends3.default)({
                    ref: 'control'
                }, this.getControlHandlers(), {
                    className: 'input__control',
                    id: this.props.id,
                    name: this.props.name,
                    type: this.props.type,
                    disabled: this.props.disabled,
                    placeholder: this.props.placeholder,
                    autoComplete: this.props.autocomplete,
                    minLength: this.props.minLength,
                    maxLength: this.props.maxLength,
                    value: value,
                    onChange: this.onInputChange,
                    onClick: this.props.onClick,
                    onKeyDown: this.props.onKeyDown,
                    onKeyUp: this.props.onKeyUp,
                    onKeyPress: this.props.onKeyPress
                })),
                hasClear
            )
        );
    };

    TextInput.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'input input_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' input_theme_' + theme;
        }
        if (this.props.size) {
            className += ' input_size_' + this.props.size;
        }
        if (this.props.disabled) {
            className += ' input_disabled';
        }
        if (this.state.hovered) {
            className += ' input_hovered';
        }
        if (this.state.focused) {
            className += ' input_focused';
        }
        if (this.props.hasClear) {
            className += ' input_has-clear';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    TextInput.prototype.onInputChange = function onInputChange(e) {
        if (this.props.disabled) {
            return;
        }
        this.props.onChange(e.target.value, this.props);
    };

    TextInput.prototype.onClearClick = function onClearClick(e) {
        this.onFocus();

        if (this.props.onClearClick) {
            this.props.onClearClick(e);
        }

        if (!e.isDefaultPrevented()) {
            this.props.onChange('', this.props, { source: 'clear' });
        }
    };

    return TextInput;
}(_Control3.default);

TextInput.contextTypes = {
    theme: _propTypes2.default.string
};

TextInput.propTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    type: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    autocomplete: _propTypes2.default.string,
    minLength: _propTypes2.default.number,
    maxLength: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    hasClear: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onClearClick: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    onKeyUp: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func
};

TextInput.defaultProps = {
    type: 'text',
    onChange: function onChange() {}
};

exports.default = TextInput;
module.exports = exports['default'];
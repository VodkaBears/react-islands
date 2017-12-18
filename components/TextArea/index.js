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

var TextArea = function (_Control) {
    (0, _inherits3.default)(TextArea, _Control);

    function TextArea(props) {
        (0, _classCallCheck3.default)(this, TextArea);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, props));

        _this.onInputChange = _this.onInputChange.bind(_this);
        return _this;
    }

    TextArea.prototype.render = function render() {
        return _react2.default.createElement('textarea', (0, _extends3.default)({ ref: 'control' }, this.getControlHandlers(), { className: this.className(),
            id: this.props.id,
            name: this.props.name,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.value,
            minLength: this.props.minLength,
            maxLength: this.props.maxLength,
            onChange: this.onInputChange,
            onClick: this.props.onClick
        }));
    };

    TextArea.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'textarea textarea_js_inited';

        var theme = this.props.theme || this.context.theme;
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
    };

    TextArea.prototype.onInputChange = function onInputChange(e) {
        if (this.props.disabled) {
            return;
        }
        this.props.onChange(e.target.value, this.props);
    };

    return TextArea;
}(_Control3.default);

TextArea.contextTypes = {
    theme: _propTypes2.default.string
};

TextArea.propTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    minLength: _propTypes2.default.number,
    maxLength: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onClick: _propTypes2.default.func
};

TextArea.defaultProps = {
    onChange: function onChange() {}
};

exports.default = TextArea;
module.exports = exports['default'];
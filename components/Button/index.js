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

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

var _Control2 = require('../Control');

var _Control3 = _interopRequireDefault(_Control2);

var _pressable = require('../pressable');

var _pressable2 = _interopRequireDefault(_pressable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Control) {
    (0, _inherits3.default)(Button, _Control);

    function Button() {
        (0, _classCallCheck3.default)(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call.apply(_Control, [this].concat(args)));

        _this._wrappedChildren = null;
        return _this;
    }

    /** @override */


    Button.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
        if (_Control.prototype.componentWillUpdate) {
            _Control.prototype.componentWillUpdate.call(this, nextProps, nextState);
        }

        if (this.props.children !== nextProps.children) {
            this._wrappedChildren = null;
        }
    };

    Button.prototype.render = function render() {
        var props = this.props;

        if (!this._wrappedChildren) {
            this._wrappedChildren = _Component2.default.wrap(props.children, function (child) {
                return (
                    // NOTE: this `key` is to harmonize the one we have in `Component.wrap()`
                    _react2.default.createElement(
                        'span',
                        { key: 'wrappedText', className: 'button__text' },
                        child
                    )
                );
            });
        }

        if (props.type === 'link') {
            var url = props.disabled ? null : props.url;

            return _react2.default.createElement(
                'a',
                (0, _extends3.default)({ id: props.id, className: this.className() }, this.getControlHandlers(), { ref: 'control', role: 'link', href: url }),
                this._wrappedChildren
            );
        } else {
            return _react2.default.createElement(
                'button',
                (0, _extends3.default)({
                    className: this.className()
                }, this.getControlHandlers(), {
                    ref: 'control',
                    type: props.type,
                    id: props.id,
                    name: props.name,
                    title: props.title,
                    disabled: props.disabled
                }),
                this._wrappedChildren
            );
        }
    };

    Button.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'button button_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' button_theme_' + theme;
        }
        if (this.props.size) {
            className += ' button_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' button_type_' + this.props.type;
        }
        if (this.props.view) {
            className += ' button_view_' + this.props.view;
        }
        if (this.props.disabled) {
            className += ' button_disabled';
        }
        if (this.state.hovered) {
            className += ' button_hovered';
        }
        if (this.state.pressed) {
            className += ' button_pressed';
        }
        if (this.state.focused === 'hard') {
            className += ' button_focused button_focused-hard';
        } else if (this.state.focused) {
            className += ' button_focused';
        }
        if (this.props.checked) {
            className += ' button_checked';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    return Button;
}(_Control3.default);

Button.propTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    type: _propTypes2.default.string,
    title: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

Button.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = (0, _pressable2.default)(Button);
module.exports = exports['default'];
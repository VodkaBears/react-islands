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

var _pressable = require('../pressable');

var _pressable2 = _interopRequireDefault(_pressable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function (_Control) {
    (0, _inherits3.default)(Link, _Control);

    function Link() {
        (0, _classCallCheck3.default)(this, Link);
        return (0, _possibleConstructorReturn3.default)(this, _Control.apply(this, arguments));
    }

    Link.prototype.render = function render() {
        var _props = this.props,
            id = _props.id,
            disabled = _props.disabled,
            title = _props.title;


        if (this.props.url) {
            var url = disabled ? null : this.props.url;

            return _react2.default.createElement(
                'a',
                (0, _extends3.default)({ id: id, className: this.className() }, this.getControlHandlers(), { href: url, target: this.props.target, title: title }),
                this.props.children
            );
        } else {
            var tabIndex = disabled ? -1 : 0;

            return _react2.default.createElement(
                'span',
                (0, _extends3.default)({ id: id, className: this.className() }, this.getControlHandlers(), { role: 'button', tabIndex: tabIndex, title: title }),
                this.props.children
            );
        }
    };

    Link.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'link link_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' link_theme_' + theme;
        }
        if (this.props.type) {
            className += ' link_type_' + this.props.type;
        }
        if (this.props.disabled) {
            className += ' link_disabled';
        }
        if (this.props.focused) {
            className += ' link_focused';
        }
        if (this.props.view) {
            className += ' link_view_' + this.props.view;
        }
        if (this.state.hovered) {
            className += ' link_hovered';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    return Link;
}(_Control3.default);

Link.propTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    view: _propTypes2.default.oneOf(['minor', 'external']),
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    type: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    focused: _propTypes2.default.bool,
    target: _propTypes2.default.string,
    title: _propTypes2.default.string,
    url: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

Link.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = (0, _pressable2.default)(Link);
module.exports = exports['default'];
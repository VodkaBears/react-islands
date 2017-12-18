'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_React$Component) {
    (0, _inherits3.default)(Component, _React$Component);

    function Component() {
        (0, _classCallCheck3.default)(this, Component);
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
    }

    return Component;
}(_react2.default.Component);

Component.wrap = function (children, wrapper) {
    var wrapped = [];

    var chunk = null;
    _react2.default.Children.forEach(children, function (child, i) {
        if (Component.is(child, Component)) {
            if (chunk) {
                wrapped.push(wrapper(chunk));
                chunk = null;
            }
            if (child.key) {
                wrapped.push(child);
            } else {
                // FIXME(narqo@): had to add `key` in the runtime, after https://github.com/narqo/react-islands/pull/46
                wrapped.push(_react2.default.cloneElement(child, { key: 'wrappedChild' + i }));
            }
        } else if (chunk) {
            chunk.push(child);
        } else {
            chunk = [child];
        }
    });
    if (chunk) {
        wrapped.push(wrapper(chunk));
    }

    return wrapped;
};

Component.textValue = function (component) {
    var text = '';
    _react2.default.Children.forEach(component.props.children, function (child) {
        if (typeof child === 'string') {
            text += child;
        } else if (typeof child === 'number') {
            text += String(child);
        }
    });
    return text;
};

Component.is = function (obj, ctor) {
    return _react2.default.isValidElement(obj) && (obj.type === ctor || obj.type.prototype instanceof ctor);
};

exports.default = Component;
module.exports = exports['default'];
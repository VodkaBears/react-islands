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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function (_Component) {
    (0, _inherits3.default)(Icon, _Component);

    function Icon() {
        (0, _classCallCheck3.default)(this, Icon);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    Icon.prototype.render = function render() {
        if (this.props.url) {
            return _react2.default.createElement('span', { className: this.className(), style: {
                    backgroundImage: 'url(' + this.props.url + ')'
                } });
        } else {
            return _react2.default.createElement(
                'span',
                { className: this.className() },
                this.props.children
            );
        }
    };

    Icon.prototype.className = function className() {
        var className = 'icon';

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    return Icon;
}(_Component3.default);

exports.default = Icon;
module.exports = exports['default'];
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

var Spinner = function (_Component) {
    (0, _inherits3.default)(Spinner, _Component);

    function Spinner() {
        (0, _classCallCheck3.default)(this, Spinner);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    Spinner.prototype.render = function render() {
        return _react2.default.createElement('span', { className: this.className() });
    };

    Spinner.prototype.className = function className() {
        var className = 'spin spin_visible';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' spin_theme_' + theme;
        }
        if (this.props.size) {
            className += ' spin_size_' + this.props.size;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    return Spinner;
}(_Component3.default);

Spinner.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = Spinner;
module.exports = exports['default'];
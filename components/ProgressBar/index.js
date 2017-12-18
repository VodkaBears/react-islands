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

var ProgressBar = function (_Component) {
    (0, _inherits3.default)(ProgressBar, _Component);

    function ProgressBar() {
        (0, _classCallCheck3.default)(this, ProgressBar);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    ProgressBar.prototype.render = function render() {
        var value = this.props.value + '%';

        return _react2.default.createElement(
            'div',
            { className: this.className(), role: 'progressbar', 'aria-valuenow': '' + value },
            _react2.default.createElement('div', { className: 'progressbar__bar', style: { width: '' + value } })
        );
    };

    ProgressBar.prototype.className = function className() {
        var className = 'progressbar';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' progressbar_theme_' + theme;
        }
        if (this.props.size) {
            className += ' progressbar_size_' + this.props.size;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    return ProgressBar;
}(_Component3.default);

ProgressBar.contextTypes = {
    theme: _propTypes2.default.string
};

ProgressBar.defaultProps = {
    value: 0
};

exports.default = ProgressBar;
module.exports = exports['default'];
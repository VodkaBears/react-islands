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

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = function (_Component) {
    (0, _inherits3.default)(MenuItem, _Component);

    function MenuItem(props) {
        (0, _classCallCheck3.default)(this, MenuItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        return _this;
    }

    MenuItem.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            {
                className: this.className(),
                onClick: this.onClick,
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave
            },
            this.props.children
        );
    };

    MenuItem.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'menu-item menu-item_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' menu-item_theme_' + theme;
        }
        if (this.props.size) {
            className += ' menu-item_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' menu-item_type_' + this.props.type;
        }
        if (this.props.disabled) {
            className += ' menu-item_disabled';
        }
        if (this.props.hovered) {
            className += ' menu-item_hovered';
        }
        if (this.props.checked) {
            className += ' menu-item_checked';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    MenuItem.prototype.onClick = function onClick(e) {
        if (this.props.disabled) {
            return;
        }

        this.props.onClick(e, this.props);
    };

    MenuItem.prototype.onMouseEnter = function onMouseEnter() {
        if (this.props.disabled) {
            return;
        }

        this.props.onHover(true, this.props);
    };

    MenuItem.prototype.onMouseLeave = function onMouseLeave() {
        if (this.props.disabled) {
            return;
        }

        this.props.onHover(false, this.props);
    };

    return MenuItem;
}(_Component3.default);

MenuItem.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = MenuItem;
module.exports = exports['default'];
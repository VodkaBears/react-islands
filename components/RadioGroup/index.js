'use strict';

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

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = function (_Component) {
    (0, _inherits3.default)(RadioGroup, _Component);

    function RadioGroup(props) {
        (0, _classCallCheck3.default)(this, RadioGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.onChildCheck = _this.onChildCheck.bind(_this);
        return _this;
    }

    RadioGroup.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            theme = _props.theme,
            size = _props.size,
            type = _props.type,
            name = _props.name,
            disabled = _props.disabled,
            value = _props.value;


        var children = _react2.default.Children.map(this.props.children, function (child) {
            var checked = child.props.value === value;
            return _react2.default.cloneElement(child, (0, _extends3.default)({
                theme: theme,
                size: size,
                type: type,
                name: name,
                value: value,
                disabled: disabled
            }, child.props, {
                checked: checked,
                onCheck: _this2.onChildCheck
            }));
        });

        return _react2.default.createElement(
            'span',
            { className: this.className() },
            children
        );
    };

    RadioGroup.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'radio-group radio-group_js_inited control-group';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' radio-group_theme_' + theme;
        }
        if (this.props.size) {
            className += ' radio-group_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' radio-group_type_' + this.props.type;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    RadioGroup.prototype.onChildCheck = function onChildCheck(_, radioProps) {
        var value = radioProps.value;
        if (value !== this.props.value) {
            this.props.onChange(value, this.props);
        }
    };

    return RadioGroup;
}(_Component3.default);

RadioGroup.contextTypes = {
    theme: _propTypes2.default.string
};

RadioGroup.defaultProps = {
    onChange: function onChange() {}
};

module.exports = RadioGroup;
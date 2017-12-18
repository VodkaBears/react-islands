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

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = function (_Component) {
    (0, _inherits3.default)(CheckboxGroup, _Component);

    function CheckboxGroup(props) {
        (0, _classCallCheck3.default)(this, CheckboxGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.onChildCheck = _this.onChildCheck.bind(_this);
        return _this;
    }

    CheckboxGroup.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            theme = _props.theme,
            size = _props.size,
            type = _props.type,
            name = _props.name,
            disabled = _props.disabled,
            value = _props.value;


        var children = _react2.default.Children.map(this.props.children, function (child) {
            var checked = value.indexOf(child.props.value) !== -1;
            return _react2.default.cloneElement(child, (0, _extends3.default)({
                theme: theme,
                size: size,
                type: type,
                name: name,
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

    CheckboxGroup.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'checkbox-group checkbox-group_js_inited control-group';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' checkbox-group_theme_' + theme;
        }
        if (this.props.size) {
            className += ' checkbox-group_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' checkbox-group_type_' + this.props.type;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    CheckboxGroup.prototype.onChildCheck = function onChildCheck(checked, childProps) {
        var value = this.props.value;

        var childValue = childProps.value;
        if (checked && value.indexOf(childValue) === -1) {
            //  FIXME: Не нужно ли тут возвращать массив в том же порядке,
            //  как эти значение в RadioGroup расположены?
            //
            var newValue = value.concat(childValue);
            this.props.onChange(newValue, this.props);
        } else if (!checked) {
            var _newValue = value.filter(function (item) {
                return item !== childValue;
            });
            this.props.onChange(_newValue, this.props);
        }
    };

    return CheckboxGroup;
}(_Component3.default);

CheckboxGroup.contextTypes = {
    theme: _propTypes2.default.string
};

CheckboxGroup.defaultProps = {
    value: [],
    onChange: function onChange() {}
};

exports.default = CheckboxGroup;
module.exports = exports['default'];
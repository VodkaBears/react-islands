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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_SPACE = ' ';
var KEY_ENTER = 'Enter';

function pressable(BaseComponent) {
    var displayName = BaseComponent.displayName || BaseComponent.name;

    var PressableComponent = function (_BaseComponent) {
        (0, _inherits3.default)(PressableComponent, _BaseComponent);

        function PressableComponent() {
            (0, _classCallCheck3.default)(this, PressableComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = (0, _possibleConstructorReturn3.default)(this, _BaseComponent.call.apply(_BaseComponent, [this].concat(args)));

            _this.state = (0, _extends3.default)({}, _this.state, {
                pressed: false
            });

            _this.shouldPrevenDefaultClick = false;

            _this.onMouseUp = _this.onMouseUp.bind(_this);
            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onKeyUp = _this.onKeyUp.bind(_this);
            _this.onKeyDown = _this.onKeyDown.bind(_this);
            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        /** @override */


        PressableComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
            if (_BaseComponent.prototype.componentWillReceiveProps) {
                _BaseComponent.prototype.componentWillReceiveProps.call(this, props);
            }
            if (props.disabled === true) {
                this.setState({ pressed: false });
            }
        };

        PressableComponent.prototype.getControlHandlers = function getControlHandlers() {
            return (0, _extends3.default)({}, _BaseComponent.prototype.getControlHandlers.call(this), {
                onClick: this.onClick,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onKeyUp: this.onKeyUp,
                onKeyDown: this.onKeyDown,
                onKeyPress: this.props.onKeyPress
            });
        };

        PressableComponent.prototype.dispatchClick = function dispatchClick(e) {
            if (this.props.onClick) {
                this.shouldPrevenDefaultClick = false;

                var eventType = e.type;
                e.type = 'click';
                this.props.onClick(e, this.props);
                e.type = eventType;

                if (e.isDefaultPrevented()) {
                    this.shouldPrevenDefaultClick = true;
                }
            }
        };

        /** @override */


        PressableComponent.prototype.onMouseLeave = function onMouseLeave() {
            if (_BaseComponent.prototype.onMouseLeave) {
                _BaseComponent.prototype.onMouseLeave.call(this);
            }
            this.setState({ pressed: false });
        };

        /** @override */


        PressableComponent.prototype.onMouseDown = function onMouseDown(e) {
            if (_BaseComponent.prototype.onMouseDown) {
                _BaseComponent.prototype.onMouseDown.call(this, e);
            }
            if (!this.props.disabled && e.button === 0) {
                this.setState({ pressed: true });
            }
        };

        /** @override */


        PressableComponent.prototype.onMouseUp = function onMouseUp(e) {
            if (_BaseComponent.prototype.onMouseUp) {
                _BaseComponent.prototype.onMouseUp.call(this, e);
            }
            if (this.state.pressed) {
                this.setState({ pressed: false });
                this.dispatchClick(e);
            }
        };

        /** @override */


        PressableComponent.prototype.onFocus = function onFocus() {
            if (!this.state.pressed && _BaseComponent.prototype.onFocus) {
                _BaseComponent.prototype.onFocus.call(this);
            }
        };

        /** @override */


        PressableComponent.prototype.onKeyDown = function onKeyDown(e) {
            if (this.props.disabled || !this.state.focused) {
                return;
            }
            if (e.key === KEY_SPACE || e.key === KEY_ENTER) {
                this.setState({ pressed: true });
            }
            if (this.props.onKeyDown) {
                this.props.onKeyDown(e, this.props);
            }
        };

        /** @override */


        PressableComponent.prototype.onKeyUp = function onKeyUp(e) {
            if (!this.state.focused) {
                return;
            }
            if (this.state.pressed) {
                this.setState({ pressed: false });
                this.dispatchClick(e);
            }
            if (this.props.onKeyUp) {
                this.props.onKeyUp(e, this.props);
            }
        };

        /** @override */


        PressableComponent.prototype.onClick = function onClick(e) {
            if (this.shouldPrevenDefaultClick) {
                e.preventDefault();
            }
            if (_BaseComponent.prototype.onClick) {
                _BaseComponent.prototype.onClick.call(this, e);
            }
        };

        return PressableComponent;
    }(BaseComponent);

    PressableComponent.displayName = displayName;

    PressableComponent.propsTypes = (0, _extends3.default)({}, BaseComponent.propTypes, {
        disabled: _propTypes2.default.bool,
        onClick: _propTypes2.default.func,
        onKeyDown: _propTypes2.default.func,
        onKeyUp: _propTypes2.default.func
    });

    return PressableComponent;
}

exports.default = pressable;
module.exports = exports['default'];
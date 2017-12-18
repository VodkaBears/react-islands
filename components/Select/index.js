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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement(_Icon2.default, { className: 'select__tick' });

var Select = function (_Component) {
    (0, _inherits3.default)(Select, _Component);

    function Select(props) {
        (0, _classCallCheck3.default)(this, Select);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            buttonFocused: false,
            menuFocused: false,
            menuHeight: null,
            popupVisible: false
        };

        _this._cachedChildren = null;

        _this.getControl = _this.getControl.bind(_this);
        _this.onButtonClick = _this.onButtonClick.bind(_this);
        _this.onButtonFocusChange = _this.onButtonFocusChange.bind(_this);
        _this.onButtonKeyDown = _this.onButtonKeyDown.bind(_this);
        _this.onMenuChange = _this.onMenuChange.bind(_this);
        _this.onMenuFocusChange = _this.onMenuFocusChange.bind(_this);
        _this.onMenuItemClick = _this.onMenuItemClick.bind(_this);
        _this.onMenuKeyDown = _this.onMenuKeyDown.bind(_this);
        _this.onPopupRequestHide = _this.onPopupRequestHide.bind(_this);
        _this.onPopupLayout = _this.onPopupLayout.bind(_this);
        return _this;
    }

    Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.children !== this.props.children) {
            this._cachedChildren = null;
        }
    };

    Select.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.popupVisible && (this.state.popupVisible !== prevState.popupVisible || this.props.value !== prevProps.value)) {
            this.updateMenuWidth();
        }
    };

    Select.prototype.componentWillUnmount = function componentWillUnmount() {
        this.setState({ popupVisible: false });
        this._cachedChildren = null;
    };

    Select.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: this.className() },
            this.renderInputs(),
            this.renderButton(),
            _react2.default.createElement(
                _Popup2.default,
                {
                    theme: this.props.theme,
                    size: this.props.size,
                    anchor: this.getControl,
                    directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
                    visible: this.state.popupVisible,
                    onLayout: this.onPopupLayout,
                    onRequestHide: this.onPopupRequestHide
                },
                this.renderMenu()
            )
        );
    };

    Select.prototype.renderButtonText = function renderButtonText() {
        var value = this.props.value;

        return this.getItems().reduce(function (res, item) {
            if (value.indexOf(item.props.value) !== -1) {
                if (value.length === 1) {
                    res.push(_Component3.default.textValue(item));
                } else {
                    res.push(item.props.checkedText || _Component3.default.textValue(item));
                }
            }
            return res;
        }, []).join(', ');
    };

    Select.prototype.renderButton = function renderButton() {
        var _props = this.props,
            theme = _props.theme,
            size = _props.size,
            disabled = _props.disabled,
            mode = _props.mode,
            value = _props.value,
            id = _props.id;
        var buttonFocused = this.state.buttonFocused;

        var checked = (mode === 'check' || mode === 'radio-check') && Array.isArray(value) && value.length > 0;

        return _react2.default.createElement(
            _Button2.default,
            {
                ref: 'button',
                theme: theme,
                size: size,
                id: id,
                className: 'select__button',
                type: 'button',
                disabled: disabled,
                checked: checked,
                focused: buttonFocused,
                onClick: this.onButtonClick,
                onKeyDown: this.onButtonKeyDown,
                onFocusChange: this.onButtonFocusChange
            },
            this.renderButtonText() || this.props.placeholder,
            _ref
        );
    };

    Select.prototype.renderMenu = function renderMenu() {
        var _props2 = this.props,
            theme = _props2.theme,
            size = _props2.size,
            disabled = _props2.disabled,
            mode = _props2.mode,
            value = _props2.value;
        var _state = this.state,
            menuHeight = _state.menuHeight,
            menuFocused = _state.menuFocused,
            popupVisible = _state.popupVisible;

        var focused = popupVisible && menuFocused;
        var tabIndex = -1;

        return _react2.default.createElement(
            _Menu2.default,
            {
                ref: 'menu',
                theme: theme,
                size: size,
                className: 'select__menu',
                mode: mode,
                value: value,
                focused: focused,
                disabled: disabled,
                tabIndex: tabIndex,
                maxHeight: menuHeight,
                onItemClick: this.onMenuItemClick,
                onFocusChange: this.onMenuFocusChange,
                onKeyDown: this.onMenuKeyDown,
                onChange: this.onMenuChange
            },
            this.props.children
        );
    };

    Select.prototype.renderInputs = function renderInputs() {
        if (this.props.disabled) {
            return null;
        }

        var name = this.props.name;

        return this.props.value.map(function (value, i) {
            return _react2.default.createElement('input', { type: 'hidden', key: 'input' + i, name: name, value: value });
        });
    };

    Select.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'select select_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' select_theme_' + theme;
        }
        if (this.props.size) {
            className += ' select_size_' + this.props.size;
        }
        if (this.props.mode) {
            className += ' select_mode_' + this.props.mode;
        }
        if (this.props.disabled) {
            className += ' select_disabled';
        }
        if (this.state.popupVisible) {
            className += ' select_opened';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return className;
    };

    Select.prototype.getItems = function getItems() {
        if (!this._cachedChildren) {
            var items = [];

            _react2.default.Children.forEach(this.props.children, function (child) {
                if (_Component3.default.is(child, _Item2.default)) {
                    items.push(child);
                } else if (_Component3.default.is(child, _Group2.default)) {
                    //  Предполагаем, что ничего, кроме Item внутри Group уже нет.
                    items = items.concat(_react2.default.Children.toArray(child.props.children));
                }
            });

            this._cachedChildren = items;
        }

        return this._cachedChildren;
    };

    Select.prototype.getControl = function getControl() {
        return this.refs.button;
    };

    Select.prototype.getMenu = function getMenu() {
        return this.refs.menu;
    };

    Select.prototype.updateMenuWidth = function updateMenuWidth() {
        var buttonWidth = _reactDom2.default.findDOMNode(this.getControl()).offsetWidth;
        _reactDom2.default.findDOMNode(this.getMenu()).style['min-width'] = buttonWidth + 'px';
    };

    Select.prototype.onButtonClick = function onButtonClick() {
        var _this2 = this;

        var popupVisible = !this.state.popupVisible;
        this.setState({ popupVisible: popupVisible }, function () {
            return popupVisible && _this2.setState({ menuFocused: true });
        });
    };

    Select.prototype.onButtonFocusChange = function onButtonFocusChange(buttonFocused) {
        this.setState({ buttonFocused: buttonFocused });
    };

    Select.prototype.onButtonKeyDown = function onButtonKeyDown(e) {
        var _this3 = this;

        if (!this.state.popupVisible && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && !e.shiftKey) {
            this.setState({ popupVisible: true }, function () {
                return _this3.setState({ menuFocused: true });
            });
        }
    };

    Select.prototype.onMenuItemClick = function onMenuItemClick() {
        var _this4 = this;

        if (this.props.mode === 'radio' || this.props.mode === 'radio-check') {
            // NOTE(narqo@): select with mode radio* must be closed on click within <Menu>
            this.setState({ popupVisible: false }, function () {
                return _this4.setState({ buttonFocused: true });
            });
        }
    };

    Select.prototype.onMenuKeyDown = function onMenuKeyDown(e) {
        var _this5 = this;

        // NOTE(narqo@): allow to move focus to another focusable using <Tab>
        // @see https://www.w3.org/TR/wai-aria-practices-1.1/#menu
        if (this.state.popupVisible && e.key === 'Tab') {
            this.setState({ popupVisible: false }, function () {
                return _this5.setState({ buttonFocused: true });
            });
        }
    };

    Select.prototype.onMenuChange = function onMenuChange(value) {
        this.props.onChange(value, this.props);
    };

    Select.prototype.onMenuFocusChange = function onMenuFocusChange(menuFocused) {
        this.setState({ menuFocused: menuFocused });
    };

    Select.prototype.onPopupLayout = function onPopupLayout(_ref2, popupProps) {
        var layout = _ref2.layout;
        var maxHeight = this.props.maxHeight;
        var viewportOffset = popupProps.viewportOffset;
        var _window = window,
            pageYOffset = _window.pageYOffset;


        if (layout.direction.indexOf('top-') > -1) {
            var newTop = maxHeight ? layout.bottom - maxHeight : layout.top;
            layout.top = Math.max(newTop, pageYOffset + viewportOffset);
        } else {
            var newBottom = maxHeight ? layout.top + maxHeight : layout.bottom;
            layout.bottom = Math.min(newBottom, pageYOffset + window.innerHeight - viewportOffset);
        }

        var menuHeight = layout.bottom - layout.top;
        this.setState({ menuHeight: menuHeight });
    };

    Select.prototype.onPopupRequestHide = function onPopupRequestHide(_, reason) {
        var _this6 = this;

        this.setState({ popupVisible: false }, function () {
            return reason === 'escapeKeyPress' && _this6.setState({ buttonFocused: true });
        });
    };

    return Select;
}(_Component3.default);

Select.contextTypes = {
    theme: _propTypes2.default.string
};

Select.defaultProps = {
    placeholder: '—',
    maxHeight: 0,
    onChange: function onChange() {}
};

exports.default = Select;
module.exports = exports['default'];
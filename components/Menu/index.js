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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEOUT_KEYBOARD_SEARCH = 1500;
var KEY_CODE_SPACE = 32;

function appendItemToCache(item, cache) {
    if (_Component3.default.is(item, _Item2.default)) {
        cache.push(item);
    }
}

var Menu = function (_Component) {
    (0, _inherits3.default)(Menu, _Component);

    function Menu(props) {
        (0, _classCallCheck3.default)(this, Menu);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = (0, _extends3.default)({}, _this.state, {
            value: _this._validateValue(_this.props.value),
            focused: _this.props.focused,
            focusedIndex: null,
            hoveredIndex: null
        });

        _this._cachedChildren = null;
        _this._shouldScrollToItem = false;
        _this._lastTyping = {
            char: '',
            text: '',
            index: 0,
            time: 0
        };

        _this.onMouseUp = _this.onMouseUp.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        _this.onItemClick = _this.onItemClick.bind(_this);
        _this.onItemHover = _this.onItemHover.bind(_this);
        return _this;
    }

    Menu.prototype.componentWillMount = function componentWillMount() {
        //  Если мы как-то поменяли value (внутри _validValue),
        //  то нужно сообщить про это наверх.
        if (this.props.value !== this.state.value) {
            this.props.onChange(this.state.value, this.props);
        }
    };

    Menu.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.state.focused) {
            this.componentWillGainFocus();
        }
        process.nextTick(function () {
            var selectedIdx = _this2._getFirstSelectedChildIndex();
            if (selectedIdx) {
                _this2.setState({ focusedIndex: selectedIdx }, function () {
                    return _this2._scrollToMenuItem();
                });
            }
        });
    };

    Menu.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var disabled = _ref.disabled,
            focused = _ref.focused,
            value = _ref.value;

        if (disabled === true) {
            this.setState({ focused: false });
        } else if (typeof focused !== 'undefined') {
            this.setState({ focused: focused });
        }
        if (this.props.value !== value) {
            this.setState({ value: this._validateValue(value) });
        }
    };

    Menu.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
            this._cachedChildren = null;
        }

        if (this.state.focused) {
            this.componentWillGainFocus();
        } else {
            this.componentWillLostFocus();
        }

        if (this._shouldScrollToItem) {
            this._shouldScrollToItem = false;
            this._scrollToMenuItem();
        }
    };

    Menu.prototype.componentWillUnmount = function componentWillUnmount() {
        this._cachedChildren = null;
    };

    Menu.prototype.componentWillGainFocus = function componentWillGainFocus() {
        if (this.refs.control) {
            this.refs.control.focus();
        }
    };

    Menu.prototype.componentWillLostFocus = function componentWillLostFocus() {
        if (this.refs.control && document.activeElement === this.refs.control) {
            this.refs.control.blur();
        }
    };

    Menu.prototype._getChildren = function _getChildren() {
        var _this3 = this;

        if (!this._cachedChildren) {
            this._cachedChildren = [];

            _react2.default.Children.forEach(this.props.children, function (child) {
                if (_Component3.default.is(child, _Group2.default)) {
                    _react2.default.Children.forEach(child.props.children, function (item) {
                        return appendItemToCache(item, _this3._cachedChildren);
                    });
                } else {
                    appendItemToCache(child, _this3._cachedChildren);
                }
            });
        }

        return this._cachedChildren;
    };

    Menu.prototype._getFirstEnabledChild = function _getFirstEnabledChild() {
        if (this.props.disabled) return null;

        var children = this._getChildren();

        for (var i = 0; i < children.length; i++) {
            var item = children[i];
            if (!item.props.disabled) {
                return item;
            }
        }

        return null;
    };

    Menu.prototype._getFirstSelectedChildIndex = function _getFirstSelectedChildIndex() {
        var value = this.state.value;

        var children = this._getChildren();

        for (var i = 0; i < children.length; i++) {
            var item = children[i];
            if (!item.props.disabled && value.indexOf(item.props.value) !== -1) {
                return i;
            }
        }

        return this._getFirstEnabledChildIndex();
    };

    Menu.prototype._getFirstEnabledChildIndex = function _getFirstEnabledChildIndex() {
        return this._getChildren().indexOf(this._getFirstEnabledChild());
    };

    Menu.prototype._validateValue = function _validateValue(value) {
        var newValue = void 0;

        if (value == null) {
            newValue = [];
        } else if (Array.isArray(value)) {
            newValue = value;
        } else {
            newValue = [value];
        }

        var filteredValue = this._getChildren().reduce(function (res, item) {
            var itemValue = item.props.value;

            if (newValue.indexOf(itemValue) !== -1) {
                res.push(itemValue);
            }

            return res;
        }, []);

        if (filteredValue.length !== newValue.length) {
            newValue = filteredValue;
        }

        if (this.props.mode === 'radio') {
            if (newValue.length === 0) {
                var firstChild = this._getFirstEnabledChild();

                newValue = firstChild === null ? [] : [firstChild.props.value];
            } else if (newValue.length > 1) {
                newValue = [newValue[0]];
            }
        } else if (this.props.mode === 'radio-check' && newValue.length > 1) {
            newValue = [newValue[0]];
        }

        //  Раз уж начал упарываться, то остановиться уже сложно.
        //  Теперь в newValue:
        //
        //    * Массив;
        //    * В котором значения из переданного value (массива или просто значения);
        //    * И которые при этом есть в values самого меню.
        //    * При этом, если в value был массив, в котором были только валидные значения,
        //      подходящие к данному mode, то вернется именно этот массив.
        //      Что позволит сравнить исходное value с вот этим новым.
        //
        //  Но, увы, это сравнение все равно даст неверный результат,
        //  если в value передать не массив или ничего не передать :(
        //  Но так уже заморачиваться не хочется. Проще эксепшен кинуть на невалидный value.
        //
        return newValue;
    };

    Menu.prototype._scrollToMenuItem = function _scrollToMenuItem() {
        if (this.refs.control && this.refs.focusedMenuItem) {
            var menuDOMNode = _reactDom2.default.findDOMNode(this.refs.control);
            var focusedItemDOMNode = _reactDom2.default.findDOMNode(this.refs.focusedMenuItem);
            var menuRect = menuDOMNode.getBoundingClientRect();
            var focusedItemRect = focusedItemDOMNode.getBoundingClientRect();

            if (focusedItemRect.top < menuRect.top) {
                menuDOMNode.scrollTop = focusedItemDOMNode.offsetTop - menuDOMNode.offsetTop;
            } else if (focusedItemRect.bottom > menuRect.bottom) {
                menuDOMNode.scrollTop = focusedItemDOMNode.offsetTop + focusedItemDOMNode.clientHeight - menuDOMNode.offsetTop - menuDOMNode.offsetHeight;
            }
        }
    };

    Menu.prototype.render = function render() {
        var _props = this.props,
            disabled = _props.disabled,
            focused = _props.focused,
            minHeight = _props.minHeight,
            maxHeight = _props.maxHeight,
            minWidth = _props.minWidth,
            maxWidth = _props.maxWidth;

        var tabIndex = disabled ? -1 : this.props.tabIndex;

        var props = {
            ref: 'control',
            className: this.className(),
            style: {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight
            },
            tabIndex: tabIndex
        };

        if (!disabled) {
            props = (0, _extends3.default)({}, props, {
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp
            });

            if (focused) {
                props.onKeyDown = this.onKeyDown;
                props.onKeyPress = this.onKeyPress;
            }
        }

        return _react2.default.createElement(
            'div',
            props,
            this._renderMenu()
        );
    };

    Menu.prototype._renderMenu = function _renderMenu() {
        var _this4 = this;

        var index = 0;

        return _react2.default.Children.map(this.props.children, function (child) {
            if (_Component3.default.is(child, _Item2.default)) {
                return _this4._renderMenuItem(child.props, index++);
            } else if (_Component3.default.is(child, _Group2.default)) {
                var groupedItems = _react2.default.Children.map(child.props.children, function (groupChild) {
                    return _this4._renderMenuItem(groupChild.props, index++);
                });

                return _this4._renderMenuGroup(child.props, groupedItems);
            } else {
                //  FIXME: Или тут бросать ошибку?
                return child;
            }
        });
    };

    Menu.prototype._renderMenuItem = function _renderMenuItem(props, index) {
        var _props2 = this.props,
            theme = _props2.theme,
            size = _props2.size,
            disabled = _props2.disabled,
            mode = _props2.mode;
        var _state = this.state,
            value = _state.value,
            hoveredIndex = _state.hoveredIndex,
            focusedIndex = _state.focusedIndex;

        var checkable = Boolean(mode);
        var hovered = index === hoveredIndex;
        var focused = index === focusedIndex;
        var key = 'menuitem' + (props.id || index);

        return _react2.default.createElement(_MenuItem2.default, (0, _extends3.default)({
            theme: theme,
            size: size,
            disabled: disabled,
            hovered: hovered,
            checked: checkable && value.indexOf(props.value) !== -1,
            ref: hovered || focused ? 'focusedMenuItem' : null,
            key: key,
            index: index
        }, props, {
            onClick: this.onItemClick,
            onHover: this.onItemHover
        }));
    };

    Menu.prototype._renderMenuGroup = function _renderMenuGroup(props, children) {
        var title = void 0;
        if (props.title) {
            title = _react2.default.createElement(
                'div',
                { className: 'menu__group-title' },
                props.title
            );
        }

        return _react2.default.createElement(
            'div',
            { className: 'menu__group' },
            title,
            children
        );
    };

    Menu.prototype.className = function className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'menu menu_js_inited';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' menu_theme_' + theme;
        }
        if (this.props.size) {
            className += ' menu_size_' + this.props.size;
        }
        if (this.props.mode) {
            className += ' menu_mode_' + this.props.mode;
        }
        if (this.props.disabled) {
            className += ' menu_disabled';
        }
        if (this.state.focused) {
            className += ' menu_focused';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    Menu.prototype.dispatchFocusChange = function dispatchFocusChange(focused) {
        this.props.onFocusChange(focused);
    };

    Menu.prototype.dispatchItemClick = function dispatchItemClick(e, itemProps) {
        var item = this._getChildren()[itemProps.index];
        if (typeof item.props.onClick === 'function') {
            item.props.onClick(e, item.props, this.props);
        }
        this.props.onItemClick(e, itemProps);
    };

    Menu.prototype.searchIndexByKeyboardEvent = function searchIndexByKeyboardEvent(e) {
        var timeNow = Date.now();
        var lastTyping = this._lastTyping;

        if (e.charCode <= KEY_CODE_SPACE || e.ctrlKey || e.altKey || e.metaKey) {
            lastTyping.time = timeNow;
            return null;
        }

        var char = String.fromCharCode(e.charCode).toLowerCase();
        var isSameChar = char === lastTyping.char && lastTyping.text.length === 1;
        var children = this._getChildren();

        if (timeNow - lastTyping.time > TIMEOUT_KEYBOARD_SEARCH || isSameChar) {
            lastTyping.text = char;
        } else {
            lastTyping.text += char;
        }

        lastTyping.char = char;
        lastTyping.time = timeNow;

        var nextIndex = lastTyping.index;

        // If key is pressed again, then continue to search to next menu item
        if (isSameChar && _Component3.default.textValue(children[nextIndex]).search(lastTyping.char) === 0) {
            nextIndex = nextIndex >= children.length - 1 ? 0 : nextIndex + 1;
        }

        // 2 passes: from index to children.length and from 0 to index.
        var i = nextIndex;
        var len = children.length;
        while (i < len) {
            if (this.isItemMatchText(children[i], lastTyping.text)) {
                lastTyping.index = i;
                return i;
            }

            i++;

            if (i === children.length) {
                i = 0;
                len = nextIndex;
            }
        }

        return null;
    };

    Menu.prototype.hoverNextItem = function hoverNextItem(dir) {
        var children = this._getChildren();
        var len = children.length;
        if (!len) {
            return;
        }

        var nextIndex = this.state.hoveredIndex;
        do {
            nextIndex = (nextIndex + len + dir) % len;
            if (nextIndex === this.state.hoveredIndex) {
                return;
            }
        } while (children[nextIndex].props.disabled);

        if (nextIndex !== null) {
            this.hoverItemByIndex(nextIndex);
        }
    };

    Menu.prototype.hoverItemByIndex = function hoverItemByIndex(index) {
        this._shouldScrollToItem = true;
        this.setState({ hoveredIndex: index });
    };

    Menu.prototype.isItemMatchText = function isItemMatchText(item, text) {
        return !item.props.disabled && _Component3.default.textValue(item).toLowerCase().search(text) === 0;
    };

    Menu.prototype.onItemHover = function onItemHover(hovered, itemProps) {
        this.setState({ hoveredIndex: hovered ? itemProps.index : null });
    };

    Menu.prototype.onItemClick = function onItemClick(e, itemProps) {
        var index = itemProps.index;

        this.dispatchItemClick(e, itemProps);
        this.onItemCheck(index);
    };

    Menu.prototype.onMouseDown = function onMouseDown() {
        this._mousePressed = true;
    };

    Menu.prototype.onMouseUp = function onMouseUp() {
        this._mousePressed = false;
    };

    Menu.prototype.onFocus = function onFocus() {
        var _this5 = this;

        if (!(this._mousePressed && this.state.hoveredIndex)) {
            this.setState({ hoveredIndex: this._getFirstSelectedChildIndex() });
        }
        this._shouldScrollToItem = true;
        this.setState({ focused: true }, function () {
            return _this5.dispatchFocusChange(true);
        });
    };

    Menu.prototype.onBlur = function onBlur() {
        var _this6 = this;

        this.setState({
            focused: false,
            hoveredIndex: null
        }, function () {
            return _this6.dispatchFocusChange(false);
        });
    };

    Menu.prototype.onKeyDown = function onKeyDown(e) {
        if (this.props.disabled) {
            return;
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            this.hoverNextItem(e.key === 'ArrowDown' ? 1 : -1);
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();

            if (this.state.hoveredIndex !== null) {
                this.onItemClick(e, { index: this.state.hoveredIndex });
            }
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(e, this.props);
        }
    };

    Menu.prototype.onKeyPress = function onKeyPress(e) {
        if (this.props.disabled) {
            return;
        }

        var hoveredIndex = this.searchIndexByKeyboardEvent(e);

        if (hoveredIndex !== null) {
            this.hoverItemByIndex(hoveredIndex);
        }
    };

    Menu.prototype.onItemCheck = function onItemCheck(index) {
        var mode = this.props.mode;

        if (!mode) {
            return;
        }

        var item = this._getChildren()[index];
        var itemValue = item.props.value;
        var menuValue = this.state.value;
        var checked = menuValue.indexOf(itemValue) !== -1;

        var newMenuValue = void 0;
        if (mode === 'radio') {
            if (checked) {
                return;
            }

            newMenuValue = [itemValue];
        } else if (mode === 'radio-check') {
            newMenuValue = checked ? [] : [itemValue];
        } else {
            newMenuValue = checked ? menuValue.filter(function (value) {
                return value !== itemValue;
            }) : menuValue.concat(itemValue);
        }

        if (newMenuValue) {
            this.setState({ value: newMenuValue });
            this.props.onChange(newMenuValue, this.props);
        }
    };

    return Menu;
}(_Component3.default);

Menu.contextTypes = {
    theme: _propTypes2.default.string
};

Menu.defaultProps = {
    maxHeight: null,
    tabIndex: 0,
    onChange: function onChange() {},
    onFocusChange: function onFocusChange() {},
    onItemClick: function onItemClick() {}
};

exports.default = Menu;
module.exports = exports['default'];
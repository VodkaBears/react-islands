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

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZINDEX_FACTOR = 1000;

var visibleLayersZIndexes = {};
var visibleLayersStack = [];

var KEY_ESCAPE = 27;

var REASON_CLICK_OUTSIDE = 'clickOutside';
var REASON_ESC_KEY_PRESS = 'escapeKeyPress';

var Overlay = function (_Component) {
    (0, _inherits3.default)(Overlay, _Component);

    function Overlay(props, context) {
        (0, _classCallCheck3.default)(this, Overlay);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

        _this.zIndex = null;
        _this.isClickOutsidePrevented = null;
        _this.isVisible = _this.isVisible.bind(_this);
        _this.preventClickOutside = _this.preventClickOutside.bind(_this);
        _this.onLayerClick = _this.onLayerClick.bind(_this);
        _this.onDocumentClick = _this.onDocumentClick.bind(_this);
        _this.onDocumentKeyPress = _this.onDocumentKeyPress.bind(_this);
        return _this;
    }

    Overlay.prototype.getChildContext = function getChildContext() {
        return {
            zIndexGroupLevel: this.context.zIndexGroupLevel || this.props.zIndexGroupLevel,
            isParentLayerVisible: this.isVisible,
            preventParentLayerClickOutside: this.preventClickOutside
        };
    };

    Overlay.prototype.componentDidMount = function componentDidMount() {
        if (this.props.visible) {
            this.layerBecomeVisible();
        }
    };

    Overlay.prototype.componentDidUpdate = function componentDidUpdate(_ref) {
        var visible = _ref.visible;

        this.handleParentLayerHide();
        // NOTE(narqo@): do this only when visible was changed
        if (this.props.visible !== visible) {
            if (this.props.visible) {
                this.layerBecomeVisible();
            } else {
                this.layerBecomeHidden();
            }
        }
    };

    Overlay.prototype.componentWillUnmount = function componentWillUnmount() {
        this.requestHide(null, false);
        this.layerBecomeHidden();
    };

    Overlay.prototype.layerBecomeVisible = function layerBecomeVisible() {
        var _this2 = this;

        visibleLayersStack.unshift(this);

        this.acquireZIndex();

        document.addEventListener('keydown', this.onDocumentKeyPress);
        // NOTE(narqo@): we have to use `nextTick` or nested layer will be closed immediately after being opened
        process.nextTick(function () {
            if (_this2.props.visible) {
                // FIXME(narqo@): `document.addEventListener(click)` doesn't work on iOS
                document.addEventListener('click', _this2.onDocumentClick);
            }
        });
    };

    Overlay.prototype.layerBecomeHidden = function layerBecomeHidden() {
        var idx = visibleLayersStack.indexOf(this);
        if (idx > -1) {
            visibleLayersStack.splice(idx, 1);
        }

        this.isClickOutsidePrevented = null;

        document.removeEventListener('keydown', this.onDocumentKeyPress);
        document.removeEventListener('click', this.onDocumentClick);

        this.releaseZIndex();
    };

    Overlay.prototype.render = function render() {
        var children = _react2.default.cloneElement(_react2.default.Children.only(this.props.children), { onClick: this.onLayerClick });

        return _react2.default.createElement(
            _Portal2.default,
            null,
            children
        );
    };

    Overlay.prototype.isVisible = function isVisible() {
        return this.props.visible;
    };

    Overlay.prototype.requestHide = function requestHide(e, reason) {
        if (this.props.visible) {
            this.props.onRequestHide(e, reason, this.props);
        }
    };

    Overlay.prototype.handleClickOutside = function handleClickOutside(e) {
        this.requestHide(e, REASON_CLICK_OUTSIDE);
    };

    Overlay.prototype.preventClickOutside = function preventClickOutside() {
        this.isClickOutsidePrevented = true;
    };

    Overlay.prototype.handleParentLayerHide = function handleParentLayerHide() {
        var isParentLayerVisible = this.context.isParentLayerVisible;

        if (this.props.visible && typeof isParentLayerVisible === 'function' && isParentLayerVisible() === false) {
            this.requestHide(null, false);
        }
    };

    Overlay.prototype.onLayerClick = function onLayerClick(e) {
        if (this.props.visible) {
            this.preventClickOutside();

            var preventParentLayerClickOutside = this.context.preventParentLayerClickOutside;

            if (typeof preventParentLayerClickOutside === 'function') {
                preventParentLayerClickOutside();
            }
        }
        this.props.onClick(e, this.props);
    };

    Overlay.prototype.onDocumentClick = function onDocumentClick(e) {
        if (this.isClickOutsidePrevented) {
            this.isClickOutsidePrevented = null;
        } else {
            this.handleClickOutside(e);
        }
    };

    Overlay.prototype.onDocumentKeyPress = function onDocumentKeyPress(e) {
        if (e.keyCode === KEY_ESCAPE && visibleLayersStack[0] === this) {
            // NOTE(narqo@): we call `preventDefault()` to prevent desktop Safari from exiting the full screen mode
            e.preventDefault();
            this.requestHide(e, REASON_ESC_KEY_PRESS);
        }
    };

    Overlay.prototype.acquireZIndex = function acquireZIndex() {
        var level = this.context.zIndexGroupLevel || this.props.zIndexGroupLevel;

        var zIndexes = visibleLayersZIndexes[level];
        if (!zIndexes) {
            zIndexes = [(level + 1) * ZINDEX_FACTOR];
            visibleLayersZIndexes[level] = zIndexes;
        }

        var prevZIndex = this.zIndex;
        this.zIndex = zIndexes[zIndexes.push(zIndexes[zIndexes.length - 1] + 1) - 1];
        if (this.zIndex !== prevZIndex) {
            this.props.onOrderChange(this.zIndex, this.props);
        }
    };

    Overlay.prototype.releaseZIndex = function releaseZIndex() {
        var level = this.context.zIndexGroupLevel || this.props.zIndexGroupLevel;
        var zIndexes = visibleLayersZIndexes[level];
        var idx = zIndexes.indexOf(this.zIndex);
        if (idx > -1) {
            zIndexes.splice(idx, 1);
        }
    };

    return Overlay;
}(_Component3.default);

Overlay.childContextTypes = Overlay.contextTypes = {
    zIndexGroupLevel: _propTypes2.default.number,
    isParentLayerVisible: _propTypes2.default.func,
    preventParentLayerClickOutside: _propTypes2.default.func
};

Overlay.propsTypes = {
    visible: _propTypes2.default.bool.isRequired,
    zIndexGroupLevel: _propTypes2.default.number,
    onClick: _propTypes2.default.func,
    onRequestHide: _propTypes2.default.func,
    onOrderChange: _propTypes2.default.func
};

Overlay.defaultProps = {
    visible: false,
    zIndexGroupLevel: 0,
    onClick: function onClick() {},
    onRequestHide: function onRequestHide() {},
    onOrderChange: function onOrderChange() {}
};

exports.default = Overlay;
module.exports = exports['default'];
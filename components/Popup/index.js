'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Component2 = require('../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME(narqo@): this is only valid for theme islands
var MAIN_OFFSET = 5;
var VIEWPORT_OFFSET = 10;
var VIEWPORT_ACCURACY_FACTOR = 0.99;
var DEFAULT_DIRECTIONS = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'left-top', 'left-center', 'left-bottom'];

var Popup = function (_Component) {
    (0, _inherits3.default)(Popup, _Component);

    function Popup(props) {
        (0, _classCallCheck3.default)(this, Popup);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            direction: undefined,
            left: undefined,
            top: undefined,
            zIndex: 0
        };

        _this.shouldRenderToOverlay = false;
        _this.scrollParents = null;

        _this.calcIsAnchorVisible = (0, _throttle2.default)(_this.calcIsAnchorVisible.bind(_this), 50);
        _this.onLayerOrderChange = _this.onLayerOrderChange.bind(_this);
        _this.onLayerRequestHide = _this.onLayerRequestHide.bind(_this);
        _this.onViewportResize = (0, _throttle2.default)(_this.onViewportResize.bind(_this), 100);
        _this.onAnchorParentsScroll = _this.onAnchorParentsScroll.bind(_this);
        return _this;
    }

    Popup.prototype.componentDidMount = function componentDidMount() {
        if (this.props.visible) {
            this.reposition();
            this.handleVisibleChange(this.props.visible);
        }
    };

    Popup.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.shouldRenderToOverlay && this.props.visible !== prevProps.visible) {
            this.reposition();
            this.handleVisibleChange(this.props.visible);
        }
    };

    Popup.prototype.componentWillUnmount = function componentWillUnmount() {
        this.handleVisibleChange(false);
    };

    Popup.prototype.render = function render() {
        if (this.props.visible || this.shouldRenderToOverlay) {
            this.shouldRenderToOverlay = true;

            var style = {
                left: this.state.left,
                top: this.state.top,
                zIndex: this.state.zIndex
            };

            return _react2.default.createElement(
                _Overlay2.default,
                {
                    visible: this.props.visible,
                    onRequestHide: this.onLayerRequestHide,
                    onOrderChange: this.onLayerOrderChange
                },
                _react2.default.createElement(
                    'div',
                    { ref: 'popup', className: this.className(), style: style },
                    this.props.children
                )
            );
        } else {
            return _react2.default.createElement(
                'div',
                { className: this.className() },
                this.props.children
            );
        }
    };

    Popup.prototype.className = function className() {
        var className = 'popup';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' popup_theme_' + theme;
        }
        if (this.props.size) {
            className += ' popup_size_' + this.props.size;
        }
        if (this.state.direction) {
            className += ' popup_direction_' + this.state.direction;
        }
        if (this.props.visible) {
            className += ' popup_visible';
        }
        if (this.shouldRenderToOverlay) {
            // FIXME(@narqo): `popup_js_inited` must be set for CSS of bem-components
            className += ' popup_js_inited';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    Popup.prototype.handleVisibleChange = function handleVisibleChange(visible) {
        var _this2 = this;

        if (!this.shouldRenderToOverlay) {
            return;
        }

        if (visible) {
            this.scrollParents = getScrollParents(this.getAnchor());
            this.scrollParents.forEach(function (parent) {
                parent.addEventListener('scroll', _this2.onAnchorParentsScroll);
            });
            window.addEventListener('resize', this.onViewportResize);
        } else if (this.scrollParents) {
            this.scrollParents.forEach(function (parent) {
                parent.removeEventListener('scroll', _this2.onAnchorParentsScroll);
            });
            window.removeEventListener('resize', this.onViewportResize);
        }
    };

    Popup.prototype.onLayerRequestHide = function onLayerRequestHide(e, reason) {
        if (this.props.visible) {
            this.props.onRequestHide(e, reason, this.props);
        }
    };

    Popup.prototype.onLayerOrderChange = function onLayerOrderChange(zIndex) {
        this.setState({ zIndex: zIndex });
    };

    Popup.prototype.onViewportResize = function onViewportResize() {
        this.reposition();
    };

    Popup.prototype.onAnchorParentsScroll = function onAnchorParentsScroll() {
        if (this.calcIsAnchorVisible()) {
            this.reposition();
        } else {
            this.onLayerRequestHide(null, 'anchorVisible');
        }
    };

    Popup.prototype.reposition = function reposition() {
        if (!this.props.visible) {
            return;
        }

        // TODO(@narqo): don't call DOMNode measurements in case nothing has changed
        var layout = this.calcBestLayoutParams();

        if (this.props.onLayout) {
            this.props.onLayout({ layout: layout }, this.props);
        }

        var direction = layout.direction,
            left = layout.left,
            top = layout.top;

        if (this.state.direction !== direction || this.state.left !== left || this.state.top !== top) {
            this.setState({ direction: direction, left: left, top: top });
        }
    };

    Popup.prototype.getPopup = function getPopup() {
        return _reactDom2.default.findDOMNode(this.refs.popup);
    };

    Popup.prototype.getAnchor = function getAnchor() {
        if (!this.props.anchor) {
            return null;
        }

        var anchor = void 0;
        if (typeof this.props.anchor === 'function') {
            anchor = this.props.anchor();
        } else {
            anchor = this.props.anchor;
        }

        if (anchor instanceof _Component3.default) {
            return _reactDom2.default.findDOMNode(anchor);
        } else {
            return anchor || null;
        }
    };

    Popup.prototype.calcBestLayoutParams = function calcBestLayoutParams() {
        var viewport = this.calcViewportDimensions();
        var popup = this.calcPopupDimensions();
        var anchor = this.calcAnchorDimensions();

        var i = 0,
            bestViewportFactor = 0,
            bestDirection = void 0,
            bestPos = void 0,
            direction = void 0;

        while (direction = this.props.directions[i++]) {
            // eslint-disable-line no-cond-assign
            var position = this.calcPopupPosition(direction, anchor, popup);
            var viewportFactor = this.calcViewportFactor(position, viewport, popup);

            if (i === 1 || viewportFactor > bestViewportFactor || !bestViewportFactor && this.state.direction === direction) {
                bestDirection = direction;
                bestViewportFactor = viewportFactor;
                bestPos = position;
            }
            if (bestViewportFactor > VIEWPORT_ACCURACY_FACTOR) break;
        }

        return (0, _extends3.default)({
            direction: bestDirection
        }, bestPos);
    };

    Popup.prototype.calcAnchorDimensions = function calcAnchorDimensions() {
        var anchor = this.getAnchor();
        var left = void 0,
            top = void 0,
            width = void 0,
            height = void 0;

        if (anchor instanceof Element) {
            var anchorRect = anchor.getBoundingClientRect();
            var viewportRect = document.documentElement.getBoundingClientRect();
            left = anchorRect.left - viewportRect.left;
            top = anchorRect.top - viewportRect.top;
            width = anchorRect.width;
            height = anchorRect.height;
        } else if (anchor === null) {
            left = top = height = width = 0;
        } else if ((typeof anchor === 'undefined' ? 'undefined' : (0, _typeof3.default)(anchor)) === 'object') {
            left = anchor.left;
            top = anchor.top;
            width = height = 0;
        }

        return {
            left: left,
            top: top,
            width: width,
            height: height
        };
    };

    Popup.prototype.calcViewportDimensions = function calcViewportDimensions() {
        var top = window.pageYOffset;
        var left = window.pageXOffset;
        var height = window.innerHeight;
        var width = window.innerWidth;

        return {
            top: top,
            left: left,
            bottom: top + height,
            right: left + width
        };
    };

    Popup.prototype.calcViewportFactor = function calcViewportFactor(pos, viewport, popup) {
        var viewportOffset = this.props.viewportOffset;

        var intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset);
        var intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset);
        var intersectionTop = Math.max(pos.top, viewport.top + viewportOffset);
        var intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);

        if (intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
            // has intersection
            return (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popup.area;
        } else {
            return 0;
        }
    };

    Popup.prototype.calcPopupDimensions = function calcPopupDimensions() {
        var popup = this.getPopup();
        var width = 0,
            height = 0;

        if (popup) {
            width = popup.offsetWidth;
            height = popup.offsetHeight;
        }

        return {
            width: width,
            height: height,
            area: width * height
        };
    };

    Popup.prototype.calcPopupPosition = function calcPopupPosition(direction, anchor, popup) {
        var _props = this.props,
            mainOffset = _props.mainOffset,
            secondaryOffset = _props.secondaryOffset;

        var top = void 0,
            left = void 0;

        if (checkMainDirection(direction, 'bottom')) {
            top = anchor.top + anchor.height + mainOffset;
        } else if (checkMainDirection(direction, 'top')) {
            top = anchor.top - popup.height - mainOffset;
        } else if (checkMainDirection(direction, 'left')) {
            left = anchor.left - popup.width - mainOffset;
        } else if (checkMainDirection(direction, 'right')) {
            left = anchor.left + anchor.width + mainOffset;
        }

        if (checkSecondaryDirection(direction, 'right')) {
            left = anchor.left + anchor.width - popup.width - secondaryOffset;
        } else if (checkSecondaryDirection(direction, 'left')) {
            left = anchor.left + secondaryOffset;
        } else if (checkSecondaryDirection(direction, 'bottom')) {
            top = anchor.top + anchor.height - popup.height - secondaryOffset;
        } else if (checkSecondaryDirection(direction, 'top')) {
            top = anchor.top + secondaryOffset;
        } else if (checkSecondaryDirection(direction, 'center')) {
            if (checkMainDirection(direction, 'top', 'bottom')) {
                left = anchor.left + anchor.width / 2 - popup.width / 2;
            } else if (checkMainDirection(direction, 'left', 'right')) {
                top = anchor.top + anchor.height / 2 - popup.height / 2;
            }
        }

        var bottom = top + popup.height;
        var right = left + popup.width;

        return { top: top, left: left, bottom: bottom, right: right };
    };

    Popup.prototype.calcIsAnchorVisible = function calcIsAnchorVisible() {
        var anchor = this.calcAnchorDimensions();
        var direction = this.state.direction;

        var vertBorder = Math.floor(checkMainDirection(direction, 'top') || checkSecondaryDirection(direction, 'top') ? anchor.top : anchor.top + anchor.height);
        var horizBorder = Math.floor(checkMainDirection(direction, 'left') || checkSecondaryDirection(direction, 'left') ? anchor.left : anchor.left + anchor.width);

        return !this.scrollParents.some(function (parent) {
            if (parent === window) {
                return false;
            }

            var _window$getComputedSt = window.getComputedStyle(parent),
                overflowX = _window$getComputedSt.overflowX,
                overflowY = _window$getComputedSt.overflowY;

            var checkOverflowY = overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'auto';
            var checkOverflowX = overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'auto';

            if (checkOverflowY || checkOverflowX) {
                var parentRect = parent.getBoundingClientRect();
                var viewportRect = document.documentElement.getBoundingClientRect();
                var left = Math.floor(parentRect.left - viewportRect.left);
                var top = Math.floor(parentRect.top - viewportRect.top);
                var width = parentRect.width,
                    height = parentRect.height;


                if (checkOverflowY) {
                    return vertBorder < top || top + height < vertBorder;
                }

                if (checkOverflowX) {
                    return horizBorder < left || left + width < horizBorder;
                }
            }

            return false;
        });
    };

    return Popup;
}(_Component3.default);

function checkMainDirection(direction, mainDirection1, mainDirection2) {
    return !direction.indexOf(mainDirection1) || mainDirection2 && !direction.indexOf(mainDirection2);
}

function checkSecondaryDirection(direction, secondaryDirection) {
    return ~direction.indexOf('-' + secondaryDirection);
}

function getScrollParents(el) {
    if (!(el instanceof Element)) {
        return [window];
    }

    var _ref = window.getComputedStyle(el) || {},
        position = _ref.position;

    var parents = [];

    if (position === 'fixed') {
        return [el];
    }

    var parent = el;
    while ((parent = parent.parentNode) && parent.nodeType === 1) {
        var style = window.getComputedStyle(parent);

        if (typeof style === 'undefined' || style === null) {
            parents.push(parent);
            return parents;
        }

        if (/(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
            if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
                parents.push(parent);
            }
        }
    }

    parents.push(window);

    return parents;
}

Popup.propsTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.string,
    visible: _propTypes2.default.bool.isRequired,
    anchor: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.shape({ left: _propTypes2.default.number, top: _propTypes2.default.number }), _propTypes2.default.func]),
    directions: _propTypes2.default.oneOf(DEFAULT_DIRECTIONS),
    mainOffset: _propTypes2.default.number,
    secondaryOffset: _propTypes2.default.number,
    onRequestHide: _propTypes2.default.func,
    onLayout: _propTypes2.default.func
};

Popup.defaultProps = {
    directions: DEFAULT_DIRECTIONS,
    visible: false,
    mainOffset: MAIN_OFFSET,
    secondaryOffset: 0,
    viewportOffset: VIEWPORT_OFFSET,
    onRequestHide: function onRequestHide() {}
};

Popup.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = Popup;
module.exports = exports['default'];
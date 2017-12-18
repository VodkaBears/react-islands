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

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_Component) {
    (0, _inherits3.default)(Modal, _Component);

    function Modal(props) {
        (0, _classCallCheck3.default)(this, Modal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            zIndex: 0
        };
        _this.shouldRenderToOverlay = false;
        _this.onLayerClick = _this.onLayerClick.bind(_this);
        _this.onLayerOrderChange = _this.onLayerOrderChange.bind(_this);
        _this.onLayerRequestHide = _this.onLayerRequestHide.bind(_this);
        return _this;
    }

    Modal.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (!this.shouldRenderToOverlay && nextProps.visible) {
            this.shouldRenderToOverlay = true;
        }
    };

    Modal.prototype.render = function render() {
        var visible = this.props.visible;

        var style = visible ? { zIndex: this.state.zIndex } : null;

        var children = _react2.default.createElement(
            'div',
            { className: this.className(), role: 'dialog', 'aria-hidden': !visible, style: style },
            _react2.default.createElement(
                'div',
                { className: 'modal__table' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal__cell' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal__content', ref: 'content' },
                        this.props.children
                    )
                )
            )
        );

        if (this.shouldRenderToOverlay) {
            return _react2.default.createElement(
                _Overlay2.default,
                {
                    visible: visible,
                    zIndexGroupLevel: this.props.zIndexGroupLevel,
                    onClick: this.onLayerClick,
                    onRequestHide: this.onLayerRequestHide,
                    onOrderChange: this.onLayerOrderChange
                },
                children
            );
        } else {
            return children;
        }
    };

    Modal.prototype.className = function className() {
        var className = 'popup modal';

        var theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' modal_theme_' + theme;
        }
        if (this.props.size) {
            className += ' modal_size_' + this.props.size;
        }
        if (this.props.visible) {
            className += ' modal_visible';
        }
        if (this.shouldRenderToOverlay) {
            className += ' modal_js_inited modal_has-animation';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    };

    Modal.prototype.requestHide = function requestHide(e, reason) {
        this.props.onRequestHide(e, reason, this.props);
    };

    Modal.prototype.onLayerClick = function onLayerClick(e) {
        if (!this.refs.content.contains(e.target)) {
            this.requestHide(e, 'clickOutside');
        }
    };

    Modal.prototype.onLayerOrderChange = function onLayerOrderChange(zIndex) {
        this.setState({ zIndex: zIndex });
    };

    Modal.prototype.onLayerRequestHide = function onLayerRequestHide(e, reason) {
        if (reason === 'escapeKeyPress') {
            this.requestHide(e, reason);
        }
    };

    return Modal;
}(_Component3.default);

Modal.propsTypes = {
    theme: _propTypes2.default.string,
    size: _propTypes2.default.string,
    visible: _propTypes2.default.bool.isRequired,
    onRequestHide: _propTypes2.default.func
};

Modal.defaultProps = {
    visible: false,
    zIndexGroupLevel: 20,
    onRequestHide: function onRequestHide() {}
};

Modal.contextTypes = {
    theme: _propTypes2.default.string
};

exports.default = Modal;
module.exports = exports['default'];
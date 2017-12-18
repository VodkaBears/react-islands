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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Portal = function (_React$Component) {
    (0, _inherits3.default)(Portal, _React$Component);

    function Portal(props) {
        (0, _classCallCheck3.default)(this, Portal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.portalNode = null;
        return _this;
    }

    Portal.prototype.componentDidMount = function componentDidMount() {
        this.renderPortal();
    };

    Portal.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderPortal();
    };

    Portal.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unmountPortal();
    };

    Portal.prototype.render = function render() {
        return null;
    };

    Portal.prototype.renderPortal = function renderPortal() {
        var child = _react2.default.Children.only(this.props.children);
        if (child) {
            this.mountPortal();
            // NOTE: `ReactDOM.unstable_renderSubtreeIntoContainer` to store intermediate contexts
            _reactDom2.default.unstable_renderSubtreeIntoContainer(this, child, this.portalNode);
        } else {
            this.unmountPortal();
        }
    };

    Portal.prototype.mountPortal = function mountPortal() {
        if (!this.portalNode) {
            this.portalNode = document.createElement('div');
            this.getPortalRootNode().appendChild(this.portalNode);
        }
    };

    Portal.prototype.unmountPortal = function unmountPortal() {
        if (this.portalNode) {
            _reactDom2.default.unmountComponentAtNode(this.portalNode);
            this.getPortalRootNode().removeChild(this.portalNode);
            this.portalNode = null;
        }
    };

    Portal.prototype.getPortalRootNode = function getPortalRootNode() {
        return document.body;
    };

    return Portal;
}(_react2.default.Component);

exports.default = Portal;
module.exports = exports['default'];
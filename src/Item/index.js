import PropTypes from 'prop-types';
import Component from '../Component';

class Item extends Component {}

Item.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.any,
    checkedText: PropTypes.any,
    onClick: PropTypes.func,
};

export default Item;

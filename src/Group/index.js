import PropTypes from 'prop-types';
import Component from '../Component';

class Group extends Component {}

Group.propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.any,
};

export default Group;

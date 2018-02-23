import { connect } from 'react-redux';
import AddNew from '../components/AddNew/AddNew.jsx';
import * as act from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onAddNew: (type, name, color) =>
    dispatch({ type: act.ADD_NEW, payload: { type, name, color } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);

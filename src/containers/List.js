import { connect } from 'react-redux';
import List from '../components/List/List.jsx';
import * as act from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  save: (type, name, id) =>
    dispatch({ type: act.SAVE, payload: { type, name, id } }),
  remove: (type, id) =>
    dispatch({ type: act.REMOVE_RACE, payload: { type, id } }),
  onSetCurrentProject: data =>
    dispatch({ type: act.SET_CURRENT_PROJECT, payload: { data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

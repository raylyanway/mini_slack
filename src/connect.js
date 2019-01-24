import { connect } from 'react-redux';
import * as actions from './actions';

export default mapStateToProps => connect(mapStateToProps, actions);

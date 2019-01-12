import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

export default connect(
  mapStateToProps,
  actionCreators,
);

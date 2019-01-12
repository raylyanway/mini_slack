import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { messagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

export default connect(
  mapStateToProps,
  actionCreators,
);

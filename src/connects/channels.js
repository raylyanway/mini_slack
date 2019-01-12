import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ channels }) => {
  const props = {
    channels,
  };
  return props;
};

export default connect(
  mapStateToProps,
  actionCreators,
);

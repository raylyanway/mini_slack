import { connect } from 'react-redux';
import Component from '../components/ChannelsBlock';
// import * as actionCreators from '../actions';

const mapStateToProps = ({ channels }) => {
  const props = {
    channels,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  // actionCreators,
)(Component);

export default Container;

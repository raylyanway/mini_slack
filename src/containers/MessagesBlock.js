import { connect } from 'react-redux';
import Component from '../components/MessagesBlock';
// import * as actionCreators from '../actions';

const mapStateToProps = ({ messages }) => {
  const props = {
    messages,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  // actionCreators,
)(Component);

export default Container;

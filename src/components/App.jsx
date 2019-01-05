import React from 'react';
import ChannelsBlock from '../containers/ChannelsBlock';
import MessagesBlock from '../containers/MessagesBlock';

const App = () => (
  <div className="row">
    <div className="col-4">
      <ChannelsBlock />
    </div>
    <div className="col-8">
      <MessagesBlock />
    </div>
  </div>
);

export default App;

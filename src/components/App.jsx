import React from 'react';
import ChannelsBlock from './ChannelsBlock';
import MessagesBlock from './MessagesBlock';

const App = () => (
  <div className="row m-0 min-vh-50">
    <div className="col-4 p-0 bg-dark rounded-left">
      <ChannelsBlock />
    </div>
    <div className="col-8 p-0 bg-light rounded-right">
      <MessagesBlock />
    </div>
  </div>
);

export default App;

import getApp from '..';

const port = process.env.PORT || 4000;
/* eslint-disable no-console */
getApp().listen(port, () => console.log(`port: ${port}`));

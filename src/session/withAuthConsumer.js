import React from 'react';
import AuthContext from './context';

export const withAuthConsumer = Component => props => (
    <AuthContext.Consumer>
      {authState => <Component {...props} authState={authState} />}
    </AuthContext.Consumer>
);
  
export default withAuthConsumer;
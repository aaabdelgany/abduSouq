import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ message }) => {
  if (message === 'loginError') {
    return <Alert variant={'danger'}>Invalid Creds!</Alert>;
  }
  return <></>;
};

export default Message;

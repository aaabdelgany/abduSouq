import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ message }) => {
  if (message === 'loginError') {
    return <Alert variant={'danger'}>Invalid Creds!</Alert>;
  } else if (message === 'successfulAdd') {
    return <Alert variant={'success'}>Your product has been added!</Alert>;
  }
  return <></>;
};

export default Message;

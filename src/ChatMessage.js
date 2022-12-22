import PropTypes from 'prop-types'; // ES6
import React from 'react';

const ChatMessage = ({ name, message }) => {
  return (
    <p>
      <strong>{name ? name : 'anonymous'}</strong> <em>{message}</em>
    </p>
  );
};
ChatMessage.defaultProps = {
  name: 'anonymous',
};
ChatMessage.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
};
export default ChatMessage;

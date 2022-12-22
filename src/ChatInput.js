import PropTypes from 'prop-types'; // ES6
import React, { useState } from 'react';

const ChatInput = (props) => {
  const [message, setMassage] = useState('');
  return (
    <div>
      <form
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmitMessage(message);
          setMassage('');
        }}
      >
        <input
          type="text"
          placeholder={'Enter message...'}
          value={message}
          onChange={(e) => setMassage(e.target.value)}
        />
        <input type="submit" value={'Send'} />
      </form>
    </div>
  );
};
ChatInput.propTypes = {
  onSubmitMessage: PropTypes.func,
};
export default ChatInput;

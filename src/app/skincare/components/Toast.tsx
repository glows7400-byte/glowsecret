'use client';
import React from 'react';

interface Props {
  message: string;
  visible: boolean;
}

const Toast: React.FC<Props> = ({ message, visible }) => {
  return (
    <div
      className={`toast font-cairo ${visible ? 'show' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default Toast;
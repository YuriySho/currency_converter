import React from 'react';

type ToastProps = {
  message: string;
};

export default ({ message }: ToastProps) => (
  <div
    className="toast position-absolute mt-4"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-autohide="true"
    data-delay="5000"
  >
    <div className="toast-header">
      <span className="rounded mr-2 bg-warning border border-warning toast-warning" />
      <strong className="mr-auto">Error</strong>
      <button
        type="button"
        className="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">{message}</div>
  </div>
);

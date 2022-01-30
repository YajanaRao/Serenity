import * as React from 'react';

export interface SpinnerProps {
  size?: 'small' | 'large'
}

export function Spinner({ size = 'small' }: SpinnerProps) {
  return (
    <div className="spinner-grow text-dark" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  );
}

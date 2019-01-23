import React from 'react';
import './LoadingSpinner.scss';

// https://loading.io/css/
export default function LoadingSpinner({ spinning }) {
  return spinning ? <div className="lds-dual-ring" /> : null;
}

import React, { useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

type ToastTypes = 'normal' | 'error' | 'success';

const ToastContext = createContext(
  ({}: { text: string; type?: ToastTypes }) => {}
);
ToastContext.displayName = 'ToastContext';

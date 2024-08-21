"use client";

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement
  );
}

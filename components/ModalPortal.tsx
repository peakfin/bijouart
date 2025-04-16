'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('modal-root');
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
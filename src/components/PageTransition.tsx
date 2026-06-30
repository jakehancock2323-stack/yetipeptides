import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Re-mounts children on every route change so the `animate-page-in`
 * keyframes (defined in tailwind.config.ts / index.css) replay.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-in">
      {children}
    </div>
  );
}

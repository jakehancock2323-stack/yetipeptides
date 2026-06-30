import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionState('exit');
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState('enter');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [children, location.pathname]);

  return (
    <div
      className={`transition-all duration-200 ${
        transitionState === 'enter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      }`}
    >
      {displayChildren}
    </div>
  );
}

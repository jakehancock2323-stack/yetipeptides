// Region system kept as a no-op shim — the site now ships UK Domestic only.
// The provider exists so any lingering useRegion() callers continue to compile.
import { createContext, useContext, ReactNode } from 'react';

export type Region = 'UK Domestic';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType>({
  region: 'UK Domestic',
  setRegion: () => {},
});

export function RegionProvider({ children }: { children: ReactNode }) {
  return (
    <RegionContext.Provider value={{ region: 'UK Domestic', setRegion: () => {} }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}

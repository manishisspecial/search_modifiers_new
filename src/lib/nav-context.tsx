"use client";

import { createContext, useContext } from "react";

export type NavItem = { label: string; href: string };

type NavData = {
  mainNav: NavItem[];
  servicesNav: NavItem[];
  locationsNav: NavItem[];
};

const NavContext = createContext<NavData | null>(null);

export function NavProvider({ value, children }: { value: NavData; children: React.ReactNode }) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavData {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}

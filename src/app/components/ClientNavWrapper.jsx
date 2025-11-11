"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import RestaurantNav from "./RestaurantNav";

const ClientNavWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Only access pathname after mount to prevent hydration mismatch
    // Use window.location instead of usePathname() to avoid SSR issues
    // useEffect only runs on client, so window is always available
    setPathname(window.location.pathname);
  }, []);

  // During SSR and initial client render, always show Navbar to prevent hydration mismatch
  // After hydration, switch to the correct nav based on pathname
  // This ensures server and client render the same initial HTML
  if (!mounted) {
    return <Navbar />;
  }

  // Only check pathname after mount to prevent hydration mismatch
  if (pathname?.startsWith("/restaurants")) {
    return <RestaurantNav />;
  }

  return <Navbar />;
};

export default ClientNavWrapper;

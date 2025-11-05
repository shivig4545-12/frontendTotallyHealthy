"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import RestaurantNav from "./RestaurantNav";

const ClientNavWrapper = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, always show Navbar to prevent hydration mismatch
  // After hydration, switch to the correct nav based on pathname
  if (!mounted) {
    return <Navbar />;
  }

  if (pathname?.startsWith("/restaurants")) {
    return <RestaurantNav />;
  }

  return <Navbar />;
};

export default ClientNavWrapper;

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItems } from "prisma/data";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";

import { type NavItemType } from "./types";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState<NavItemType>("home");

  useEffect(() => {
    if (pathname) {
      setSelectedTab(
        pathname === "/"
          ? "home"
          : pathname.slice(1, 6) === "blogs"
          ? "blogs"
          : (pathname.slice(1) as NavItemType)
      );
    }
  }, [pathname]);
  return (
    <nav className="left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="flex w-full flex-row items-center justify-between gap-4 px-8 py-4 lg:flex-wrap">
        <Link href="/" className="flex items-center">
          <Image
            width={112}
            height={48}
            src="/icon.png"
            className="h-12 w-28 rounded-md bg-slate-200"
            alt="Prodigitips Logo"
          />
        </Link>
        <div className="flex md:order-2">
          <Link href="/contactus" className="mr-4">
            <Button>GET STARTED</Button>
          </Link>
          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute right-4 top-14 z-20 items-center justify-between md:relative md:right-auto md:top-auto md:order-1 md:flex md:w-auto ${
            isOpen ? "" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul
            className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium 
            dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 
            md:bg-white md:p-0 md:dark:bg-gray-900"
          >
            {NavItems.map((item) => (
              <li key={item}>
                <Link
                  onClick={() => {
                    setSelectedTab(item as NavItemType);
                    setIsOpen(!isOpen);
                  }}
                  href={
                    item === "home"
                      ? "/"
                      : `/${item.replace(/\s/g, "").toLowerCase()}`
                  }
                  className={`block rounded py-2 pl-3 pr-4 text-gray-900 ${
                    item === selectedTab ? "underline" : ""
                  } hover:bg-gray-100 dark:border-gray-700 
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent 
                  md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
                  aria-current="page"
                >
                  {item.split("-").join(" ").toLocaleUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

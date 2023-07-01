
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type NavItemType } from "./types";
import { NavItems } from "prisma/data";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<NavItemType>("Home");
  const [theme, setTheme] = useState("");
  // for dark mode
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      theme === "dark"
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // toggle theme
  function toggleTheme() {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <nav className="left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="flex w-full flex-row items-center justify-between gap-4 px-8 py-4 lg:flex-wrap">
        <Link href="/" className="flex items-center">
          <Image
            width={192}
            height={48}
            src="/icon.png"
            className="h-12 w-48 rounded-md bg-slate-200"
            alt="Prodigitips Logo"
          />
        </Link>
        <div className="flex md:order-2">
          <Link href="/contactus">
            <button
              type="button"
              className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
            >
              GET STARTED
            </button>
          </Link>
          <svg
            onClick={() => toggleTheme()}
            xmlns="http://www.w3.org/2000/svg"
            className="mx-2 h-8 w-8 cursor-pointer place-self-center fill-black dark:fill-white"
            viewBox="0 0 256 256"
          >
            <g strokeMiterlimit="10" strokeWidth="0">
              <path
                fillRule="evenodd"
                d="M45 68c-12.682 0-23-10.317-23-23 0-12.682 10.318-23 23-23 12.683 0 23 10.318 23 23 0 12.683-10.317 23-23 23zM38.652 17.61a1 1 0 01-.926-1.377L44.074.623a1 1 0 011.852 0l6.349 15.61a1 1 0 01-1.14 1.354 28.816 28.816 0 00-12.271 0 .95.95 0 01-.212.023zM45 90a.999.999 0 01-.926-.623l-6.348-15.61a1 1 0 011.139-1.354c4.043.882 8.226.882 12.271 0a.999.999 0 011.14 1.354l-6.349 15.61c-.154.377-.52.623-.927.623zM16.61 52.349c-.127 0-.255-.024-.377-.073L.623 45.927a1 1 0 01.001-1.853l15.61-6.348a1 1 0 011.354 1.139A28.837 28.837 0 0016.923 45c0 2.049.224 4.113.665 6.136a1 1 0 01-.978 1.213zM73.39 52.349a.999.999 0 01-.977-1.213c.44-2.022.664-4.087.664-6.136a28.9 28.9 0 00-.664-6.135 1 1 0 011.354-1.139l15.61 6.348a.999.999 0 010 1.852l-15.61 6.349c-.122.049-.25.074-.377.074zM20.437 30.415a1.001 1.001 0 01-.921-.611l-6.549-15.527a1.002 1.002 0 01.214-1.096 1.002 1.002 0 011.096-.214l15.527 6.549a.997.997 0 01.151 1.762 28.896 28.896 0 00-4.809 3.868 28.845 28.845 0 00-3.868 4.809 1 1 0 01-.841.46zM76.112 77.112a1 1 0 01-.389-.078l-15.526-6.549a1 1 0 01-.151-1.764 28.897 28.897 0 004.808-3.868 28.856 28.856 0 003.868-4.808 1.002 1.002 0 011.764.151l6.549 15.526a1.002 1.002 0 01-.923 1.39zM69.563 30.414c-.339 0-.656-.171-.842-.459a28.904 28.904 0 00-3.868-4.809 28.857 28.857 0 00-4.808-3.868.998.998 0 01.151-1.762l15.526-6.549a1 1 0 011.311 1.31l-6.549 15.527a1 1 0 01-.921.61zM13.887 77.112a1 1 0 01-.921-1.389l6.549-15.526a.997.997 0 01.835-.607.978.978 0 01.927.456 28.94 28.94 0 003.868 4.808 28.854 28.854 0 004.809 3.868 1.002 1.002 0 01-.151 1.764l-15.527 6.549a1.014 1.014 0 01-.389.077z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
            </g>
          </svg>

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
                    item === "Home"
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
                  {item}
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

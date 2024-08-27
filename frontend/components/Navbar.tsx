import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full h-16 text-secondary items-center text-2xl font-semibold justify-between px-24">
        <a href="/">RSS TO VIDEO</a>
        <ul className="flex space-x-10 font-normal text-xl">
          <li>
            <a href="/about">A Propos</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

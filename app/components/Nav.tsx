"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import SearchInput from "./SearchInput"

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const pathname = usePathname()

  const links = [
    {href: '/', label: 'Markets'},
    {href: '/exchanges', label: 'Exchanges'},
    {href: '/about', label: 'About'},
  ]

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-lg font-bold">Crypto Tracker</p>
      
      {/* Desktop: Centered input */}
      <SearchInput isSearchOpen={isSearchOpen}/>
      
      {/* Desktop Links */}
      <div className="hidden lg:flex [&>*]:p-2 [&>*]:cursor-pointer">
        {links.map((link, i) => (
          <Link 
            key={i} 
            href={link.href} 
            className={`${pathname === link.href && 'underline'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Icons */}
      <div className="flex lg:hidden items-center space-x-3">
        <Search
          className="cursor-pointer"
          size={24}
          onClick={() => setIsSearchOpen(true)}
        />
        <Menu
          className="cursor-pointer"
          size={28}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden">
          <div className="inset-0 fixed top-0 bg-black/50 z-20" onClick={() => setIsSearchOpen(false)}></div>
          <div className="fixed top-0 left-0 right-0 bg-background z-30 p-4">
            <div className="flex items-center space-x-3">
              <SearchInput isSearchOpen={isSearchOpen}/>
              <X
                size={24}
                className="cursor-pointer"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidenav */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="inset-0 fixed top-0 backdrop-blur z-20" onClick={() => setIsOpen(false)}></div>
          <div className="flex flex-col bg-background h-full w-2/3 fixed top-0 right-0 z-30 text-right pr-5 pt-2">
            <X size={32} className="ml-auto cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
            
            <div className="flex flex-col justify-center flex-1 text-2xl space-y-5">
              {links.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.href} 
                  className={`${pathname === link.href && 'underline'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
"use client";

const Search = ({ isSearchOpen }: { isSearchOpen: boolean }) => {
  return (
    <>
      {!isSearchOpen ? (
        <input
          type="text"
          className="hidden lg:block max-w-80 w-full bg-input px-3 py-2 rounded-md absolute left-1/2 transform -translate-x-1/2"
          placeholder="Search Crypto"
        />
      ) : (
        <input
          type="text"
          className="flex-1 bg-input px-3 py-2 rounded-md"
          placeholder="Search Crypto"
          autoFocus
        />
      )}
    </>
  );
};

export default Search;

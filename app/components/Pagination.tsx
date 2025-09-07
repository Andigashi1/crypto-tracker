"use client";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage }: { currentPage: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = 140;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (currentPage > 3) {
      pages.push(1, "...");
    }

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...", totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="text-center py-4">
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <a
            key={i}
            href={`?page=${p}`}
            className={`px-2 py-1 rounded-full ${
              p === currentPage && "bg-foreground text-background"
            }`}
          >
            {p}
          </a>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </div>
  );
};

export default Pagination;

import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
function Navbar() {
  const location = useLocation();
  const isAcitive = (path) => location.pathname === path;
  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticly top-0 z-50 shadow-lg">
      <div className="navbar max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/*LOGO*/}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transiton-transform"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:from-primary/80 group-hover:via-secondary/80 group-hover:to-accent/80 transition-colors">
            <SparklesIcon className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono traking-wider">
              Talent IQ
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {/*ProblemsPageLink*/}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isAcitive("/problems") ? "bg-primary text-primary-content" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>
          {/*DashboardPageLink*/}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isAcitive("/dashboard") ? "bg-primary text-primary-content" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>
          <div className="ml-4 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

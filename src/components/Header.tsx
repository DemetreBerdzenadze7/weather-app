import UnitsDropdown from "./UnitsDropdown";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <img src="/images/logo.svg" alt="Weather Now" className="h-7 md:h-10" />
      <UnitsDropdown />
    </header>
  );
}

export default Header;

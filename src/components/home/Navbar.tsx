import { Logo, Menu, User } from "../icons";

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between gap-4 p-4 md:p-8 -mb-[56px] md:-mb-[88px] w-full max-w-full">
      <button>
        <Menu className="size-6 text-primary" />
      </button>
      <a href="#">
        <Logo className="h-3 w-auto md:h-6 text-primary" />
      </a>
      <button>
        <User className="size-6 text-primary" />
      </button>
    </nav>
  );
}

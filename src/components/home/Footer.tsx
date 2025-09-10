import { Logo } from "../icons";

export default function Footer() {
  return (
    <footer className="w-full space-y-4">
      <div className="w-full px-4 flex flex-col">
        <a
          href="https://samuelkime.netlify.app"
          target="_blank"
          className="text-center text-xs capitalize ml-auto"
        >
          Built by Wahala Dev
        </a>
        <Logo className="w-full h-auto" />
      </div>
    </footer>
  );
}

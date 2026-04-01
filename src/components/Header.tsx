import { Braces, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const tools = [
  { path: "/", label: "JSON" },
  { path: "/jwt-decoder", label: "JWT" },
  { path: "/cron-generator", label: "Cron" },
  { path: "/qr-code", label: "QR Code" },
  { path: "/word-counter", label: "Word Counter" },
  { path: "/image-compressor", label: "Image" },
  { path: "/hash-generator", label: "Hash" },
  { path: "/uuid-generator", label: "UUID" },
];

const Header = () => {
  const [dark, setDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Braces className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-card-foreground">
            Dev<span className="text-primary">Tools</span>
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-1">
          {tools.map((t) => (
            <Link
              key={t.path}
              to={t.path}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                location.pathname === t.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
};

export default Header;

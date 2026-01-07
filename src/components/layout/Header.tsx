import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import gahsLogo from "@/assets/gahs-logo.jpeg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Institutions", href: "/institutions" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+233000000000" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>+233 (0) 00 000 0000</span>
            </a>
            <a href="mailto:info@gahs.org.gh" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>info@gahs.org.gh</span>
            </a>
          </div>
          <p className="text-primary-foreground/80 text-xs">
            Compassionate Healthcare Rooted in Faith
          </p>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={gahsLogo} alt="GAHS Logo" className="h-14 w-auto" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">Ghana Adventist</p>
              <p className="text-sm font-semibold text-primary leading-tight">Health Services</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link px-4 py-2 rounded-lg ${
                  location.pathname === item.href
                    ? "text-primary bg-primary-light"
                    : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Find a Facility
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-primary bg-primary-light"
                      : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Find a Facility
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

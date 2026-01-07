import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import gahsLogo from "@/assets/gahs-logo.jpeg";

const footerLinks = {
  quickLinks: [
    { name: "About GAHS", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Institutions", href: "/institutions" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact Us", href: "/contact" },
  ],
  institutions: [
    { name: "Hospitals", href: "/institutions?type=hospitals" },
    { name: "Clinics", href: "/institutions?type=clinics" },
    { name: "Polyclinics", href: "/institutions?type=polyclinics" },
    { name: "Training Institutions", href: "/institutions?type=training" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={gahsLogo} alt="GAHS Logo" className="h-16 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Ghana Adventist Health Services (GAHS) is the umbrella organization for all Seventh-day Adventist health institutions in Ghana.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Institutions</h4>
            <ul className="space-y-3">
              {footerLinks.institutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>GAHS Secretariat, Kumasi, Ghana</span>
              </li>
              <li>
                <a href="tel:+233000000000" className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>+233 (0) 00 000 0000</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@gahs.org.gh" className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>info@gahs.org.gh</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Ghana Adventist Health Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-background/60 hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

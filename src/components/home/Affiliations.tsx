import { ExternalLink } from "lucide-react";

const affiliations = [
  {
    name: "Christian Health Association of Ghana (CHAG)",
    description: "GAHS is a proud member of CHAG, coordinating with the Ghana Ministry of Health.",
    url: "https://www.chag.org.gh",
  },
  {
    name: "Seventh-day Adventist Church",
    description: "Our health ministry is an integral part of the SDA Church's global mission.",
    url: "https://www.adventist.org",
  },
  {
    name: "Ghana Ministry of Health",
    description: "We operate within national health policies and strategies.",
    url: "https://www.moh.gov.gh",
  },
];

export const Affiliations = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Our Affiliations & Partners
          </h2>
          <p className="text-muted-foreground">
            Working together to improve healthcare in Ghana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliations.map((affiliation) => (
            <a
              key={affiliation.name}
              href={affiliation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {affiliation.name}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
              <p className="text-muted-foreground text-sm">
                {affiliation.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

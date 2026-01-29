import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageContent } from "@/hooks/useCMS";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

const defaultEvents: Event[] = [
  {
    title: "Annual Health Conference 2025",
    description: "Join healthcare professionals from across Ghana for our annual conference.",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Accra International Conference Centre",
    category: "Conference",
  },
  {
    title: "Community Health Outreach",
    description: "Free health screening and education program for communities.",
    date: "February 20, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "Koforidua Municipal Hospital",
    category: "Outreach",
  },
  {
    title: "Nursing Training Workshop",
    description: "Professional development workshop for nursing staff.",
    date: "April 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "GAHS Training Centre, Kumasi",
    category: "Training",
  },
];

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Seminar: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Training: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Outreach: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Meeting: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  Celebration: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
};

export const EventsPreview = () => {
  const { getSection } = usePageContent("events");
  
  const eventsData = getSection<{ events: Event[] }>("upcoming_events");
  const events = eventsData?.events && eventsData.events.length > 0 
    ? eventsData.events.slice(0, 3) 
    : defaultEvents;

  return (
    <section className="py-16 md:py-24 bg-muted/50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Mark Your Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our upcoming conferences, trainings, and community programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                {/* Event Image */}
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <Badge 
                    className={`absolute top-3 left-3 ${categoryColors[event.category] || 'bg-primary text-primary-foreground'}`}
                  >
                    {event.category}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/events">
            <Button className="gap-2 group bg-primary hover:bg-primary-dark">
              View All Events
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

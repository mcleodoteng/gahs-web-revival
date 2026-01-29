import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Calendar, MapPin, Clock, ArrowRight, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageContent } from "@/hooks/useCMS";
import { motion } from "framer-motion";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  registrationLink?: string;
}

interface CalendarProgram {
  name: string;
  month: string;
  type: string;
  description: string;
  recurring: boolean;
}

const defaultEvents: Event[] = [
  {
    title: "Annual Health Conference 2025",
    description: "Join healthcare professionals from across Ghana for our annual conference focusing on innovation in healthcare delivery.",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Accra International Conference Centre",
    category: "Conference",
  },
  {
    title: "Community Health Outreach - Eastern Region",
    description: "Free health screening and education program for communities in the Eastern Region.",
    date: "February 20, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "Koforidua Municipal Hospital",
    category: "Outreach",
  },
  {
    title: "Nursing Training Workshop",
    description: "Professional development workshop for nursing staff on modern patient care techniques.",
    date: "April 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "GAHS Training Centre, Kumasi",
    category: "Training",
  },
];

const defaultCalendarPrograms: CalendarProgram[] = [
  { name: "MGUC Health Week", month: "January", type: "Conference", description: "Annual health awareness week organized by MGUC", recurring: true },
  { name: "Staff Development Seminar", month: "February", type: "Seminar", description: "Professional development for healthcare workers", recurring: true },
  { name: "Annual General Meeting", month: "March", type: "Meeting", description: "GAHS Annual General Meeting", recurring: true },
  { name: "World Health Day Celebration", month: "April", type: "Celebration", description: "Commemorating WHO World Health Day", recurring: true },
  { name: "Nurses Week Celebration", month: "May", type: "Celebration", description: "Honoring nursing professionals", recurring: true },
  { name: "Mid-Year Review Conference", month: "June", type: "Conference", description: "Mid-year institutional performance review", recurring: true },
  { name: "Community Outreach Program", month: "July", type: "Outreach", description: "National community health outreach", recurring: true },
  { name: "Leadership Training", month: "August", type: "Training", description: "Leadership development for managers", recurring: true },
  { name: "Research Symposium", month: "September", type: "Seminar", description: "Presentation of health research findings", recurring: true },
  { name: "SGUC Health Conference", month: "October", type: "Conference", description: "Southern Ghana Union Conference health summit", recurring: true },
  { name: "Quality Improvement Workshop", month: "November", type: "Training", description: "Healthcare quality improvement training", recurring: true },
  { name: "Year-End Thanksgiving Service", month: "December", type: "Celebration", description: "Annual thanksgiving and awards ceremony", recurring: true },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Seminar: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Training: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Outreach: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Meeting: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  Celebration: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
};

const EventsPage = () => {
  const { getSection, isLoading } = usePageContent("events");
  const [selectedType, setSelectedType] = useState("All");

  const hero = getSection<{ title: string; subtitle: string; badge: string }>("hero") || {
    title: "Events & Calendar",
    subtitle: "Stay updated with upcoming events, conferences, trainings, and annual programs at GAHS.",
    badge: "Events"
  };

  const eventsData = getSection<{ events: Event[] }>("upcoming_events");
  const events = eventsData?.events && eventsData.events.length > 0 ? eventsData.events : defaultEvents;

  const calendarData = getSection<{ programs: CalendarProgram[] }>("yearly_calendar");
  const calendarPrograms = calendarData?.programs && calendarData.programs.length > 0 
    ? calendarData.programs 
    : defaultCalendarPrograms;

  // Get unique types for filtering
  const types = ["All", ...Array.from(new Set(calendarPrograms.map(p => p.type)))];

  const filteredPrograms = selectedType === "All" 
    ? calendarPrograms 
    : calendarPrograms.filter(p => p.type === selectedType);

  return (
    <Layout>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        badge={hero.badge}
      />

      {/* Upcoming Events Section */}
      <section className="py-20 bg-background">
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
              Join us at our upcoming conferences, trainings, and community programs
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="h-44 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-primary/30" />
                        </div>
                      )}
                      <Badge 
                        className={`absolute top-3 left-3 ${categoryColors[event.category] || 'bg-primary text-primary-foreground'}`}
                      >
                        {event.category}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {event.registrationLink && (
                        <Button className="w-full mt-4 gap-2" size="sm">
                          Register Now
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {events.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Yearly Calendar Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              Annual Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Yearly <span className="text-gradient">Calendar</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recurring conferences, seminars, trainings, and programs that happen throughout the year
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {months.map((month, monthIndex) => {
              const monthPrograms = filteredPrograms.filter(p => p.month === month);
              
              return (
                <motion.div
                  key={month}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: monthIndex * 0.05 }}
                >
                  <Card className={`h-full ${monthPrograms.length > 0 ? 'border-primary/30' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                          {monthIndex + 1}
                        </span>
                        {month}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {monthPrograms.length > 0 ? (
                        <div className="space-y-3">
                          {monthPrograms.map((program, pIndex) => (
                            <div 
                              key={pIndex}
                              className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-medium text-sm text-foreground">
                                  {program.name}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs shrink-0 ${categoryColors[program.type] || ''}`}
                                >
                                  {program.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {program.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No programs scheduled
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-light">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Want to Stay Updated?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us to learn more about our events or to register for upcoming programs.
            </p>
            <Button className="gap-2 bg-primary hover:bg-primary-dark" asChild>
              <a href="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;

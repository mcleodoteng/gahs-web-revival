import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Mail, Phone, Users, Award, Heart } from "lucide-react";

// Team images
import directorImage from "@/assets/team/dr-james-antwi.jpg";
import annabellaImage from "@/assets/team/annabella-agyeman-dankwah.jpg";
import hannahImage from "@/assets/team/hannah-asante.jpg";
import sandraImage from "@/assets/team/sandra-adwubi-osei.jpg";
import janetBoatengImage from "@/assets/team/janet-boateng.jpg";
import julietImage from "@/assets/team/juliet-atobrah-antwi.jpg";
import janetOwusuaaImage from "@/assets/team/janet-owusuaa.jpg";
import edmondImage from "@/assets/team/edmond-adjei-boadu.jpg";

const director = {
  name: "Dr. James Antwi",
  title: "Director",
  image: directorImage,
  message: `We are excited to share this edition of our 2024 Annual Report: The GAHS Annual Report: Are we on the cusp of something big? Our performance last year may not have matched every stakeholder's hopes or expectations, even though all major quality indicators showed gains even within the face of challenges. Yet, we believe strongly that lessons in 2024 and activities earmarked for 2025 can help us say, yes, indeed! we are on the cusp for something big. The resilience of our facilities, along with major improving conditions and expansions, point to a positive outlook for GAHS in 2025, especially as the year progresses.

The Ghana Adventist Health Services is privileged to serve the Ghanaian people and we don't only count this as an opportunity but blessing from above. During the year under review, we pursued major innovations in resource mobilisations including the famous 'nobewa' concept and other financial transactions that can help improve or transform our facilities. We embarked on major projects, institutional reforms, establishment of new facilities, missionary activities and evangelism to win souls for Christ.`,
};

const teamMembers = [
  {
    name: "Mrs. Annabella Agyeman Dankwah",
    title: "Deputy Director",
    department: "Administration",
    image: annabellaImage,
  },
  {
    name: "Hannah Asante",
    title: "Head",
    department: "Nursing Services",
    image: hannahImage,
  },
  {
    name: "Sandra Adwubi Osei",
    title: "Manager",
    department: "Human Resources",
    image: sandraImage,
  },
  {
    name: "Janet Boateng",
    title: "Head",
    department: "Finance & Accounts",
    image: janetBoatengImage,
  },
  {
    name: "Juliet Atobrah Antwi",
    title: "Coordinator",
    department: "Quality Assurance",
    image: julietImage,
  },
  {
    name: "Janet Owusuaa",
    title: "Manager",
    department: "Procurement",
    image: janetOwusuaaImage,
  },
  {
    name: "Edmond Adjei Boadu",
    title: "IT Manager",
    department: "Information Technology",
    image: edmondImage,
  },
];

const Leadership = () => {
  return (
    <Layout>
      <PageHero
        title="Leadership Team"
        subtitle="Meet the dedicated professionals leading GAHS towards excellence in healthcare delivery"
      />

      {/* Director's Message Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary-light/50 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Message from the Director
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              A Word from Our Leader
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Director Photo & Info */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-elegant">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={director.image} 
                    alt={director.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <CardContent className="p-6 text-center bg-background">
                  <h3 className="text-2xl font-bold text-foreground">{director.name}</h3>
                  <p className="text-lg text-primary font-semibold mt-1">{director.title}</p>
                  <p className="text-muted-foreground mt-2">Ghana Adventist Health Services</p>
                </CardContent>
                <div className="p-4 bg-primary text-primary-foreground">
                  <div className="flex items-center justify-center gap-6">
                    <a href="mailto:director@gahs.org.gh" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Mail className="h-5 w-5" />
                      <span className="text-sm">Email</span>
                    </a>
                    <a href="tel:+233322392578" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Phone className="h-5 w-5" />
                      <span className="text-sm">Call</span>
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Director's Message */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-elegant h-full">
                <CardContent className="p-8 md:p-10">
                  <Quote className="h-12 w-12 text-primary/30 mb-6" />
                  <div className="prose prose-lg max-w-none">
                    {director.message.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-foreground font-semibold">{director.name}</p>
                    <p className="text-primary">{director.title}, GAHS</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Collaborative Leadership</h3>
                <p className="text-muted-foreground text-sm">
                  Our leaders work together to ensure unified vision across all facilities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card bg-gradient-to-br from-secondary/5 to-transparent">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Excellence Driven</h3>
                <p className="text-muted-foreground text-sm">
                  Committed to maintaining the highest standards in healthcare delivery.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Faith-Centered</h3>
                <p className="text-muted-foreground text-sm">
                  Guided by Christian values in every decision and interaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Meet the GAHS Secretariat Team
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dedicated professionals working together to advance healthcare across Ghana
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-shadow duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  {/* Photo */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-foreground text-lg leading-tight">{member.name}</h3>
                    <p className="text-primary font-medium mt-1">{member.title}</p>
                    <p className="text-muted-foreground text-sm mt-1">{member.department}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 mx-auto mb-6 opacity-50" />
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
              "The right hand is used to open doors through which the body may find entrance. 
              This is the part the medical missionary work is to act."
            </blockquote>
            <cite className="text-primary-foreground/80 text-sm">
              — Ellen G. White, Ministry of Healing
            </cite>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-background">
        <div className="container">
          <Card className="border-0 shadow-elegant bg-gradient-to-r from-primary-light/50 via-background to-secondary-light/50">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Join Our Mission
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We are always looking for dedicated healthcare professionals who share our 
                vision of compassionate, faith-based healthcare delivery.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Get in Touch
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Leadership;

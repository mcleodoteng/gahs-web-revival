import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Target, Eye, Quote, History, Users, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <PageHero
        title="About GAHS"
        subtitle="Learn about our history, mission, and commitment to faith-based healthcare in Ghana."
        badge="Our Story"
      />

      {/* History Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                <History className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our History</h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Since its establishment in Ghana, the Seventh-day Adventist Church has been a major advocate and provider of quality healthcare with mission focus in Ghana, making a significant impact, notably through its work in Atibie during the 1960s. This historical commitment to health is a key part of the church's identity and mission in the country. In the 1980s, the Central Ghana Conference established health facilities at Asamang, Konkoma, Onwe and Amuana-Praso. The facilities at Atibie, Onwe and Amuana-Praso have since been discontinued as part of the Adventist health system.
              </p>

              <p>
                The process of forming Ghana Adventist Health Services (GAHS) began in 1990 when the Central Ghana Conference (CGC) named Dr. Agyemang Boateng as the Health and Temperance Director and Pr. Annor Boafo his Associate Director. This newly formed leadership quickly brought all CGC health institutions under a single organization, the CGC Adventist Health Services (AHS). A governing body, the AHS Board, was then created to oversee these institutions. As the organization's health work expanded, a recommendation from the Adventist Health Services (AHS), made in collaboration with the West African Union Administration, led to the creation of a national body called Ghana Adventist Health Services (GAHS) to oversee all health institutions under a single umbrella.
              </p>

              <p>
                On May 17, 1999, the first Union meeting at the West Africa Union Mission (WAUM), chaired by Ps P.O. Mensah, made two main decisions. First, it created a new GAHS Secretariat at the Union level and dissolved the local AHS Boards and Secretariats. Second, the Health Ministries Committees were then reformed to handle certain local health responsibilities that the old Boards used to manage. Following these decisions, the Ghana Adventist Health Service (GAHS) became the sole authority for governing, developing policy, and supervising all Adventist Health facilities in Ghana. To support this, the GAHS Secretariat was established in Kumasi on July 15, 1999.
              </p>

              <p>
                GAHS became a member of the Christian Health Association of Ghana (CHAG), a recognized agency that operates under the Ghana Ministry of Health (MOH) and coordinates health services provided by Christian churches. CHAG works within the MOH's policies and strategies to serve the population, complementing the government's health services through its own network of health facilities. From 1990 to date, GAHS has seen rapid expansion, marked by the establishment of new institutions and a focus on providing quality health services and health professional education with Christ's mission across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 section-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  GAHS seeks to win souls for Christ through the wholistic approach to quality healthcare in families, households and communities and with committed effort to treating all with human dignity, respect and tolerance.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the leading faith-based healthcare network in Ghana, delivering compassionate care, producing quality health professionals, advancing medical excellence, and transforming communities for a healthier, hope-filled future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ellen G. White Quote */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gold-light rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <Quote className="absolute top-6 left-6 h-20 w-20 text-gold/20" />
            <div className="relative z-10 text-center">
              <blockquote className="text-xl lg:text-2xl text-foreground/80 leading-relaxed italic mb-8">
                "The right hand is used to open doors through which the body may find entrance. This is the part, the medical missionary work is to act. It is used to largely prepare the way for the reception of the truth for this time. A body without hands is useless. In giving honor to the body, honor must also be given to the helping hands, which are agencies of such importance that without them the body cannot do anything. Therefore, the body which treats indifferently the right hand, refusing its aid, is able to accomplish nothing."
              </blockquote>
              <cite className="text-muted-foreground">
                — E. G. White, Ministry of Healing, Oshawa, Ontario, Pacific Press Assoc., 1963, 241
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GAHS */}
      <section className="py-20 section-light">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              Why Choose GAHS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Excellence in Faith-Based Healthcare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="why-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Comprehensive Healthcare Network
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We operate an extensive network of hospitals, clinics, a medical store, and training institutions strategically located across the country. This integrated system ensures that individuals and communities, whether in urban centers or rural areas, have access to quality healthcare and essential medical supplies. By combining treatment, preventive care, and professional training under one umbrella, we provide a seamless healthcare experience that meets physical, emotional, and spiritual needs. Our reach allows us to deliver consistent, reliable, and compassionate care wherever it is needed most.
              </p>
            </div>

            <div className="why-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Care Rooted in Christian Values
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                At GAHS, we believe every human being deserves to be treated with compassion, dignity and respect. Our Christian principles inspire us to serve selflessly, act with integrity, and offer hope alongside healing. From our healthcare facilities to our training institutions, we strive to meet physical needs while nurturing emotional and spiritual well-being — delivering care that touches both body and soul.
              </p>
            </div>

            <div className="why-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Excellence in Care and Training
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We are committed to delivering the highest standards of healthcare while shaping the future of medical services in Ghana. We provide quality, patient-centered care, using best practices and up-to-date medical knowledge. At the same time, our training institutions equip healthcare professionals with the skills, ethics, and compassion needed to serve effectively. By combining outstanding service with exceptional education, we ensure that our impact extends beyond today — building a healthier, better prepared generation for tomorrow.
              </p>
            </div>

            <div className="why-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Top Professionals
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We are proud to be home to a dedicated team of highly qualified doctors, nurses, pharmacists, technicians, and healthcare educators. Our professionals are not only well trained but are also committed to ongoing learning and development. Guided by compassion and integrity, they work collaboratively to provide accurate diagnoses, effective treatments, and personalized care. Whether in patient care or professional training, our people are our greatest assets combining expertise with a genuine calling to serve.
              </p>
            </div>

            <div className="why-card md:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Trusted Legacy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For decades, we have stood as a pillar of dependable, compassionate healthcare in Ghana. Our history is built on a consistent commitment to quality service, ethical practice, and respect for every individual we serve. Generations of patients, families, and communities have placed their trust in us — knowing that our care is guided by both professional excellence and strong moral values. This enduring trust inspires us to uphold our reputation, adapt to changing healthcare needs, and continue serving with integrity for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

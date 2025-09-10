import { motion } from "framer-motion";
import { 
  Users, 
  Lightbulb, 
  Heart, 
  Rocket, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink 
} from "lucide-react";
import { useProfile } from "@/hooks/useSupabaseQuery";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { data: profile, isLoading, error } = useProfile();

  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive network of tech enthusiasts across Myanmar",
    },
    {
      icon: Lightbulb,
      title: "Innovation Without Barriers",
      description: "Making technology accessible to everyone, regardless of coding skills",
    },
    {
      icon: Heart,
      title: "Empowerment Through Technology",
      description: "Equipping youth with tools to create their digital future",
    },
    {
      icon: Rocket,
      title: "Local Solutions, Global Standards",
      description: "Creating world-class applications with Myanmar's unique needs in mind",
    },
  ];

  const getSocialIcon = (url: string) => {
    if (url.includes("github")) return Github;
    if (url.includes("linkedin")) return Linkedin;
    if (url.includes("x.com") || url.includes("twitter")) return Twitter;
    return ExternalLink;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Personal Bio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              About Me
            </h1>
            <p className="text-muted-foreground text-lg">
              Empowering Myanmar youth through no-code innovation and community building
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-card rounded-2xl shadow-xl">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-muted-foreground p-8">
              <p>Unable to load profile data.</p>
            </div>
          ) : profile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8 p-8 bg-card rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage 
                    src={profile.profile_picture || "https://via.placeholder.com/150"} 
                    alt={profile.name}
                  />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-purple-600 text-white">
                    {profile.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                >
                  {profile.name}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-lg mb-6 leading-relaxed"
                >
                  {profile.bio}
                </motion.p>

                {profile.social_links && profile.social_links.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 justify-center md:justify-start"
                  >
                    {profile.social_links.map((link, index) => {
                      const Icon = getSocialIcon(link);
                      return (
                        <motion.a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 5,
                            backgroundColor: "hsl(var(--primary) / 0.1)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to democratize technology in Myanmar. Through no-code tools 
              and community support, we're enabling young innovators to transform their ideas 
              into reality without traditional barriers. Together, we're building a future where 
              every creative mind has the power to create digital solutions that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide our community
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)"
                }}
                className="p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 mb-4"
                >
                  <value.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Born from the vibrant tech community of Myanmar, our platform represents 
                the dreams and aspirations of a new generation of digital creators. We 
                recognized that brilliant ideas were being held back by technical barriers, 
                and we decided to change that.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                What started as a small group of no-code enthusiasts has grown into a 
                thriving community of innovators, designers, and entrepreneurs. Every day, 
                we witness Myanmar youth turning their visions into reality, proving that 
                with the right tools and support, anything is possible.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Join us in this journey as we continue to break barriers, build bridges, 
                and create a future where technology serves everyone, not just the few 
                who can code.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
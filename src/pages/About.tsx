import { motion } from "framer-motion";
import { Heart, Target, Lightbulb, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Innovation",
      description: "We believe in the power of technology to transform lives and communities",
    },
    {
      icon: Target,
      title: "Mission Driven",
      description: "Democratizing technology for every Myanmar youth, regardless of coding skills",
    },
    {
      icon: Lightbulb,
      title: "Creative Solutions",
      description: "Encouraging out-of-the-box thinking and innovative problem-solving",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building together, learning together, growing together",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About Our Mission
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to empower Myanmar's youth with the tools and knowledge 
              to build the digital future—no coding required. Our community is where 
              creativity meets technology, where ideas become reality.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Started in 2024, Myanmar No-Code Community was born from a simple observation: 
                  countless brilliant minds in Myanmar have amazing ideas but lack the technical 
                  skills to bring them to life.
                </p>
                <p>
                  We believe that everyone should have the power to create, innovate, and solve 
                  problems using technology. That's why we're building a community where coding 
                  knowledge is optional, but creativity is essential.
                </p>
                <p>
                  Today, we're proud to be at the forefront of Myanmar's no-code revolution, 
                  helping hundreds of young creators launch their projects and turn their 
                  dreams into reality.
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                      500+
                    </motion.div>
                    <p className="text-muted-foreground">Community Members</p>
                  </div>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                      50+
                    </motion.div>
                    <p className="text-muted-foreground">Projects Launched</p>
                  </div>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                      10+
                    </motion.div>
                    <p className="text-muted-foreground">Partner Organizations</p>
                  </div>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                      100%
                    </motion.div>
                    <p className="text-muted-foreground">Growth Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-4"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
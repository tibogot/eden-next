import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies like Next.js, React, and Node.js.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Performance Tuning",
        "Security Best Practices",
      ],
      price: "From $5,000",
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android platforms.",
      features: [
        "Native iOS/Android",
        "Cross-platform (React Native)",
        "App Store Optimization",
        "Push Notifications",
      ],
      price: "From $8,000",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive user interfaces that enhance user experience and drive engagement.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      price: "From $3,000",
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and DevOps solutions for modern applications.",
      features: [
        "AWS/Azure/GCP",
        "CI/CD Pipelines",
        "Monitoring & Logging",
        "Security & Compliance",
      ],
      price: "From $2,000",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description:
        "Intelligent solutions powered by machine learning and artificial intelligence.",
      features: [
        "Chatbots",
        "Data Analysis",
        "Predictive Analytics",
        "Automation",
      ],
      price: "From $10,000",
    },
    {
      icon: "🔧",
      title: "Consulting",
      description:
        "Strategic technology consulting to help you make informed decisions.",
      features: [
        "Technical Audits",
        "Architecture Planning",
        "Team Training",
        "Project Management",
      ],
      price: "From $150/hour",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We start by understanding your business goals, target audience, and technical requirements.",
    },
    {
      step: "02",
      title: "Planning",
      description:
        "We create a detailed project plan, timeline, and technical architecture.",
    },
    {
      step: "03",
      title: "Design",
      description:
        "Our design team creates beautiful, user-friendly interfaces and experiences.",
    },
    {
      step: "04",
      title: "Development",
      description:
        "We build your solution using modern technologies and best practices.",
    },
    {
      step: "05",
      title: "Testing",
      description:
        "Rigorous testing ensures your solution works perfectly across all devices.",
    },
    {
      step: "06",
      title: "Launch",
      description:
        "We deploy your solution and provide ongoing support and maintenance.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we offer comprehensive digital
              solutions that help businesses grow and succeed in the digital
              age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your specific needs
              and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {service.price}
                </div>
                <Link
                  href="/contact"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and
              client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We leverage the latest technologies to build fast, scalable, and
              secure solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Python",
              "AWS",
              "Docker",
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "GraphQL",
              "Tailwind CSS",
            ].map((tech, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-2xl font-bold text-gray-900">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your requirements and create a custom solution for
            your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              Get a Quote
            </Link>
            <Link
              href="/about"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

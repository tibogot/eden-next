import Link from "next/link";

export default function About() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      bio: "Visionary leader with 15+ years in tech innovation.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "👨‍💻",
      bio: "Technical expert specializing in scalable architectures.",
    },
    {
      name: "Emily Rodriguez",
      role: "Design Director",
      image: "👩‍🎨",
      bio: "Creative genius behind our award-winning designs.",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "👨‍🔧",
      bio: "Full-stack wizard with a passion for clean code.",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from code quality to user experience.",
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and open communication.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We constantly explore new technologies and creative solutions.",
    },
    {
      icon: "❤️",
      title: "Integrity",
      description:
        "We build trust through transparency and honest relationships.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Coan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a passionate team of innovators, designers, and developers
              dedicated to creating exceptional digital experiences that make a
              difference.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Coan, we believe that technology should empower businesses
                and enhance human experiences. Our mission is to bridge the gap
                between innovative ideas and practical solutions, creating
                digital products that not only meet today's needs but anticipate
                tomorrow's challenges.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2020, we've grown from a small startup to a trusted
                partner for businesses worldwide, delivering over 500 successful
                projects across various industries.
              </p>
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Work With Us
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovation at Every Step
              </h3>
              <p className="text-gray-600">
                From cutting-edge web applications to mobile solutions, we
                leverage the latest technologies to deliver exceptional results
                for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the way we work
              with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented individuals who make Coan's vision a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

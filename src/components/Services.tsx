const Services = () => {
  const services = [
    {
      title: "Landscape Design",
      description: "Custom design solutions tailored to your space and preferences"
    },
    {
      title: "Lawn Maintenance",
      description: "Regular maintenance to keep your lawn healthy and beautiful"
    },
    {
      title: "Hardscaping",
      description: "Professional installation of patios, walkways, and retaining walls"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

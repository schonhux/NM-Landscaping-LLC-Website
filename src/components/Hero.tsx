const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558904541-efa843a96f01')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Transform Your Outdoor Space</h1>
          <p className="text-xl mb-8">Professional landscaping services to create the yard of your dreams</p>
          <a href="#contact" className="bg-primary hover:bg-primary-light px-8 py-3 rounded-lg text-white font-medium transition-colors">
            Get a Free Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

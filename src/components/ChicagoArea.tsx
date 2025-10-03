const ChicagoArea = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">
          Serving the Chicagoland Suburbs
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Proudly serving communities throughout the Chicago-land area, N&M Landscaping brings professional landscaping services to your neighborhood. From the northern suburbs to the southern communities, we're here to transform your outdoor spaces.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Local expertise with over years of experience
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Serving residential and commercial properties
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Fast response times throughout the metro area
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Comprehensive services for all seasons
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/ff7dbada-8a0d-49cd-83f5-9d3dae7ab29d.png" 
              alt="Well-maintained lawn in Chicago-land area" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChicagoArea;

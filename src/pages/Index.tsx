import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChicagoArea from "../components/ChicagoArea";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ChicagoArea />
      <About />
      <Contact />
      <div className="pt-16 bg-white">
        <div 
          className="relative bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/44320afe-a6c8-4ee7-a798-68221b3f7855.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative py-20">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Review 1 */}
                <div className="bg-white/95 p-6 rounded-lg shadow-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-gray-800 italic">
                    "I've been a satisfied customer for over a year. Nick and Mike have done my fall leaf clean up, snow removals, tree and shrub trimmings, and weekly lawn maintenance. They are extremely polite, and their communication is prompt, and great."
                  </p>
                </div>

                {/* Review 2 */}
                <div className="bg-white/95 p-6 rounded-lg shadow-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-gray-800 italic">
                    "Nick and Mike came out today to do a fall cleanup on two large perennial beds. These two young men are hard workers, professional, polite, and willing to go the extra mile for your satisfaction. Do not hesitate to get a free quote!"
                  </p>
                </div>

                {/* Review 3 */}
                <div className="bg-white/95 p-6 rounded-lg shadow-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-gray-800 italic">
                    "Mike and Nick are the best! My landscaping needed some serious cleanup and it looks perfect again. They are so kind, knowledgeable, and hard working! They get out to you quickly!"
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button 
                  onClick={() => navigate('/reviews')}
                  className="bg-primary hover:bg-primary-light text-white px-16 py-3 rounded-full transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
                >
                  Share Your Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleContactClick = () => {
    navigate('/?section=contact');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section with dark green background */}
      <div className="relative w-full">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundColor: "#2F5233", // Using the primary color from the theme
            height: "100%",
            width: "100%"
          }}
        ></div>
        
        {/* Slightly darker overlay to improve text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
        
        <div className="relative flex items-center justify-center" style={{ height: isMobile ? '60vh' : '80vh' }}>
          <div className="text-center text-white px-4 mt-20">
            <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'} font-bold`}>
              What We Have to Offer
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 md:h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/4781bd50-da78-4c43-87b0-7522bb6258f4.png"
                alt="Mulching service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-primary">Mulching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Enhancing your garden's health and appearance with high-quality mulch, providing essential nutrients and moisture retention.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/f00305d7-4ea5-4c30-96c7-fcc07e9c1b2f.png"
                alt="Lawn care service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Lawn Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ensuring your lawn stays lush and vibrant through regular mowing, fertilization, and weed control, tailored to your yard's specific needs.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/090c0aa6-a415-4d32-9d47-ded4b01196df.png"
                alt="Debris clearing service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Debris Clearing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Efficiently removing leaves, branches, and other debris to keep your property clean and well-maintained, ensuring a tidy and safe environment.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/cf1dcfac-5336-4d4f-b97b-7b5841cbfba7.png"
                alt="Roof and gutter cleaning service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Roof/Gutter Cleaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Safely removing debris, moss, and algae from your roof to prevent damage and maintain its longevity, ensuring a clean and safe home.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/d40b8bc3-7cce-4c71-9571-a42b0763b969.png"
                alt="Shrub trimming service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Shrub Trimming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Expert trimming and shaping of shrubs to promote healthy growth and create aesthetically pleasing landscapes that enhance your property's beauty.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/3c56bef7-641d-485b-ad8d-351bfcee52b0.png"
                alt="Snow removal service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Snow Removal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Providing efficient and reliable snow removal services to keep your driveways, walkways, and property safe and accessible during winter months.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={handleContactClick}
            className="bg-primary hover:bg-primary-light text-white font-bold text-lg md:text-xl rounded-full w-36 h-36 md:w-48 md:h-48 transition-colors transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;

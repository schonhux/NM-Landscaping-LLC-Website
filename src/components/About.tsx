import { ClipboardCheck, Target, CheckSquare } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">About N&M Landscaping</h2>
          <p className="text-lg text-gray-600 mb-6">
            Mike and Nick founded N&M Landscaping at the age of 17 with just a push mower, a 4Runner, a Jeep, and a strong work ethic. Driven by a passion for transforming outdoor spaces, we've grown over the past two years into a trusted landscaping business known for our commitment to quality, reliability, and customer satisfaction.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From weekly mowing and garden design to full-yard transformations, we take pride in delivering results that exceed expectations. Our approach is rooted in hard work, attention to detail, and treating every property as if it were our own.
          </p>
          <p className="text-lg text-gray-600">
            When you choose N&M Landscaping, you're not just hiring landscapers—you're supporting two dedicated young men and a local business built on a foundation of dedication and a love for the outdoors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center shadow">
            <div className="flex justify-center mb-4">
              <ClipboardCheck className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Evaluation</h3>
            <p className="text-gray-600">Assessing your landscape needs and goals.</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Strategy</h3>
            <p className="text-gray-600">Crafting a tailored plan to approach your project.</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow">
            <div className="flex justify-center mb-4">
              <CheckSquare className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Delivery</h3>
            <p className="text-gray-600">Bringing your vision to life with expert execution.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

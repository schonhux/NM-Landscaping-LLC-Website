
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const services = [
  "Lawn Care services",
  "Mulching",
  "Shrub trimming",
  "Snow Removal",
  "Weekly/Bi weekly mowing",
  "Flower beds",
  "Power washing"
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    services: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Preparing form data for submission:", formData);
      
      // Only include fields that exist in the database table
      const dataToSubmit = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        services: Array.isArray(formData.services) ? formData.services : []
      };
      
      console.log("Submitting to Supabase:", dataToSubmit);
      
      // Save to Supabase with improved error handling
      const { data, error: dbError } = await supabase
        .from('contact_submissions')
        .insert([dataToSubmit])
        .select();

      if (dbError) {
        console.error('Supabase error details:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log("Submission successful, response:", data);
      
      // Send email notifications using the edge function - make sure we're not sending address to avoid confusion
      try {
        console.log("Sending email notification via edge function");
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            // Only include address field in the edge function call, not in DB submission
            address: formData.address.trim(),
            message: formData.message.trim(),
            services: formData.services
          }
        });
        
        if (emailError) {
          console.error('Email notification error:', emailError);
          // We don't throw here since the form submission was successful
          toast.warning("Your information was saved, but there was an issue sending the email notification.");
        }
      } catch (emailErr) {
        console.error('Error sending email notification:', emailErr);
        // We still continue as the form data was saved successfully
      }
      
      // If we get here, the submission was successful
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", address: "", message: "", services: [] });
    } catch (error) {
      console.error('Detailed error information:', error);
      
      // Improved error message with more detail
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("There was an error sending your message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Preferred)</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Services Needed</label>
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={service}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

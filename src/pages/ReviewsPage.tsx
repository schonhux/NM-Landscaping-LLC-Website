import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Review {
  id: string;
  rating: number;
  message: string;
  created_at: string;
}

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setReviews(data);
        // Calculate average rating
        const total = data.reduce((sum, review) => sum + review.rating, 0);
        const avg = data.length > 0 ? total / data.length : 0;
        setAverageRating(Number(avg.toFixed(1)));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error("Error loading reviews");
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      // First, submit the review to the database
      const { error: submitError } = await supabase
        .from('reviews')
        .insert([{ rating, message }]);

      if (submitError) throw submitError;

      // Then, send the email notification
      const { error: notificationError } = await supabase.functions.invoke('send-review-notification', {
        body: { rating, message }
      });

      if (notificationError) {
        console.error('Error sending notification:', notificationError);
        // Don't throw here, as the review was already saved
      }

      toast.success("Thank you for your feedback!");
      await fetchReviews(); // Refresh reviews after submission
      setRating(0);
      setMessage("");
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("There was an error submitting your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < rating ? "fill-accent text-accent" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Average Rating Display */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">
                Overall Rating
              </h2>
              <div className="flex justify-center items-center gap-4">
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-xl font-bold">{averageRating}</span>
              </div>
              <p className="text-gray-600 mt-4">
                Based on {reviews.length} reviews
              </p>
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mt-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-16">
              Let Us Know How We Did!
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="flex justify-center space-x-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="focus:outline-none transform transition-transform hover:scale-110"
                  >
                    <Star
                      size={56}
                      className={`${
                        rating >= star
                          ? "fill-accent text-accent"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience with us..."
                  className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary min-h-[250px] text-lg"
                  required
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-light text-white px-16 py-5 rounded-full text-xl transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>

          {/* Reviews List */}
          <div className="mt-16 space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 text-lg mb-4">{review.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;

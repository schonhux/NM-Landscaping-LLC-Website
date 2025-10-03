import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  created_at: string;
}

const AdminPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-contact-submissions');
        if (error) throw error;
        setSubmissions(data.submissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading submissions...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Form Submissions</h1>
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white shadow rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{submission.name}</h3>
                  <p className="text-gray-600">{submission.email}</p>
                  <p className="text-gray-600">{submission.phone}</p>
                  <p className="text-sm text-gray-500">
                    Submitted on {format(new Date(submission.created_at), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Services Requested:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {submission.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Message:</h4>
                <p className="text-gray-600">{submission.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

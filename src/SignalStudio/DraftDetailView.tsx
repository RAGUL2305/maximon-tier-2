import { useNavigate } from "react-router-dom";

const DraftDetailView = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Draft Detail View</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-4">
          <div>
            <h2 className="font-bold text-xl">Q2 Product Launch Email</h2>
            <div className="flex mt-1">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Pending Approval
              </span>
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-gray-200 px-4 py-2 rounded mr-2"
              onClick={() => navigate(-1)}
            >
              Back to List
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              onClick={() => navigate(-1)}
            >
              Reject
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              Approve
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex mb-2 justify-between items-center">
            <div className="flex">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-2">
                Tone Score: 92%
              </span>
              <a href="#" className="text-blue-600 text-sm">
                View Generation History
              </a>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: 2 hours ago
            </div>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white min-h-64">
            <p className="mb-3">Dear Valued Customer,</p>
            <p className="mb-3">
              We're excited to announce the launch of our Q2 product lineup,
              designed with your needs in mind. Starting next week, you'll have
              access to several powerful new features that will transform how
              you work.
            </p>
            <p className="mb-3">Our latest updates include:</p>
            <ul className="list-disc pl-6 mb-3">
              <li>Integrated workflows that save you up to 5 hours weekly</li>
              <li>Customizable dashboards with real-time analytics</li>
              <li>Enhanced collaboration tools for distributed teams</li>
            </ul>
            <p>
              We can't wait for you to experience these improvements. As always,
              our customer success team is available to help you make the most
              of these new features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftDetailView;

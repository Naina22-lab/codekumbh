export const Card = ({ title, content }) => {
    return (
      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
        <p className="text-gray-300">{content}</p>
      </div>
    );
  };
  
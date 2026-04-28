export default function Card({ children }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      {children}
    </div>
  );
}
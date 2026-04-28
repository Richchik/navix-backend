import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-purple-400">NaviX AI</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-purple-400 hover:scale-110 transition duration-300">Home</Link>
          <Link to="/Features" className="hover:text-purple-400 hover:scale-110 transition duration-300">Features</Link>
          <Link to="/Login" className="hover:text-purple-400 hover:scale-110 transition duration-300">
            Login/Signup
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-r from-purple-900 via-black to-blue-900"
      >

        <motion.h1
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ 
    opacity: 1, 
    scale: 1,
    y: [0, -10, 0]   // floating effect
  }}
  transition={{ 
    delay: 0.3, 
    duration: 2,
    repeat: Infinity, 
    ease: "easeInOut"
  }}
  className="text-5xl md:text-6xl font-bold leading-tight"
>
  AI Operating System for Logistics 🚀
</motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 mt-6 max-w-xl"
        >
          Predict delays. Optimize routes. Deliver faster with AI intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex gap-4"
        >
          <Link to="/Login">
          <motion.button
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
  className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-lg font-semibold"
>
  Get Started
</motion.button>
</Link>
<Link to="/Features">
          <button className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Learn More
          </button>
          </Link>
        </motion.div>

      </motion.div>
       
       {/* NEW IMAGE SECTION STARTS HERE */}
      
      <div className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">

  {/* Background Image */}
    <motion.img
  src="/city-ai.jpg"
  initial={{ scale: 1 }}
  animate={{ scale: 1.1 }}
  transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
  className="absolute w-full h-full object-cover"
/>

  {/* Dark Overlay */}
  <div className="absolute w-full h-full bg-black/70"></div>

  {/* Content */}
  <div className="relative z-10 max-w-2xl px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      Powering Smart Logistics Across Cities
    </h2>
    <p className="text-gray-300 text-lg">
      From traffic flow to delivery routes, NaviX AI AI transforms real-world logistics into intelligent, optimized systems.
    </p>
  </div>

</div>

{/* WHAT NAVIX AI DOES SECTION */}

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative px-8 py-24 text-center bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
>

  {/* Glow Effects */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    <div className="absolute w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl bottom-10 right-10"></div>
  </div>

  <h2 className="relative z-10 text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
    What NaviX AI Actually Does
  </h2>

  <p className="relative z-10 text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
    Most logistics platforms only track deliveries.<br /><br />
    NaviX AI goes beyond tracking — it makes decisions.<br /><br />
    It predicts delays before they happen, dynamically adjusts routes,
    and identifies operational bottlenecks across fleets and warehouses
    in real-time.
  </p>
</motion.div>


{/* WHY NAVIX AI IS DIFFERENT */}

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative px-8 py-24 text-center bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
>

  {/* Glow Effects */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    <div className="absolute w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl bottom-10 right-10"></div>
  </div>

  <h2 className="relative z-10 text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
    Why NaviX AI is Different
  </h2>

  <div className="relative z-10 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-purple-400 mb-3">
        Not Just Tracking
      </h3>
      <p className="text-gray-400">
        Traditional systems only show where deliveries are.
        NaviX AI predicts what will happen next.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-blue-400 mb-3">
        Real-Time Decisions
      </h3>
      <p className="text-gray-400">
        Automatically reroutes fleets and adapts to traffic,
        delays, and warehouse load instantly.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-green-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-green-400 mb-3">
        End-to-End Intelligence
      </h3>
      <p className="text-gray-400">
        Connects routing, warehouse operations, and delivery systems
        into one unified AI engine.
      </p>
    </motion.div>

  </div>
</motion.div>

{/*Real Time Decission Making Section*/}

<div className="relative h-[400px] flex items-center justify-center text-center text-white overflow-hidden">

 <motion.img
  src="/ai-bg.jpg"
  initial={{ scale: 1 }}
  animate={{ scale: 1.1 }}
  transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
  className="absolute w-full h-full object-cover"
/>

  <div className="absolute w-full h-full bg-black/60"></div>

  <div className="relative z-10 max-w-2xl px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Real-Time AI Decisions
    </h2>
    <p className="text-gray-300">
      Navix AI doesn’t just track logistics — it actively makes decisions. 
      From rerouting deliveries during traffic congestion to predicting delays 
      before they happen, our system ensures operations never stop.
    </p>
  </div>
</div>


      {/* Features Section */}

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative px-8 py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
>

  {/* Glow Background */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    <div className="absolute w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl top-20 left-20"></div>
    <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl bottom-10 right-20"></div>
  </div>

  {/* Heading */}
  <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
    Core Features
  </h2>

  <div className="relative z-10 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-purple-400">
        Smart Routing
      </h3>
      <p className="text-gray-400 mt-2">
        AI-powered route optimization to reduce delivery time.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-blue-400">
        Delay Prediction
      </h3>
      <p className="text-gray-400 mt-2">
        Predict delays before they happen using real-time data.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-green-500 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-green-400">
        Live Tracking
      </h3>
      <p className="text-gray-400 mt-2">
        Track shipments with real-time AI insights.
      </p>
    </motion.div>

  </div>
</motion.div>
      {/* Footer */}

<div className="bg-black border-t border-gray-800 px-8 py-12">

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-gray-400">

    {/* Brand */}
    <div>
      <h2 className="text-xl font-bold text-white mb-3">NaviX AI</h2>
      <p className="text-sm">
        AI-powered logistics intelligence platform helping businesses
        optimize routes, reduce delays, and improve delivery efficiency.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h3 className="text-white font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-purple-400 cursor-pointer">Home</li>
        <li className="hover:text-purple-400 cursor-pointer">Features</li>
        <li className="hover:text-purple-400 cursor-pointer">About</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-white font-semibold mb-3">Contact</h3>
      <p className="text-sm">📧 navix.ai.team@gmail.com</p>
      <p className="text-sm mt-2">
        📍 India
      </p>
    </div>

  </div>

  {/* Bottom */}
  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
    © 2026 NaviX AI. All rights reserved.
  </div>
</div>
</div>
  );
}
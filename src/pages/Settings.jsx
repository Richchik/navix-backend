import { auth } from "../firebase";

export default function Settings() {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">
      
      <h1 className="text-3xl font-bold mb-8">⚙️ Settings</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl">
        
        <h2 className="text-lg font-semibold mb-4">Profile Info</h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>

          <div>
            <label className="text-gray-400 text-sm">User ID</label>
            <p className="text-white text-xs break-all">{user?.uid}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
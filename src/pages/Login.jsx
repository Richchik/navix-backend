import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful 🚀");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful ✅");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert(error.message);
    }
  };
const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent 📩\nCheck spam folder if not found.");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-80">
        <h2 className="text-2xl mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
  className="text-sm text-blue-400 cursor-pointer mb-3 hover:underline"
  onClick={handleForgotPassword}
>
  Forgot Password?
</p>
<p className="text-xs text-gray-500 mb-2">
  Check spam folder if you don’t see the email
</p>

        <button
          onClick={handleAuth}
          className="w-full bg-purple-600 py-2 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="mt-4 text-sm cursor-pointer text-gray-400"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
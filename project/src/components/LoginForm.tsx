import { useState } from 'react';

interface LoginFormProps {
    onSignIn?: () => void;
}

export function LoginForm({ onSignIn }: LoginFormProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isSignUp ? 'Sign Up Submitted:' : 'Sign In Submitted:', formData);
        if (onSignIn) {
            onSignIn(); // Call onSignIn when the form is submitted
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="mb-3">
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Full Name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 font-bold">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;

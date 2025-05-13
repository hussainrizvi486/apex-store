import React from 'react';

const ProfilePage: React.FC = () => {
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        address: '123 Main Street, City, Country',
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Customer Profile</h1>
            <div className="mb-4">
                <strong>Name:</strong> <span>{user.name}</span>
            </div>
            <div className="mb-4">
                <strong>Email:</strong> <span>{user.email}</span>
            </div>
            <div className="mb-4">
                <strong>Phone:</strong> <span>{user.phone}</span>
            </div>
            <div className="mb-4">
                <strong>Address:</strong> <span>{user.address}</span>
            </div>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-8"
                onClick={() => alert('Edit Profile functionality coming soon!')}
            >
                Edit Profile
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <a
                    href="/profile/address"
                    className="flex flex-col items-center p-4 bg-gray-100 rounded hover:bg-gray-200 transition"
                >
                    <span className="text-2xl mb-2">🏠</span>
                    <span className="font-medium">Addresses</span>
                </a>
                <a
                    href="/profile/orders"
                    className="flex flex-col items-center p-4 bg-gray-100 rounded hover:bg-gray-200 transition"
                >
                    <span className="text-2xl mb-2">🛒</span>
                    <span className="font-medium">Orders</span>
                </a>
                <a
                    href="/profile/reviews"
                    className="flex flex-col items-center p-4 bg-gray-100 rounded hover:bg-gray-200 transition"
                >
                    <span className="text-2xl mb-2">⭐</span>
                    <span className="font-medium">Product Reviews</span>
                </a>
            </div>
        </div>
    );
};

export default ProfilePage;
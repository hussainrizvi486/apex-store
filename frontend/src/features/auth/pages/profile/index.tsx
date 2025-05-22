import { Header } from '@components/layouts';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@components/ui/tabs';
import React, { useCallback, useState } from 'react';


export interface ProfileType {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}

export interface AddressType {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png';

const tabItems = [
    {
        "name": "My Orders"
    },
    {
        "name": "My Wishlist"
    },
    {
        "name": "Address Book"
    }
]

// Sample address data
const sampleAddresses: AddressType[] = [
    {
        id: '1',
        name: 'Home',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001'
    },
    {
        id: '2',
        name: 'Work',
        address: '456 Office Building',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10002'
    }
];

const ProfilePage: React.FC = () => {

    const user: ProfileType = {
        username: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    };


    const [activeTab, setActiveTab] = useState('Address Book');
    return (
        <>
            <Header />
            <div className='mx-auto max-w-6xl'>
                <div className='py-4'>
                    <Tabs defaultValue="profile">
                        <TabsList className='py-6 w-full'>
                            <TabsTrigger value='profile'>Your Account</TabsTrigger>
                            <TabsTrigger value='address'>Address Book</TabsTrigger>
                            <TabsTrigger value='orders'>My Orders</TabsTrigger>
                            <TabsTrigger value='reviews'>My Reviews</TabsTrigger>
                            <TabsTrigger value='wishlist'>Wishlist</TabsTrigger>
                        </TabsList>

                        <TabsContent value='profile'>
                            <ProfileTab />
                        </TabsContent>

                        <TabsContent value='address'>
                            <div>Address</div>
                        </TabsContent>

                        <TabsContent value='orders'>
                            <OrdersTab />
                        </TabsContent>
                        <TabsContent value='reviews'>
                            <div>Reviews</div>
                        </TabsContent>
                        <TabsContent value='wishlist'>
                            <div>wishlist</div>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </>
    )

    return (
        <div>
            <Header />
            <div className='mx-auto max-w-6xl'>
                <Tabs defaultValue="profile">
                    <TabsList >
                        <TabsTrigger value='profile'>Your Account</TabsTrigger>
                        <TabsTrigger value='address'>Address Book</TabsTrigger>
                    </TabsList>

                    <TabsContent value='profile'>
                        <div>

                        </div>
                    </TabsContent>

                </Tabs>
                <div className='p-4'>
                    <div>
                        <div className='text-lg font-medium'>Hi. {user.username}</div>
                        <div className='text-sm'>
                            Welcome to your account. Check your orders, update your wishlist, manage your products and subscriptions, and edit your personal details—all in one place!
                        </div>
                    </div>

                    <div className='flex my-4 border-x py-2'>
                        {tabItems.map((item, index) => (
                            <div key={index} className='basis-full'>
                                <div
                                    className={`border-x px-2 font-medium cursor-pointer ${activeTab === item.name ? 'text-blue-600 font-bold' : ''}`}
                                    onClick={() => setActiveTab(item.name)}
                                >
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {activeTab === 'Address Book' ? (
                        <AddressBook addresses={sampleAddresses} />
                    ) : (
                        <div className='mb-6'>
                            <ProfileForm data={user} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

const AddressBook: React.FC<{ addresses: AddressType[] }> = ({ addresses }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [addressList, setAddressList] = useState<AddressType[]>(addresses);

    const addNewAddress = (address: AddressType) => {
        setAddressList(prev => [...prev, address]);
        setShowAddForm(false);
    }

    const deleteAddress = (id: string) => {
        setAddressList(prev => prev.filter(address => address.id !== id));
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Address Book</h2>
                <p className="text-sm text-gray-500">Manage your shipping and billing addresses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {addressList.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        onDelete={() => deleteAddress(address.id)}
                    />
                ))}

                <div
                    className="border border-dashed rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setShowAddForm(true)}
                >
                    <div className="text-center">
                        <span className="block text-2xl">+</span>
                        <span className="block text-sm">Add New Address</span>
                    </div>
                </div>
            </div>

            {showAddForm && (
                <AddressForm
                    onSave={addNewAddress}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

const AddressCard: React.FC<{
    address: AddressType;
    onDelete: () => void;
}> = ({ address, onDelete }) => {
    return (
        <div className="border rounded-md p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                <button className="text-gray-500 hover:text-red-500" onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div className="mb-2">
                <span className="font-medium">{address.name}</span>
            </div>
            <div className="text-sm text-gray-600">
                <p>{address.address}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
            </div>
        </div>
    );
};

const AddressForm: React.FC<{
    initialData?: AddressType;
    onSave: (address: AddressType) => void;
    onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<AddressType>(
        initialData || {
            id: Date.now().toString(), // Generate a simple ID
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="border rounded-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-4">
                {initialData ? 'Edit Address' : 'Add New Address'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm mb-1">Address Name</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Home, Work, etc."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Address Line</label>
                        <Input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street address"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">City</label>
                        <Input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">State/Province</label>
                        <Input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Zip/Postal Code</label>
                        <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="Zip code"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Country</label>
                        <Input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border rounded-md text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md text-sm"
                    >
                        Save Address
                    </button>
                </div>
            </form>
        </div>
    );
};


const ProfileTab: React.FC = () => {
    const user: ProfileType = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    };

    const data = user;


    const [profile, setProfile] = useState<ProfileType>({
        // firstName: '',
        // lastName: '',
        // username: '',
        // email: '',
        // profilePicture: DEFAULT_PROFILE_IMAGE,
        ...data,
    });


    return (
        <div >
            <div className="mb-6">
                <div></div>
            </div>

            <div className='flex justify-between items-start border-b border-gray-300 mb-6'>
                <div className="mb-6 flex flex-col items-center">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <img src={user.profilePicture || DEFAULT_PROFILE_IMAGE} alt="Profile"
                            className="w-20 h-20 rounded-full object-cover mb-2 hover:opacity-80 transition" />
                    </label>
                    <input id="imageUpload" type="file" accept="image/*" className="hidden" />
                    <span className="text-base cursor-pointer font-semibold">{profile.first_name} {profile.last_name}</span>
                </div>


                <div>
                    <Button >
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className='mb-4'>
                <h2 className="text-xl font-semibold">Your Account</h2>
                <p className="text-sm text-gray-500">Manage your profile information.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <Input name="firstName" value={profile.first_name} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <Input name="lastName" value={profile.last_name} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Username</label>
                    <Input name="username" value={profile.username} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input name="email" type="email" value={profile.email} />
                </div>
            </div>
        </div>
    )

}


function DataTable() {
    return (
        <dcdiv></div>
    )

}
const OrdersTab: React.FC = () => {
    return (
        <div>
            My Orders
            <div>
                <DataTable />
            </div>
        </div>
    )
}
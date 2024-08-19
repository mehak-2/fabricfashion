import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import borderImage from '../../../dist/assets/border_img.jpg';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Fetch additional user info from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setFormData({
            name: user.displayName || '',
            email: user.email || '',
            phone: docSnap.data().phone || '',
            address: docSnap.data().address || '',
          });
        } else {
          setFormData({
            name: user.displayName || '',
            email: user.email || '',
            phone: '',
            address: '',
          });
        }
      } else {
        navigate('/login'); // Redirect if no user is authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Save updated user information
      const userUpdate = {
        displayName: formData.name,
        email: formData.email,
      };

      // Update user profile in Firebase
      await auth.currentUser.updateProfile(userUpdate);

      // Optionally update additional fields in Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, {
        phone: formData.phone,
        address: formData.address,
      }, { merge: true });

      setUser({
        ...user,
        ...userUpdate,
      });
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCheckOrders = () => {
    navigate('/order');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black w-full p-4">
      <div
        className="w-full max-w-4xl py-10"
        style={{
          backgroundImage: `url(${borderImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '50px',
          padding: '35px',
        }}
      >
        <div className="bg-white rounded-xl p-10">
          <h1 className="text-center text-black text-2xl mb-4 font-bold">Profile</h1>
          {user ? (
            <div className="text-center">
              <div className="mb-4">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                <span className="text-black text-xl text-left">Name</span>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span className="text-black border-2 border-black p-2 rounded w-full truncate">
                    {formData.name || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                <span className="text-black text-xl text-left">Email</span>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span className="text-black border-2 border-black p-2 rounded w-full truncate">
                    {formData.email || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                <span className="text-black text-xl text-left">Phone Number</span>
                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span className="text-black border-2 border-black p-2 rounded w-full truncate">
                    {formData.phone || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                <span className="text-black text-xl text-left">Address</span>
                {editing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span className="text-black border-2 border-black p-2 rounded w-full truncate">
                    {formData.address || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              {editing && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleSave}
                    className="text-white bg-black py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="text-center mt-4">
                <button
                  onClick={handleCheckOrders}
                  className="text-white bg-black py-2 px-4 rounded"
                >
                  Check Orders
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-white">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

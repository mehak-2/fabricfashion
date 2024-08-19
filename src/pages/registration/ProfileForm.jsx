import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig'; // Adjust the path according to your project structure
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './ProfileForm.css';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const storage = getStorage();
  const user = auth.currentUser; // Get the currently authenticated user

  // Ensure user is authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const userDocId = user.uid; // Use current user's UID

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user profile
      await updateProfile(auth.currentUser, { displayName: name });

      // Save file if selected
      if (file) {
        const fileRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser, { photoURL });
      }

      // Update additional user information in Firestore
      const userDocRef = doc(fireDB, 'users', userDocId);
      await setDoc(userDocRef, {
        phone: phoneNumber,
        address: address,
      }, { merge: true });

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-container bg-white">
      <form onSubmit={handleUpdateProfile} className="profile-form" style={{backgroundColor:"black"}}>
        <h2 className="form-title" style={{color: "white", fontSize: "30px"}}>Create Profile</h2>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
          
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder='enter name'
            style={{backgroundColor:"white", color: "black"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder='enter email'
            style={{backgroundColor:"white", color: "black"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
            placeholder='enter name'
            style={{backgroundColor:"white", color: "black"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input"
            placeholder='enter address'
            style={{backgroundColor:"white", color: "black"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Profile Picture:</label>
          <input type="file" onChange={handleFileChange} className="form-input" />
        </div>
        <button type="submit" className="submit-button" style={{color: "white"}} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;

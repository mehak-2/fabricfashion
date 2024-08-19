// // Profile.jsx

// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';
// import borderImage from '../../../dist/assets/border_img.jpg';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const auth = getAuth();
//   const db = getFirestore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);

//         // Fetch additional user info from Firestore
//         const userDocRef = doc(db, 'users', user.uid);
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//           setFormData({
//             name: user.displayName || '',
//             email: user.email || '',
//             phone: docSnap.data().phone || '',
//             address: docSnap.data().address || '',
//           });
//         } else {
//           setFormData({
//             name: user.displayName || '',
//             email: user.email || '',
//             phone: '',
//             address: '',
//           });
//         }
//       } else {
//         navigate('/login'); // Redirect if no user is authenticated
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, db, navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       // Save updated user information
//       const userUpdate = {
//         displayName: formData.name,
//         email: formData.email,
//       };

//       // Update user profile in Firebase
//       await auth.currentUser.updateProfile(userUpdate);

//       // Optionally update additional fields in Firestore
//       const userDocRef = doc(db, 'users', auth.currentUser.uid);
//       await setDoc(userDocRef, {
//         phone: formData.phone,
//         address: formData.address,
//       }, { merge: true });

//       setUser({
//         ...user,
//         ...userUpdate,
//       });
//       setEditing(false);
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     }
//   };

//   const handleCheckOrders = () => {
//     navigate('/order');
//   };

//   const containerStyle = {
//     display: 'grid',
//     gridTemplateColumns: '315px 1fr',
//     alignItems: 'center',
//     marginBottom: '12px',
//     justifyContent: 'start',
//   };

//   const borderStyle = {
//     border: "2px solid black",
//     padding: "2px",
//     borderRadius: "4px",
//     maxWidth: "200px",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   };

//   const iconStyle = {
//     marginLeft: "12px",
//     cursor: "pointer",
//   };

//   const buttonContainerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '40px',
//     marginTop: '50px',
//   };

//   const buttonStyle = {
//     border: "2px solid black",
//     borderRadius: "4px",
//     padding: "6px 20px",
//     backgroundColor: "white",
//     color: "black",
//     cursor: "pointer",
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black w-full">
//       <div
//         className="w-[800px] py-10"
//         style={{
//           backgroundImage: `url(${borderImage})`,
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           borderRadius: '50px',
//           padding: '35px',
//         }}
//       >
//         <div className="bg-white rounded-xl p-10">
//           <h1 className="text-center text-black text-2xl mb-4 font-bold">Profile</h1>
//           {user ? (
//             <div className="text-center">
//               <div className="mb-4">
//                 <img
//                   src={user.photoURL || 'https://via.placeholder.com/150'}
//                   alt="Profile"
//                   className="rounded-full w-32 h-32 object-cover mx-auto"
//                 />
//               </div>
//               <div style={containerStyle}>
//                 <span className="text-black text-xl">Name </span>
//                 {editing ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="border p-2 rounded"
//                   />
//                 ) : (
//                   <span style={borderStyle} className="text-black">
//                     {formData.name || 'Not provided'}
//                     <FontAwesomeIcon
//                       icon={faPen}
//                       style={iconStyle}
//                       onClick={() => setEditing(!editing)}
//                     />
//                   </span>
//                 )}
//               </div>
//               <div style={containerStyle}>
//                 <span className="text-black text-xl">Email </span>
//                 {editing ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="border p-2 rounded"
//                   />
//                 ) : (
//                   <span style={borderStyle} className="text-black">
//                     {formData.email || 'Not provided'}
//                     <FontAwesomeIcon
//                       icon={faPen}
//                       style={iconStyle}
//                       onClick={() => setEditing(!editing)}
//                     />
//                   </span>
//                 )}
//               </div>
//               <div style={containerStyle}>
//                 <span className="text-black text-xl">Phone Number </span>
//                 {editing ? (
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="border p-2 rounded"
//                   />
//                 ) : (
//                   <span style={borderStyle} className="text-black">
//                     {formData.phone || 'Not provided'}
//                     <FontAwesomeIcon
//                       icon={faPen}
//                       style={iconStyle}
//                       onClick={() => setEditing(!editing)}
//                     />
//                   </span>
//                 )}
//               </div>
//               <div style={containerStyle}>
//                 <span className="text-black text-xl">Address </span>
//                 {editing ? (
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="border p-2 rounded"
//                   />
//                 ) : (
//                   <span style={borderStyle} className="text-black">
//                     {formData.address || 'Not provided'}
//                     <FontAwesomeIcon
//                       icon={faPen}
//                       style={iconStyle}
//                       onClick={() => setEditing(!editing)}
//                     />
//                   </span>
//                 )}
//               </div>
//               {editing && (
//                 <button
//                   onClick={handleSave}
//                   style={{ ...buttonStyle, marginTop: '20px' }}
//                 >
//                   Save
//                 </button>
//               )}
//             </div>
//           ) : (
//             <p className="text-center text-black">Loading...</p>
//           )}
//           <div style={buttonContainerStyle}>
//             <button
//               style={buttonStyle}
//               onClick={handleCheckOrders}
//             >
//               Check Orders
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
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

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '315px 1fr',
    alignItems: 'center',
    marginBottom: '12px',
    justifyContent: 'start',
  };

  const borderStyle = {
    border: "2px solid black",
    padding: "2px",
    borderRadius: "4px",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const iconStyle = {
    marginLeft: "12px",
    cursor: "pointer",
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '50px',
  };

  const buttonStyle = {
    border: "2px solid black",
    borderRadius: "4px",
    padding: "6px 20px",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black w-full">
      <div
        className="w-[800px] py-10"
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
              <div style={containerStyle}>
                <span className="text-black text-xl">Name </span>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span style={borderStyle} className="text-black">
                    {formData.name || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      style={iconStyle}
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div style={containerStyle}>
                <span className="text-black text-xl">Email </span>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span style={borderStyle} className="text-black">
                    {formData.email || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      style={iconStyle}
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div style={containerStyle}>
                <span className="text-black text-xl">Phone Number </span>
                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span style={borderStyle} className="text-black">
                    {formData.phone || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      style={iconStyle}
                      onClick={() => setEditing(!editing)}
                    />
                  </span>
                )}
              </div>
              <div style={containerStyle}>
                <span className="text-black text-xl">Address </span>
                {editing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span style={borderStyle} className="text-black">
                    {formData.address || 'Not provided'}
                    <FontAwesomeIcon
                      icon={faPen}
                      style={iconStyle}
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

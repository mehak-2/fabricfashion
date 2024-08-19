import { fireDB } from '../../fireabase/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const fetchWishlist = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user')).user.uid;
    const wishlistRef = collection(fireDB, 'wishlist');
    const q = query(wishlistRef, where('userid', '==', userId));
    const querySnapshot = await getDocs(q);
    const wishlistItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return wishlistItems;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return []; // Return an empty array in case of an error
  }
};

// src/redux/wishlistActions.js
import { addToWishlist, removeFromWishlist, setWishlist } from './wishlistSlice';
import { fireDB } from '../fireabase/FirebaseConfig';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Fetch wishlist items from Firebase
export const fetchWishlist = (userId) => async (dispatch) => {
  try {
    const wishlistRef = collection(fireDB, 'wishlists', userId, 'items');
    const snapshot = await getDocs(wishlistRef);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setWishlist(items));
  } catch (error) {
    console.error("Error fetching wishlist: ", error);
  }
};

// Add item to wishlist in Firebase
export const addItemToWishlist = (userId, item) => async (dispatch) => {
  try {
    const wishlistRef = collection(fireDB, 'wishlists', userId, 'items');
    await addDoc(wishlistRef, item);
    dispatch(addToWishlist({ id: item.id, ...item }));
  } catch (error) {
    console.error("Error adding item to wishlist: ", error);
  }
};

// Remove item from wishlist in Firebase
export const removeItemFromWishlist = (userId, itemId) => async (dispatch) => {
  try {
    const itemRef = doc(fireDB, 'wishlists', userId, 'items', itemId);
    await deleteDoc(itemRef);
    dispatch(removeFromWishlist({ id: itemId }));
  } catch (error) {
    console.error("Error removing item from wishlist: ", error);
  }
};

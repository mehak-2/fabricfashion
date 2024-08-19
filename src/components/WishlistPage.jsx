// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWishlist, removeItemFromWishlist } from '../redux/wishlistActions';
// import { useAuth } from '../context/data/myContext';

// const WishlistPage = () => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector((state) => state.wishlist.items);
//   const { currentUser } = useAuth(); // Assuming this gives you the current logged-in user

//   useEffect(() => {
//     if (currentUser) {
//       console.log("Fetching wishlist for user:", currentUser.uid);
//       dispatch(fetchWishlist(currentUser.uid));
//     }
//   }, [dispatch, currentUser]);

//   const handleRemove = (itemId) => {
//     if (currentUser) {
//       dispatch(removeItemFromWishlist(currentUser.uid, itemId));
//     }
//   };
  

//   return (
//     <div>
//       <h1>Your Wishlist</h1>
//       <div>
//         {console.log("Wishlist Items:", wishlistItems)}
//         {wishlistItems.length > 0 ? (
//           wishlistItems.map((item) => (
//             <div key={item.id}>
//               <img src={item.imageUrl} alt={item.title} />
//               <h3>{item.title}</h3>
//               <p>{item.price}</p>
//               <button onClick={() => handleRemove(item.id)}>Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No items in wishlist</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeItemFromWishlist } from '../redux/wishlistActions';
import { useAuth } from '../context/data/myContext';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { currentUser } = useAuth(); // Assuming this gives you the current logged-in user

  useEffect(() => {
    if (currentUser) {
      console.log("Fetching wishlist for user:", currentUser.uid);
      dispatch(fetchWishlist(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const handleRemove = (itemId) => {
    if (currentUser) {
      dispatch(removeItemFromWishlist(currentUser.uid, itemId));
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      <div>
        {console.log("Wishlist Items:", wishlistItems)}
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id}>
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

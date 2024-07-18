

import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Css from './UserPage.module.css';
import { Link } from 'react-router-dom';

function UserPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cargoCode = user.email.split('@')[0];
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data());
        } else {
          console.log('No such user document!');
          setProfile(null);
        }

        const q = query(collection(db, 'products'), where('userId', '==', cargoCode));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } else {
        setProducts([]);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className={Css.Main}>
      <div className={Css.ProfileCard}>
        <div className={Css.ProfileContainer}>
          <div className={Css.Img}>
            <img className={Css.ProfilePicture} src="https://via.placeholder.com/150" alt="Profile" />
          </div>
          <div className={Css.Name}>
            <h1>Nuremir</h1>
            <h2>{profile.phone}</h2>
            <h2>{profile.cargoCode}</h2>

          </div>
        </div>
        <h3>@{profile.uid}</h3>
        <h3>@{profile.phone}</h3>
        <button>Edit Profile</button>
        <div className={Css.SocialLinks}>
          <span>🐦</span>
          <span>📸</span>
          <span>📘</span>
          <span>💼</span>
        </div>
        <p>Joined {profile.joined}</p>
      </div>
      <ul className={Css.ProductList}>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button className={Css.UpgradeButton}>Upgrade</button>
    </div>
  );
}

export default UserPage;


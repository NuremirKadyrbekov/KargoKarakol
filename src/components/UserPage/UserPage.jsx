import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function UserPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'products'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      }
    };

    fetchProducts();
  }, [auth.currentUser]);
  
  console.log(products)

  return (
    <div>
      <h1>UserPage</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;

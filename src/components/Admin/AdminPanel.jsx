// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, query, where, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const AdminPanel = () => {
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
//   const [newUserEmail, setNewUserEmail] = useState('');
//   const [newUserPassword, setNewUserPassword] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [productName, setProductName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAdminAuthenticated) {
//       signInWithEmailAndPassword(auth, '9999@dom.com', 'admin12')
//         .then(() => {
//           setIsAdminAuthenticated(true);
//         })
//         .catch(() => {  
//           setError('Ошибка при входе администратора.');
//         });
//     }
//   }, [isAdminAuthenticated]);

//   useEffect(() => {
//     if (isAdminAuthenticated) {
//       fetchUsersAndProducts();
//     }
//   }, [isAdminAuthenticated]);

//   const fetchUsersAndProducts = async () => {
//     try {
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       const usersData = await Promise.all(
//         usersSnapshot.docs.map(async (userDoc) => {
//           const user = userDoc.data();
//           const productsQuery = query(collection(db, 'products'), where('userId', '==', user.uid));
//           const productsSnapshot = await getDocs(productsQuery);
//           const products = productsSnapshot.docs.map((doc) => doc.data());
//           return { ...user, products };
//         })
//       );
//       setUsers(usersData);
//     } catch (error) {
//       console.error('Ошибка при получении пользователей и продуктов: ', error);
//       setError('Ошибка при получении пользователей и продуктов.');
//     }
//   };

//   const createNewUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
//       await setDoc(doc(db, 'users', newUserEmail), {
//         email: newUserEmail,
//         uid: userCredential.user.uid,
//       });
//       setNewUserEmail('');
//       setNewUserPassword('');
//       setError('');
//       fetchUsersAndProducts();
//     } catch (error) {
//       console.error('Ошибка при создании пользователя: ', error);
//       setError('Ошибка при создании пользователя.');
//     }
//   };

//   const addProductToUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
//       const querySnapshot = await getDocs(userQuery);

//       if (querySnapshot.empty) {
//         setError('Пользователь с таким email не найден.');
//         return;
//       }

//       const userDoc = querySnapshot.docs[0];
//       const userId = userDoc.data().uid;

//       await addDoc(collection(db, 'products'), {
//         name: productName,
//         userId: userId,
//       });

//       setUserEmail('');
//       setProductName('');
//       setError('');
//       fetchUsersAndProducts();
//     } catch (error) {
//       console.error('Ошибка при добавлении продукта: ', error);
//       setError('Ошибка при добавлении продукта.');
//     }
//   };

//   if (!isAdminAuthenticated) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>AdminPanel</h1>
//       <div>
//         <h2>Создать нового пользователя</h2>
//         <form onSubmit={createNewUser}>
//           <input
//             type="email"
//             value={newUserEmail}
//             placeholder="Email нового пользователя"
//             onChange={(e) => setNewUserEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             value={newUserPassword}
//             placeholder="Пароль нового пользователя"
//             onChange={(e) => setNewUserPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Создать пользователя</button>
//         </form>
//       </div>
//       <div>
//         <h2>Добавить продукт пользователю</h2>
//         <form onSubmit={addProductToUser}>
//           <input
//             type="email"
//             value={userEmail}
//             placeholder="Email пользователя"
//             onChange={(e) => setUserEmail(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             value={productName}
//             placeholder="Название продукта"
//             onChange={(e) => setProductName(e.target.value)}
//             required
//           />
//           <button type="submit">Добавить продукт</button>
//         </form>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//       <div>
//         <h2>Список пользователей и их продукты</h2>
//         <ul>
//           {users.map((user) => (
//             <li key={user.uid}>
//               <h3>{user.email}</h3>
//               <ul>
//                 {user.products.map((product, index) => (
//                   <li key={index}>{product.name}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;





// #1







// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const AdminPanel = () => {
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
//   const [newUserCargoCode, setNewUserCargoCode] = useState('');
//   const [newUserPassword, setNewUserPassword] = useState('');
//   const [userCargoCode, setUserCargoCode] = useState('');
//   const [productName, setProductName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAdminAuthenticated) {
//       signInWithEmailAndPassword(auth, 'admin@example.com', 'nuremir12')
//         .then(() => {
//           setIsAdminAuthenticated(true);
//         })
//         .catch(() => {  
//           setError('Ошибка при входе администратора.');
//         });
//     }
//   }, [isAdminAuthenticated]);

//   useEffect(() => {
//     if (isAdminAuthenticated) {
//       fetchUsersAndProducts();
//     }
//   }, [isAdminAuthenticated]);

//   const fetchUsersAndProducts = async () => {
//     try {
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       const usersData = await Promise.all(
//         usersSnapshot.docs.map(async (userDoc) => {
//           const user = userDoc.data();
//           const productsQuery = query(collection(db, 'products'), where('userId', '==', user.cargoCode));
//           const productsSnapshot = await getDocs(productsQuery);
//           const products = productsSnapshot.docs.map((doc) => doc.data());
//           return { ...user, products };
//         })
//       );
//       setUsers(usersData);
//     } catch (error) {
//       console.error('Ошибка при получении пользователей и продуктов: ', error);
//       setError('Ошибка при получении пользователей и продуктов.');
//     }
//   };

//   const createNewUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, `${newUserCargoCode}@example.com`, newUserPassword);
//       await setDoc(doc(db, 'users', newUserCargoCode), {
//         cargoCode: newUserCargoCode,
//         uid: userCredential.user.uid,
//       });
//       setNewUserCargoCode('');
//       setNewUserPassword('');
//       setError('');
//       fetchUsersAndProducts();
//     } catch (error) {
//       console.error('Ошибка при создании пользователя: ', error);
//       setError('Ошибка при создании пользователя.');
//     }
//   };

//   const addProductToUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userQuery = query(collection(db, 'users'), where('cargoCode', '==', userCargoCode));
//       const querySnapshot = await getDocs(userQuery);

//       if (querySnapshot.empty) {
//         setError('Пользователь с таким кодом карго не найден.');
//         return;
//       }

//       const userDoc = querySnapshot.docs[0];
//       const userId = userDoc.data().uid;

//       await addDoc(collection(db, 'products'), {
//         name: productName,
//         userId: userCargoCode,
//       });

//       setUserCargoCode('');
//       setProductName('');
//       setError('');
//       fetchUsersAndProducts();
//     } catch (error) {
//       console.error('Ошибка при добавлении продукта: ', error);
//       setError('Ошибка при добавлении продукта.');
//     }
//   };

//   if (!isAdminAuthenticated) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>AdminPanel</h1>
//       <div>
//         <h2>Создать нового пользователя</h2>
//         <form onSubmit={createNewUser}>
//           <input
//             type="text"
//             value={newUserCargoCode}
//             placeholder="Код карго нового пользователя"
//             onChange={(e) => setNewUserCargoCode(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             value={newUserPassword}
//             placeholder="Пароль нового пользователя"
//             onChange={(e) => setNewUserPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Создать пользователя</button>
//         </form>
//       </div>
//       <div>
//         <h2>Добавить продукт пользователю</h2>
//         <form onSubmit={addProductToUser}>
//           <input
//             type="text"
//             value={userCargoCode}
//             placeholder="Код карго пользователя"
//             onChange={(e) => setUserCargoCode(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             value={productName}
//             placeholder="Название продукта"
//             onChange={(e) => setProductName(e.target.value)}
//             required
//           />
//           <button type="submit">Добавить продукт</button>
//         </form>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//       <div>
//         <h2>Список пользователей и их продукты</h2>
//         <ul>
//           {users.map((user) => (
//             <li key={user.cargoCode}>
//               <h3>{user.cargoCode}</h3>
//               <ul>
//                 {user.products.map((product, index) => (
//                   <li key={index}>{product.name}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;




import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Установим начальное значение false
  const [newUserCargoCode, setNewUserCargoCode] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [userCargoCode, setUserCargoCode] = useState('');
  const [productName, setProductName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed. Current user:', user);
      if (user) {
        checkAdmin(user);
      } else {
        navigate('/admin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const checkAdmin = async (user) => {
    console.log('Checking admin for user:', user);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log('User document:', userDoc.data());
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('isAdmin', 'true');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Ошибка при проверке роли администратора:', error);
      navigate('/admin');
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchUsersAndProducts();
    }
  }, [isAdminAuthenticated]);

  const fetchUsersAndProducts = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const user = userDoc.data();
          const productsQuery = query(collection(db, 'products'), where('userId', '==', user.cargoCode));
          const productsSnapshot = await getDocs(productsQuery);
          const products = productsSnapshot.docs.map((doc) => doc.data());
          return { ...user, products };
        })
      );
      setUsers(usersData);
    } catch (error) {
      console.error('Ошибка при получении пользователей и продуктов: ', error);
      setError('Ошибка при получении пользователей и продуктов.');
    }
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${newUserCargoCode}@example.com`, newUserPassword);
      await setDoc(doc(db, 'users', newUserCargoCode), {
        cargoCode: newUserCargoCode,
        uid: userCredential.user.uid,
        role: newUserRole,
      });
      setNewUserCargoCode('');
      setNewUserPassword('');
      setNewUserRole('user');
      setError('');
      fetchUsersAndProducts();
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      setError('Ошибка при создании пользователя.');
    }
  };

  const addProductToUser = async (e) => {
    e.preventDefault();
    try {
      const userQuery = query(collection(db, 'users'), where('cargoCode', '==', userCargoCode));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setError('Пользователь с таким кодом карго не найден.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.data().uid;

      await addDoc(collection(db, 'products'), {
        name: productName,
        userId: userCargoCode,
      });

      setUserCargoCode('');
      setProductName('');
      setError('');
      fetchUsersAndProducts();
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      setError('Ошибка при добавлении продукта.');
    }
  };

  if (isAdminAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>AdminPanel</h1>
      <div>
        <h2>Создать нового пользователя</h2>
        <form onSubmit={createNewUser}>
          <input
            type="text"
            value={newUserCargoCode}
            placeholder="Код карго нового пользователя"
            onChange={(e) => setNewUserCargoCode(e.target.value)}
            required
          />
          <input
            type="password"
            value={newUserPassword}
            placeholder="Пароль нового пользователя"
            onChange={(e) => setNewUserPassword(e.target.value)}
            required
          />
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            required
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
          <button type="submit">Создать пользователя</button>
        </form>
      </div>
      <div>
        <h2>Добавить продукт пользователю</h2>
        <form onSubmit={addProductToUser}>
          <input
            type="text"
            value={userCargoCode}
            placeholder="Код карго пользователя"
            onChange={(e) => setUserCargoCode(e.target.value)}
            required
          />
          <input
            type="text"
            value={productName}
            placeholder="Название продукта"
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <button type="submit">Добавить продукт</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <h2>Список пользователей и их продукты</h2>
        <ul>
          {users.map((user) => (
            <li key={user.cargoCode}>
              <h3>{user.cargoCode}</h3>
              <ul>
                {user.products.map((product, index) => (
                  <li key={index}>{product.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;


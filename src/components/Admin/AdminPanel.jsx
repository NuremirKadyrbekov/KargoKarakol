import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,setPersistence, browserLocalPersistence, } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Css from './Admin.module.css';
import LoadingSVG from '../../assets/loading2.svg';
import { HandySvg } from 'handy-svg';

const AdminPanel = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newUserCargoCode, setNewUserCargoCode] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [userCargoCode, setUserCargoCode] = useState('');
  const [productName, setProductName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdmin(user);
      } else {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          checkAdmin(storedUser);
        } else {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const checkAdmin = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().cargoCode === '0') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAdmin', 'true');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка при проверке роли администратора:', error);
      navigate('/');
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
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        cargoCode: newUserCargoCode,
        uid: userCredential.user.uid,
        role: 'user',
      });
  
      setNewUserCargoCode('');
      setNewUserPassword('');
      setError('');
  
      // Восстановление аутентификации администратора из localStorage
      const currentAdmin = JSON.parse(localStorage.getItem('user'));
      if (currentAdmin) {
        await setPersistence(auth, browserLocalPersistence); // Устанавливаем локальное хранение состояния аутентификации
        await signInWithEmailAndPassword(auth, currentAdmin.email, currentAdmin.password);
      }
  
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

  if (!isAdminAuthenticated) {
    return <div className={Css.MainLoading}><HandySvg className={Css.Loading} src={LoadingSVG} />Подождите, идёт проверка</div>;
  }

  return (
    <div className={Css.Main}>
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

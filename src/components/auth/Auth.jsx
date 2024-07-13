import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';  // добавим db для проверки роли
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // добавим нужные функции
import Css from './auth.module.css'


function Auth({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setError('Ошибка: пользователь не найден.');
        return;
      }

      setEmail('');
      setPassword('');
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);

      const isAdmin = email === 'admin@gmail.com';
      localStorage.setItem('isAdmin', isAdmin);

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/UserPage');
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem('isAuthenticated', 'false');
      setError('Такого аккаунта не существует. Напишите карго и попросите пароль и логин.');
    }
  };

  return (
    <div className={Css.Main}>
      <div className={Css.AuthBlock}>
        <h1> кирүү</h1>
          <form onSubmit={Login}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Текшерүү</button>
          </form>
          {error && <p className={Css.error}>{error}</p>}
        </div>
    </div>
  );
}

export default Auth;

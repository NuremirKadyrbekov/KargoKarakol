// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import Css from './auth.module.css';

// function Auth({ setIsAuthenticated }) {
//   const [cargoCode, setCargoCode] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const Login = async (e) => {
//     e.preventDefault();
//     try {
//       const email = `${cargoCode}@example.com`;  // Используем карго-код как часть email
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const userDocRef = doc(db, 'users', userCredential.user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         setError('Ошибка: пользователь не найден.');
//         return;
//       }

//       const userData = userDoc.data();
//       const isAdmin = userData.cargoCode === '2001';  // Админ с карго-кодом 2001

//       setCargoCode('');
//       setPassword('');
//       setIsAuthenticated(true);

//       localStorage.setItem('user', JSON.stringify(userCredential.user));
//       if (isAdmin) {
//         localStorage.setItem('isAdmin', 'true');
//         navigate('/admin');
//       } else {
//         localStorage.removeItem('isAdmin');
//         navigate('/userpage');
//       }
//     } catch (error) {
//       console.log(error);
//       setError('Такого аккаунта не существует. Проверьте правильность ввода карго кода и пароля.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <div className={Css.AuthBlock}>
//         <h1> Вход</h1>
//         <form onSubmit={Login}>
//           <input
//             type="text"
//             value={cargoCode}
//             placeholder="Код карго"
//             onChange={(e) => setCargoCode(e.target.value)}
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Войти</button>
//         </form>
//         {error && <p className={Css.error}>{error}</p>}
//         <button onClick={() => navigate('/register')}>Создать карго аккаунт</button>
//       </div>
//     </div>
//   );
// }

// export default Auth;

// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import Css from './auth.module.css';

// function Auth({ setIsAuthenticated }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const Login = async (e) => {
//     e.preventDefault();
//     try {
//       const email = `${phone}@example.com`; // Используем номер телефона как часть email
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const userDocRef = doc(db, 'users', userCredential.user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         setError('Ошибка: пользователь не найден.');
//         return;
//       }

//       const userData = userDoc.data();
//       const isAdmin = userData.cargoCode === '1234'; // Админ с карго-кодом 2001

//       setPhone('');
//       setPassword('');
//       setIsAuthenticated(true);

//       localStorage.setItem('user', JSON.stringify(userCredential.user));
//       if (isAdmin) {
//         localStorage.setItem('isAdmin', 'true');
//         navigate('/admin');
//       } else {
//         localStorage.removeItem('isAdmin');
//         navigate('/userpage');
//       }
//     } catch (error) {
//       console.log(error);
//       setError('Такого аккаунта не существует. Проверьте правильность ввода номера телефона и пароля.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <div className={Css.AuthBlock}>
//         <h1> Вход</h1>
//         <form onSubmit={Login}>
//           <input
//             type="text"
//             value={phone}
//             placeholder="Телефон"
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Войти</button>
//         </form>
//         {error && <p className={Css.error}>{error}</p>}
//         <button onClick={() => navigate('/register')}>Создать аккаунт</button>
//       </div>
//     </div>
//   );
// }

// export default Auth;


// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import Css from './auth.module.css';

// function Auth({ setIsAuthenticated }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const Login = async (e) => {
//     e.preventDefault();
//     try {
//       const email = `${phone}@example.com`; // Используем номер телефона как часть email
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const userDocRef = doc(db, 'users', userCredential.user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         setError('Ошибка: пользователь не найден.');
//         return;
//       }

//       const userData = userDoc.data();
//       const isAdmin = userData.cargoCode === '1234'; // Админ с карго-кодом 2001

//       setPhone('');
//       setPassword('');
//       setIsAuthenticated(true);

//       localStorage.setItem('user', JSON.stringify(userCredential.user));
//       if (isAdmin) {
//         localStorage.setItem('isAdmin', 'true');
//         navigate('/admin');
//       } else {
//         localStorage.removeItem('isAdmin');
//         navigate('/userpage');
//       }
//     } catch (error) {
//       console.log(error);
//       setError('Такого аккаунта не существует. Проверьте правильность ввода номера телефона и пароля.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <div className={Css.AuthBlock}>
//         <h1> Вход</h1>
//         <form onSubmit={Login}>
//           <input
//             type="text"
//             value={phone}
//             placeholder="Телефон"
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Войти</button>
//         </form>
//         {error && <p className={Css.error}>{error}</p>}
//         <button onClick={() => navigate('/register')}>Создать аккаунт</button>
//       </div>
//     </div>
//   );
// }

// export default Auth;


// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import Css from './auth.module.css';

// function Auth({ setIsAuthenticated }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const Login = async (e) => {
//     e.preventDefault();
//     try {
//       const email = `${phone}@example.com`; // Используем номер телефона как часть email
//       console.log(`Email used for authentication: ${email}`);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const userDocRef = doc(db, 'users', userCredential.user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         setError('Ошибка: пользователь не найден.');
//         return;
//       }

//       const userData = userDoc.data();
//       const isAdmin = userData.cargoCode === '2001'; // Админ с карго-кодом 2001

//       setPhone('');
//       setPassword('');
//       setIsAuthenticated(true);

//       localStorage.setItem('user', JSON.stringify(userCredential.user));
//       if (isAdmin) {
//         localStorage.setItem('isAdmin', 'true');
//         navigate('/admin');
//       } else {
//         localStorage.removeItem('isAdmin');
//         navigate('/userpage');
//       }
//     } catch (error) {
//       console.log(error);
//       setError('Такого аккаунта не существует. Проверьте правильность ввода номера телефона и пароля.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <div className={Css.AuthBlock}>
//         <h1> Вход</h1>
//         <form onSubmit={Login}>
//           <input
//             type="text"
//             value={phone}
//             placeholder="Телефон"
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Войти</button>
//         </form>
//         {error && <p className={Css.error}>{error}</p>}
//         <button onClick={() => navigate('/register')}>Создать аккаунт</button>
//       </div>
//     </div>
//   );
// }

// export default Auth;



import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import Css from './auth.module.css';

function Auth({ setIsAuthenticated }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const email = `${phone}@example.com`; // Используем номер телефона как часть email
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setError('Ошибка: пользователь не найден.');
        return;
      }

      const userData = userDoc.data();
      const isAdmin = userData.cargoCode === '2001'; // Админ с карго-кодом 2001

      setPhone('');
      setPassword('');
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(userCredential.user));
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        localStorage.removeItem('isAdmin');
        navigate('/userpage');
      }
    } catch (error) {
      console.log(error);
      setError('Такого аккаунта не существует. Проверьте правильность ввода номера телефона и пароля.');
    }
  };

  return (
    <div className={Css.Main}>
      <div className={Css.AuthBlock}>
        <h1>КИРҮҮ</h1>
        <form onSubmit={Login}>
          <input
            type="text"
            value={phone}
            placeholder="Телефон номериниз"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">КИРҮҮ</button>
        </form>
        {error && <p className={Css.error}>{error}</p>}
        <button onClick={() => navigate('/register')} className={Css.newAccBtn}>Жаңы аккаунт</button>
      </div>
    </div>
  );
}

export default Auth;

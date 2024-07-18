// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Получение последнего карго-кода и определение нового
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       const lastCargoCode = usersSnapshot.docs.length;
//       const newCargoCode = lastCargoCode + 1;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Добавление пользователя в Firestore
//       await addDoc(collection(db, 'users'), {
//         cargoCode: newCargoCode.toString(),
//         uid: user.uid,
//         email: email,
//         phone: phone,
//         role: 'user',
//       });

//       // Установка карго кода в state для отображения на экране
//       setCargoCode(newCargoCode.toString());

//       setEmail('');
//       setPassword('');
//       setPhone('');
//       setError('');

//       // Задержка перед перенаправлением на главную страницу
//       setTimeout(() => {
//         navigate('/');
//       }, 5000); // Задержка на 5 секунд

//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={phone}
//           placeholder="Phone"
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {cargoCode && <p>Карго код: {cargoCode}</p>} {/* Отображение карго кода */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Получение последнего карго-кода и определение нового
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       const lastCargoCode = usersSnapshot.docs.length;
//       const newCargoCode = lastCargoCode + 1;

//       // Формирование email из номера телефона
//       const phoneEmail = `${phone}@example.com`;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
//       const user = userCredential.user;

//       // Добавление пользователя в Firestore
//       await addDoc(collection(db, 'users'), {
//         cargoCode: newCargoCode.toString(),
//         uid: user.uid,
//         email: phoneEmail,
//         phone: phone,
//         role: 'user',
//       });

//       // Установка карго кода в state для отображения на экране
//       setCargoCode(newCargoCode.toString());

//       setEmail('');
//       setPassword('');
//       setPhone('');
//       setError('');

//       // Задержка перед перенаправлением на главную страницу
//       setTimeout(() => {
//         navigate('/');
//       }, 5000); // Задержка на 5 секунд

//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={phone}
//           placeholder="Phone"
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {cargoCode && <p>Карго код: {cargoCode}</p>} {/* Отображение карго кода */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Получение последнего карго-кода и определение нового
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       const lastCargoCode = usersSnapshot.docs.length;
//       const newCargoCode = lastCargoCode + 1;

//       // Формирование email из номера телефона
//       const phoneEmail = `${phone}@example.com`;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
//       const user = userCredential.user;

//       // Добавление пользователя в Firestore
//       await addDoc(collection(db, 'users'), {
//         cargoCode: newCargoCode.toString(),
//         uid: user.uid,
//         email: phoneEmail,
//         phone: phone,
//         role: 'user',
//       });

//       // Установка карго кода в state для отображения на экране
//       setCargoCode(newCargoCode.toString());

//       setEmail('');
//       setPassword('');
//       setPhone('');
//       setError('');

//       // Задержка перед перенаправлением на главную страницу
//       setTimeout(() => {
//         navigate('/');
//       }, 5000); // Задержка на 5 секунд

//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={phone}
//           placeholder="Phone"
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {cargoCode && <p>Карго код: {cargoCode}</p>} {/* Отображение карго кода */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Register;


// import React, { useState, useEffect } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
//   const [error, setError] = useState('');
//   const [lastCargoCode, setLastCargoCode] = useState(2000);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLastCargoCode = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(db, 'users'));
//         let maxCargoCode = 2000; // Начальная точка отсчета
//         usersSnapshot.forEach((doc) => {
//           const userCargoCode = parseInt(doc.data().cargoCode, 10);
//           if (userCargoCode > maxCargoCode) {
//             maxCargoCode = userCargoCode;
//           }
//         });
//         setLastCargoCode(maxCargoCode);
//       } catch (error) {
//         console.error('Ошибка при получении последнего карго кода:', error);
//       }
//     };

//     fetchLastCargoCode();
//   }, []);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Получение нового карго кода
//       const newCargoCode = lastCargoCode + 1;

//       // Формирование email из номера телефона
//       const phoneEmail = `${phone}@example.com`;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
//       const user = userCredential.user;

//       // Добавление пользователя в Firestore
//       await addDoc(collection(db, 'users'), {
//         cargoCode: newCargoCode.toString(),
//         uid: userCredential.user.uid,
//         email: phoneEmail,
//         phone: phone,
//         role: 'user',
//       });

//       // Установка карго кода в state для отображения на экране
//       setCargoCode(newCargoCode.toString());

//       setEmail('');
//       setPassword('');
//       setPhone('');
//       setError('');

//       // Задержка перед перенаправлением на главную страницу
//       setTimeout(() => {
//         navigate('/');
//       }, 5000); // Задержка на 5 секунд

//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={phone}
//           placeholder="Phone"
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {cargoCode && <p>Карго код: {cargoCode}</p>} {/* Отображение карго кода */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Register;


// import React, { useState, useEffect } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
//   const [error, setError] = useState('');
//   const [lastCargoCode, setLastCargoCode] = useState(2000);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLastCargoCode = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(db, 'users'));
//         let maxCargoCode = 2000; // Начальная точка отсчета
//         usersSnapshot.forEach((doc) => {
//           const userCargoCode = parseInt(doc.data().cargoCode, 10);
//           if (userCargoCode > maxCargoCode) {
//             maxCargoCode = userCargoCode;
//           }
//         });
//         setLastCargoCode(maxCargoCode);
//       } catch (error) {
//         console.error('Ошибка при получении последнего карго кода:', error);
//       }
//     };

//     fetchLastCargoCode();
//   }, []);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Получение нового карго кода
//       const newCargoCode = lastCargoCode + 1;

//       // Формирование email из номера телефона
//       const phoneEmail = `${phone}@example.com`;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
//       const user = userCredential.user;

//       // Добавление пользователя в Firestore с использованием UID
//       await setDoc(doc(db, 'users', user.uid), {
//         cargoCode: newCargoCode.toString(),
//         uid: user.uid,
//         email: phoneEmail,
//         phone: phone,
//         role: 'user',
//       });

//       // Установка карго кода в state для отображения на экране
//       setCargoCode(newCargoCode.toString());

//       setEmail('');
//       setPassword('');
//       setPhone('');
//       setError('');

//       // Задержка перед перенаправлением на главную страницу
//       setTimeout(() => {
//         navigate('/');
//       }, 5000); // Задержка на 5 секунд

//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//     }
//   };

//   return (
//     <div className={Css.Main}>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={phone}
//           placeholder="Phone"
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {cargoCode && <p>Карго код: {cargoCode}</p>} {/* Отображение карго кода */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'; // Импортируем необходимые функции из firebase/firestore
import { useNavigate } from 'react-router-dom';
import Css from './register.module.css';
import ButtonBack from './ButtonBack';


const Register = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone, setPhone] = useState('');
  const [cargoCode, setCargoCode] = useState(''); // State для хранения карго кода
  const [error, setError] = useState('');
  const [lastCargoCode, setLastCargoCode] = useState(2000);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastCargoCode = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users')); // Используем функцию collection
        let maxCargoCode = 2000; // Начальная точка отсчета
        usersSnapshot.forEach((doc) => {
          const userCargoCode = parseInt(doc.data().cargoCode, 10);
          if (userCargoCode > maxCargoCode) {
            maxCargoCode = userCargoCode;
          }
        });
        setLastCargoCode(maxCargoCode);
      } catch (error) {
        console.error('Ошибка при получении последнего карго кода:', error);
      }
    };

    fetchLastCargoCode();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Получение нового карго кода
      const newCargoCode = lastCargoCode + 1;

      // Формирование email из номера телефона
      const phoneEmail = `${phone}@example.com`;

      // Регистрация пользователя с использованием электронной почты и пароля
      const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
      const user = userCredential.user;

      // Добавление пользователя в Firestore с использованием UID
      await setDoc(doc(db, 'users', user.uid), {
        cargoCode: newCargoCode.toString(),
        uid: user.uid,
        email: phoneEmail,
        phone: phone,
        role: 'user',
        name:name,
        lastName:last_name,
        password:password,  
      });

      // Установка карго кода в state для отображения на экране
      setCargoCode(newCargoCode.toString());

      setPassword('');
      setPhone('');
      setError('');
      setName('')
      setLastName('')
      // Задержка перед перенаправлением на главную страницу
 
      setIsActive(true)

      
      setTimeout(() => {
        navigate('/');

      }, 60000); // Задержка на 10 секунд

    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      setError('Ошибка при регистрации пользователя.');
      setIsActive(false)
      seconds(60)
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return (
   
    <div className={Css.Main}>
      
      <div className={Css.AuthBlock}>
        <h1>Жаңы аккаунт ачуу</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            placeholder="Атыныз"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={last_name}
            placeholder="Фамилияныз"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Жаны пароль түзүнүз"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            value={phone}
            placeholder="Телефон номериниз: 0777123456"
            pattern="[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">ЖАСОО</button>
        </form>
        {error && <p className={Css.error}>{error}</p>}
        { cargoCode && <div className={Css.Succes}> <p> Аккаунт ийгиликтүү ачылды
        <br />  Карго код: <span className={Css.cargoCode}>{cargoCode}</span> </p></div>
        } {/* Отображение карго кода */}
        { cargoCode && <p>Бул бет жабылат: <span> </span>
        {seconds}</p>}
        {error && <p style={{ color: 'red' }}>{error}Ката чыкты, башка номер жазып корүңүз</p>}
        <ButtonBack props='/'/>
      </div> 
    </div>
  );
};

export default Register;

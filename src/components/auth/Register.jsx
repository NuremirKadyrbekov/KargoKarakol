// import React, { useState, useEffect } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../firebase';
// import { doc, setDoc, runTransaction, collection, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Css from './register.module.css';
// import ButtonBack from './ButtonBack';

// const Register = () => {
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [cargoCode, setCargoCode] = useState('');
//   const [error, setError] = useState('');
//   const [seconds, setSeconds] = useState(10);
//   const [isActive, setIsActive] = useState(false);

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Формирование email из номера телефона
//       const phoneEmail = `${phone}@example.com`;

//       // Регистрация пользователя с использованием электронной почты и пароля
//       const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
//       const user = userCredential.user;

//       await runTransaction(db, async (transaction) => {
//         const usersRef = collection(db, 'users');
//         const usersSnapshot = await getDocs(usersRef);
//         let maxCargoCode = 2000;

//         usersSnapshot.forEach((doc) => {
//           const userCargoCode = parseInt(doc.data().cargoCode, 10);
//           if (userCargoCode > maxCargoCode) {
//             maxCargoCode = userCargoCode;
//           }
//         });

//         const newCargoCode = maxCargoCode + 1;
//         const userDocRef = doc(db, 'users', user.uid);
//         transaction.set(userDocRef, {
//           cargoCode: newCargoCode.toString(),
//           uid: user.uid,
//           email: phoneEmail,
//           phone: phone,
//           role: 'user',
//           name: name,
//           lastName: last_name,
//           password: password,
//         });

//         setCargoCode(newCargoCode.toString());
//       });

//       setPassword('');
//       setPhone('');
//       setError('');
//       setName('');
//       setLastName('');
//       setIsActive(true);


//     } catch (error) {
//       console.error('Ошибка при регистрации пользователя:', error);
//       setError('Ошибка при регистрации пользователя.');
//       setIsActive(false);
//       setSeconds(10);
//     }
//   };

//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds((seconds) => seconds - 1);
//         if (seconds == 0) {
//           navigate('/')
//           setIsActive(false)
//         }
//       }, 1000);

//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, seconds]);


//   function GoBack() {
//     navigate('/')
//     setIsActive(false)
//     setSeconds(60)
//   }
//   return (
//     <div className={Css.Main}>
//       <div className={Css.AuthBlock}>
//         <h1>Жаңы аккаунт ачуу</h1>
//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             value={name}
//             placeholder="Атыныз"
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             value={last_name}
//             placeholder="Фамилияныз"
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             // pattern="[a-z,0-9]"
//             value={password}
//             placeholder="Жаны пароль түзүнүз"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             value={phone}
//             placeholder="Телефон номериниз: 0777123456"
//             pattern="[0-9]{10}"
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <button type='submit' >ЖАСОО</button>
//         </form>
//         {error && <p className={Css.error}>{error}</p>}
//         {cargoCode && (
//           <div className={Css.Succes}>
//             <p>
//               Аккаунт ийгиликтүү ачылды
//               <br /> Карго код: <span className={Css.cargoCode}>{cargoCode}</span>
//             </p>
//           </div>
//         )}
//         {cargoCode && <p>Бул бет жабылат: <span>{seconds}</span></p>}
//         {error && <p style={{ color: 'red' }}>{error}Ката чыкты, башка номер жазып корүңүз</p>}
//         <ButtonBack GoBackChange={GoBack} />
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, runTransaction, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Css from './register.module.css';
import ButtonBack from './ButtonBack';
import LoadingSVG from '../../assets/loading2.svg';
import { HandySvg } from 'handy-svg';

const Register = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [cargoCode, setCargoCode] = useState('');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const delay = Math.floor(Math.random() * 6) + 5; // Случайная задержка от 5 до 10 секунд
      setIsLoading(true); // Включить анимацию загрузки
      await new Promise(resolve => setTimeout(resolve, delay * 1000));

      // Формирование email из номера телефона
      const phoneEmail = `${phone}@example.com`;

      // Регистрация пользователя с использованием электронной почты и пароля
      const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
      const user = userCredential.user;

      await runTransaction(db, async (transaction) => {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        let maxCargoCode = 2000;

        usersSnapshot.forEach((doc) => {
          const userCargoCode = parseInt(doc.data().cargoCode, 10);
          if (userCargoCode > maxCargoCode) {
            maxCargoCode = userCargoCode;
          }
        });

        const newCargoCode = maxCargoCode + 1;
        const userDocRef = doc(db, 'users', user.uid);
        transaction.set(userDocRef, {
          cargoCode: newCargoCode.toString(),
          uid: user.uid,
          email: phoneEmail,
          phone: phone,
          role: 'user',
          name: name,
          lastName: last_name,
          password: password,
        });

        setCargoCode(newCargoCode.toString());
        setIsLoading(false); // Выключить анимацию загрузки после завершения транзакции
      });

      setPassword('');
      setPhone('');
      setError('');
      setName('');
      setLastName('');
      setIsActive(true);

    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      setError('Ошибка при регистрации пользователя.');
      setIsLoading(false); // Выключить анимацию загрузки при ошибке
      setIsActive(false);
      setSeconds(10);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (seconds === 0) {
          navigate('/');
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function GoBack() {
    navigate('/');
    setIsActive(false);
    setSeconds(60);
  }

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
         {cargoCode ? null : <button type='submit'>ЖАСОО</button>} 
        </form>
        {isLoading && <div className={Css.Loader}  style={{width:50}}><HandySvg  style={{width:50}} src={LoadingSVG} /></div>}
        {error && <p className={Css.error}>{error}</p>}
        {cargoCode && (
          <div className={Css.Succes}>
            <p>
              Аккаунт ийгиликтүү ачылды
              <br /> Карго код: <span className={Css.cargoCode}>{cargoCode}</span>
            </p>
          </div>
        )}
        {cargoCode && <p>Бул бет жабылат: <span>{seconds}</span></p>}
        {error && <p style={{ color: 'red' }}>{error}Ката чыкты, башка номер жазып корүңүз</p>}
        <ButtonBack GoBackChange={GoBack} />
      </div>
    </div>
  );
};

export default Register;

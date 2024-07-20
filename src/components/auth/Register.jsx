import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, runTransaction } from 'firebase/firestore';
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const phoneEmail = `${phone}@example.com`;

      // Регистрация пользователя с использованием электронной почты и пароля
      const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
      const user = userCredential.user;

      await runTransaction(db, async (transaction) => {
        const counterRef = doc(db, 'metadata', 'cargoCodeCounter');
        const counterDoc = await transaction.get(counterRef);
        
        if (!counterDoc.exists) {
          throw new Error('Счётчик карго кодов не найден');
        }

        const newCargoCode = counterDoc.data().counter + 1;
        transaction.update(counterRef, { counter: newCargoCode });

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
      });

      setPassword('');
      setPhone('');
      setError('');
      setName('');
      setLastName('');
      setIsActive(true);
      setIsLoading(false);

    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      setError('Ошибка при регистрации пользователя.');
      setIsLoading(false);
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
        {isLoading && <div className={Css.Loader} style={{ width: 50 }}><HandySvg style={{ width: 50 }} src={LoadingSVG} /></div>}
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


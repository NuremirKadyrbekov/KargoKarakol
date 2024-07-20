

import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Css-UserPage/demo.css'
import './Css-UserPage/style.css'
import { HandySvg } from 'handy-svg';
import LoadingSVG from '../../assets/loading2.svg';
import ButtonBack from '../auth/ButtonBack';
import { Navigate, useNavigate } from 'react-router';



function UserPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate()

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
    return <div className='MainLoading'><HandySvg className='Loading' src={LoadingSVG} />Подождите, идёт проверка</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (

    <div>

      <main className="cd__main">
        <div className="profile-page">
          <div className="content">
            <div className="content__cover">
              <div className="content__avatar" />
              <div className="content__bull"><span /><span /><span /><span /><span />
              </div>
            </div>
            <div className="content__actions"><a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path fill="currentColor" d="M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z" />
                <path fill="currentColor" d="M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z" />
              </svg><span></span></a><a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="currentColor" d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z" />
                  <path fill="currentColor" d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z" />
                </svg><span></span></a></div>
            <div className="content__title">
              <h1>KG3129-{profile.cargoCode}</h1>
              <h2>{profile.lastName} {profile.name}</h2>
              <h3> {profile.phone}</h3>
            </div>

            <ul className="content__list">
              <li><span>0</span>Тааныштарыныз</li>
              <li><span>0</span>Коментарийлер</li>


            </ul>
            <div>

            </div>
            <div className='Buttons'>
              <div className="content__button"><a className="button" href="#">

              <p className="button__text">Товарларга</p></a></div>
            <div className="content__button"><a className="button" href="#">

              <p className="button__text" onClick={()=>navigate('/home')}>Башкы бет</p></a></div>

          </div>
            </div>
            
          <div className="bg">
            <div><span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default UserPage;


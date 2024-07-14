import React, { useState } from 'react';
import Css from './Home.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Logo from '../../assets/logo.png';
import { FaBasketShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={Css.Main}>
      <div className={Css.HeaderCap}>
        <div className={Css.HeaderCapContact}>
          <p>kargoKarakol@gmail.com</p>
          <p>+996 777 111 222</p>
        </div>
        <div className={Css.SocialIcons}>
          <FaFacebookF />
          <FaTwitter />
          <IoLogoWhatsapp />
          <FaInstagram />
        </div>
      </div>
      <div className={Css.HeaderNavBar}>
        <img src={Logo} className={Css.Logo} alt="" />
        <ul className={isMenuOpen ? `${Css.NavLinks} ${Css.Open}` : Css.NavLinks}>
          <li>БАШКЫ</li>
          <li>ТОВАРЛАР</li>
          <li>БАЙЛАНЫШ</li>
        </ul>
        <span className={Css.Basket}><FaBasketShopping /></span>
        <FaBars className={Css.Burger} onClick={toggleMenu} />
      </div>
      <div className={Css.Header}>
        <div className={Css.HeaderShadow}></div>
        <div className={Css.Title}>
          <div className={Css.Title1}>
            <div className={Css.Linear}></div>
            <h1>БАТ ЖАНА КООПСУЗДУУ</h1>
            <div className={Css.Linear}></div>
          </div>
          <div className={Css.Title2}>
            <h1>KARGOKARAKOL</h1>
          </div>
          <div className={Css.Description}>
            <p>Биз – дүйнө жүзү боюнча жүк ташууларды уюштурууга адистешкен кесипкөй командабыз</p>
          </div>
        </div>
        <div className={Css.Buttons}>
          <Link> <button className={Css.Btn1}>БАЙЛАНЫШУУ</button></Link>
          <Link to={'/UserPage'}><button className={Css.Btn2}>ЖЕКЕ БЕТ</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

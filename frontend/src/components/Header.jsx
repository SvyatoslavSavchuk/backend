import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { fetchData } from '../utils';



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [content, setContent] = useState({})
    
    useEffect (() => {
        fetchData('pageContent/kontakt', 'GET', null, (data) => {
            setContent(data)
        })
    }, [])


    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className={`header flex ${isScrolled ? 'scrolled' : ''}`}>
            <div className="logo-on-header">
                <img className='logo-image' src="/s1.png" alt="logo" />
            </div>

            <div className={`flex pages-of-header ${isMenuOpen ? 'open' : ''}`}>
                <div>
                    <a className={`uppercase underline ${currentPath === '/' ? 'active-link' : ''}`} href="/">
                        <span>O firmie</span>
                    </a>
                </div>
                <div>
                    <a className={`uppercase underline ${currentPath === '/galeria' ? 'active-link' : ''}`} href="/galeria">
                        <span>GALERIA</span>
                    </a>
                </div>
                <div>
                    <a className={`uppercase underline ${currentPath === '/kontakt' ? 'active-link' : ''}`} href="kontakt">  
                        <span>KONTAKT</span>
                    </a>
                </div>
            </div>

            <div className="icons">
                <a className="contact-link" href={`tel:${content.telefon || `${content.telefon}`}`}>
                    <FontAwesomeIcon 
                        className="icon-mobile"
                        icon={faPhone}
                        style={{ color: 'white', height: '100%'}}
                    />
                    <span className="contact-desktop">{content.telefon || `${content.telefon}`}</span>
                </a>
                <a className="contact-link" href={`mailto:${content.eMail || `${content.eMail}`}`}>
                    <FontAwesomeIcon 
                        className="icon-mobile"
                        icon={faEnvelope}
                        size="xl"
                        style={{ color: 'white', height: '100%'}}
                    />
                    <span className="contact-desktop">{content.email || `${content.eMail}`}</span>
                </a>
            </div>
            <div>
                <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        &#9776;
                </div>
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <span style={{ color: 'transparent' }}>&#9776;</span> 
                </div>
            </div>
            
        </div>
    );
};


export default Header;

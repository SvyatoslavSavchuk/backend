import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropletSlash, faClock, faLandmark, faBroom } from "@fortawesome/free-solid-svg-icons";
import { faHandLizard } from '@fortawesome/free-regular-svg-icons';
import Loader from "./components/Loader";
import { fetchData } from './utils'

import Slider from "./components/Slider";



const HomePage = () => {
    const [content, setContent] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('pageContent/home', 'GET', null, (data) => {
            setContent(data);
            setLoading(false)
        });
  }, []);

    if (loading) return <Loader/>
    return (
        <div className="">
            <div className="personal-white home-container-1-part">
                <div className="home-part-1-left">
                    <div>
                        <h1 className="font-weight-400 f-size-40px">
                            {content.glownyTytul}
                        </h1>
                        <div className="block-about-SM">
                            <h2 className="font-weight-500">
                                {content.tytulNadOpisFirmy}
                            </h2>
                            <span className="abouteSM f-size-for-site">
                                {content.abouteSM}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="home-part-1-right">
                    <img className="w-100p" src="/sufitPart1.JPG" alt="" />
                </div>
            </div>
            <div className="home-container-2-part">
                <div className="home-part-2-right">
                    <img className="w-100p" src="/proba1.jpg" alt="" />
                </div>
                <div className="home-part-2-left">
                    <div>
                        <h1 className="font-weight-400 f-size-40px">
                            O firmie
                        </h1>
                        <div className="abouteLuxS">
                            <p className="f-w-500">
                                {content.greetings}
                            </p>
                            <span className="w-100p-for-mobile f-w-500">
                                {content.advantagesTitle}
                            </span>
                        </div>
                        <div className="przewagi">
                            <ul className="f-size-for-site">
                                <li>
                                    {content.przewaga1}
                                </li>
                                <li>
                                    {content.przewaga2}
                                </li>
                                <li>
                                    {content.przewaga3}
                                </li>
                                <li>
                                    {content.przewaga4}
                                </li>
                                <li>
                                    {content.przewaga5}
                                </li>
                                <li>
                                    {content.przewaga6}
                                </li>
                                <li>
                                    {content.przewaga7}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span className="types-of-ceilings-title">
                    rodzaje sufitów
                </span>
                <div className="types-of-ceilings">
                    <div>
                        <div>
                            <img className="" src="/lustzane.jpg" alt="" />
                        </div>
                        <div className="titleOfTypes">
                            {content.typeBL}
                        </div>
                        <div className="">
                            {content.abouteTypeBL}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="" src="/matowe.jpg" alt="" />
                        </div>
                        <div className="titleOfTypes">
                            {content.typeMAT}
                        </div>
                        <div className="">
                            {content.abouteTypeMAT}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="" src="/satyna.jpg" alt="" />
                        </div>
                        <div className="titleOfTypes">
                            {content.typeSAT}
                        </div>
                        <div className="">
                            {content.abouteTypeSAT}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="" src="/oswietlenie.jpg" alt="" />
                        </div>
                        <div className="titleOfTypes">
                            {content.typeLED}
                        </div>
                        <div className="">
                            {content.abouteTypeLED}
                        </div>
                    </div>
                </div>
            </div>
            <div className="block-przewagi-sufitow">
                <span>
                    Przewagi sufitów napinanych
                </span>
                <div>
                    <div>
                        <FontAwesomeIcon className="icon-przewaga" icon={faDropletSlash} />
                        <span>
                            {content.tytulPrzewaga1}
                        </span>
                        <p className="f-size-for-site">
                            {content.PrzewagiSufitow1}
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="icon-przewaga" icon={faClock} />
                        <span>
                            {content.tytulPrzewaga2}
                        </span>
                        <p className="f-size-for-site">
                            {content.PrzewagiSufitow2}
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="icon-przewaga" icon={faLandmark} />
                        <span>
                            {content.tytulPrzewaga3}
                        </span>
                        <p className="f-size-for-site">
                            {content.PrzewagiSufitow3}
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="icon-przewaga" icon={faBroom} />
                        <span>
                            {content.tytulPrzewaga4}
                        </span>
                        <p className="f-size-for-site">
                            {content.PrzewagiSufitow4}
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="icon-przewaga" icon={faHandLizard} />
                        <span>
                            {content.tytulPrzewaga5}
                        </span>
                        <p className="f-size-for-site">
                            {content.PrzewagiSufitow5}
                        </p>
                    </div>
                </div>
            </div>
            <Slider/>
        </div>
    )
}

export default HomePage;
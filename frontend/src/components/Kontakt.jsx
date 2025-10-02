import { fetchData } from '../utils'
import { useState, useEffect } from 'react'


import Loader from './Loader'

const Kontakt = () => {
    const [content, setContent] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('pageContent/kontakt', 'GET', null, (data) => {
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
                        <h1 className='font-weight-400'>
                            {content.tytulInKontakt}
                        </h1>
                        <div className='flex pd-t-5p'>
                            <h2 className='mar-0'>
                                Telefon:
                            </h2>
                            <a className='kontakt-data' href={`tel:${content.telefon || `${content.telefon}`}`}>
                                {content.telefon}
                            </a>
                        </div>
                        <div className='flex pd-t-5p'>
                            <h2 className='mar-0'>
                                E-mail:
                            </h2>
                            <a className='kontakt-data' href={`mailto:${content.email || 'sufitymontaz@gmail.com'}`}>
                                {content.eMail}
                            </a>
                        </div>
                    </div>
                    <div className='flex-col'>
                        <h1>
                            Czas pracy:
                        </h1>
                        <span className='f-s-24'>
                            {content.czasPracy}
                        </span>
                        <span className='f-s-24'>
                            {content.textPodCzasemPracy}
                        </span>
                    </div>
                </div>
                <div className="home-part-1-right pd-t-70px">
                    <img className="w-100p" src="/photo_for_contact.JPG" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Kontakt;
import { useState, useEffect } from "react"

import { fetchData } from "../utils"

const Footer = () => {
    const [content, setContent] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('pageContent/kontakt', 'GET', null, (data) => {
            setContent(data);
        });
  }, []);

    return ( 
        <div className="footer">
            <div>
                <img src="/s1.png" alt="logo" />
            </div>
            <div>
                <a className="uppercase" href="/">
                    <span className="my-personal-white">
                        O FIRMIE
                    </span>
                </a>
                <a className="uppercase" href="/galeria">
                    <span className="my-personal-white">
                        GALERIA
                    </span>
                </a>
                <a className="uppercase" href="/kontakt">
                    <span className="my-personal-white">
                        KONTAKT
                    </span>
                </a>
            </div>
            <div>
                <a className="my-personal-white" href={`tel:${content.telefon}`}>
                    {content.telefon}
                </a>
                <a className="my-personal-white" href={`mailto:${content.eMail}`}>
                    {content.eMail}
                </a>
                <span>
                    Pracujemy na terenie całej Polski.
                </span>
                <span>
                    {content.czasPracy}
                </span>
            </div>
        </div>
    )
}

export default Footer
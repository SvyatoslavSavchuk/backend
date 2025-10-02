import { useState, useEffect } from "react";
import { fetchDataToken } from "../utils";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [data, setData] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() =>{
        fetchDataToken('admin/dashboard', 'GET', null, (res) => {
            if (!res && res.status !== 'SUCCESS') {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setData(res.data)
            }
        })
    }, [navigate])

    return (
        <div className="adminNavigation">
            <div>
                <button>
                    <a href="admin/content">
                        Изменить текст
                    </a>
                </button>
            </div>
            <div>
                <button>
                    <a href="admin/galeria">
                        Админ галерея
                    </a>
                </button>
            </div>
        </div>
    )
}

export default AdminDashboard;
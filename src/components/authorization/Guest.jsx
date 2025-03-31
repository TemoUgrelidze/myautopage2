import React, { useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext.jsx';

const Guest = () => {
    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    const handleRegistration = () => {
        navigate('/login');
    };

    return (
        <div className="guest-button-container">
            <button className="guest-button" onClick={handleRegistration}>
                <FaUser className="guest-icon" />
                <span>{t('common.login')}</span>
            </button>
        </div>
    );
};

export default Guest;

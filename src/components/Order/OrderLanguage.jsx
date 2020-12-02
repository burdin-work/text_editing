import React from 'react';
import classnames from 'classnames';

const languages = [
    { name: 'Українська', key: 'ua' },
    { name: 'Російська', key: 'ru' },
    { name: 'Англійська', key: 'en' },
];

const LanguagesGroup = ({ toggleRadio, activeRadio }) => {
    return (
        languages.map((el) => {
            return (
                <div
                    role="button"
                    tabIndex={-1}
                    className={classnames('radioButtonWrap', { active: el.key === activeRadio })}
                    onClick={() => toggleRadio(el.key)}
                    onKeyPress={() => toggleRadio(el.key)}
                    key={el.key}
                >

                    <div className="radioButton">
                        <div className="point" />
                    </div>
                    <span>{el.name}</span>
                </div>
            );
        })
    );
};

const OrderLanguage = ({ toggleLanguageRadio, activeRadio }) => {
    return (
        <div className="order__language">
            <h3>Мова</h3>
            <div className="radioButtons">
                <LanguagesGroup languages={languages} toggleRadio={toggleLanguageRadio} activeRadio={activeRadio} />
            </div>
        </div>
    );
};

export default OrderLanguage;

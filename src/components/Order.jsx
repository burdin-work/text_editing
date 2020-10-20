import React from 'react';

const Order = () => {
    return (
        <form className="order container">
            <div className="orderLeft">
                <div className="order__editing">
                    <h2>Замовити редагування</h2>
                    <p>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст <br/>не
                        переписуватимемо. Зайвих виправлень не буде. <a href="/">Детальніше про редагування</a></p>

                    <div className="inputWrap">
                        <input type="email" required className="input" placeholder="Ваша ел. пошта"/>
                    </div>

                    <div className="inputWrap">
                        <input type="email" required className="input" placeholder="Ваше ім'я"/>
                    </div>

                    <div className="textareaWrap">
                        <textarea placeholder="Уведіть текст або"></textarea>
                        <label className="fileDownload">
                            Завантажте файл
                        </label>
                    </div>
                </div>

                <div className="order__language">
                    <h3>Мова</h3>
                    <div className="radioButtons">
                        <div className="radioButton">
                            <div className="circle"></div>
                            <span>Українська</span>
                        </div>
                        <div className="radioButton">
                            <div className="circle"></div>
                            <span>Російська</span>
                        </div>
                        <div className="radioButton">
                            <div className="circle"></div>
                            <span>Англійська</span>
                        </div>
                    </div>
                </div>

                <div className="order__comment">
                    <div className="inputWrap">
                        <input type="text" className="input" placeholder="Стислий коментар або покликання"/>
                    </div>
                </div>

            </div>

            <div className="orderRight">
                <div className="order__submit">
                    <div className="price">
                        <span>0,00</span><span>грн</span>
                    </div>
                    <div className="buttonWrap">
                        <button href="/" className="button">Замовити</button>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default Order;
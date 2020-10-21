import React, {useState} from 'react';

const OrderEditing = () => {

    const [arbText, setArbText] = useState('');
    const [file, setFile] = useState(false);
    const [extension, setExtension] = useState('doc');

    const getArbText = (e) => {
        setArbText(e.target.value);
    }
    const switchSelectFile = () => {
        setFile(true);
    }
    const selectExtension = (e) => {
        setExtension(e.target.value);
    }


    return (
        <div className="order__editing">
            <h2>Замовити редагування</h2>
            <p>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст <br/>не
                переписуватимемо. Зайвих виправлень не буде. <a href="/">Детальніше про редагування</a></p>

            <div className="inputWrap emailWrap">
                <input type="email" required className="input email" placeholder="Ваша ел. пошта"/>
            </div>

            <div className="inputWrap">
                <input type="email" required className="input" placeholder="Ваше ім'я"/>
            </div>

            <div className="textareaWrap">

                <textarea onChange={getArbText} placeholder="Уведіть текст або" className="textarea"></textarea>


                <div className="fileDownload">

                    {
                        arbText.length === 0
                        && <span onClick={switchSelectFile}>
                        завантажте файл
                    </span>
                    }

                    {
                        file && arbText.length === 0 &&
                        <>
                            <select onChange={selectExtension}>
                                <option defaultValue value="doc">example.doc</option>
                                <option value="docx">example.docx</option>
                                <option value="rtf">example.rtf</option>
                                <option value="other">example.***</option>
                            </select>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default OrderEditing;
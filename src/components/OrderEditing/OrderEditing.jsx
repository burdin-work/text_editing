import React, {useEffect, useState} from 'react';
import DropDownList from "./DropDownList";
import ExampleFile from "./ExampleFile";
import {dataAPI} from "../../utils/API";
import axios from "axios";

const OrderEditing = ({selectExtension, getAreaText, areaText, data, setData}) => {

    const [file, setFile] = useState(false);

    const switchSelectFile = () => {
        setFile(true);
    }

    useEffect(() => {

        if(areaText.length === 0) {
            setFile(false);
        }
    }, [areaText])

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

                { file ? <ExampleFile setData={setData} data={data} getAreaText={getAreaText} areaText={areaText}/>
                    : <textarea onChange={getAreaText} placeholder="Уведіть текст або" className="textarea"/>}

                <div className="fileDownload">

                    { areaText.length === 0 && !file
                        && <span onClick={switchSelectFile}>
                        завантажте файл
                    </span> }

                    { file && areaText.length > 0 &&
                            <DropDownList data={data} setData={setData} selectExtension={selectExtension} areaText={areaText}/> }
                </div>
                <div className="symbolsLength">
                    {
                        areaText.length > 1e3
                            ? ('' + areaText.length/1e3).split('.').join(',')
                            : areaText.length
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderEditing;
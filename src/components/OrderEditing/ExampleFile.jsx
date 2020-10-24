import React, {useEffect} from 'react';
import axios from "axios";


const ExampleFile = ({data, setData, getAreaText, areaText}) => {

    useEffect(() => {

        axios.get('/data.json').then(response => {
            setData({
                ...data,
                areaText: response.data['exampleText'],
                extension: 'doc'
            });

        });
    }, [])

    return (
        <textarea onChange={getAreaText} placeholder="Уведіть текст або" className="textarea darkBg"
                  value={areaText}/>
    );
};

export default ExampleFile;
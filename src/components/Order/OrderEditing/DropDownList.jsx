import React, { useEffect } from 'react';
import axios from 'axios';

const DropDownList = ({ selectExtension, data, setData }) => {
    useEffect(() => {
        axios.get('/data.json').then((response) => {
            setData({
                ...data,
                areaText: response.data.response,
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.extension]);

    return (
        <select onChange={selectExtension}>
            <option value="doc">example.doc</option>
            <option value="docx">example.docx</option>
            <option value="rtf">example.rtf</option>
            <option value="other">example.***</option>
        </select>
    );
};

export default DropDownList;

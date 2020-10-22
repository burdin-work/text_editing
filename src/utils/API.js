import axios from "axios";


const instance = axios.create({
    baseURL: '/data.json',
    responseType: "json"
})

export const dataAPI = {

    getExampleText () {
        axios.get('').then(({data}) => {
            console.log(data)
            return data;
        });
    }
}
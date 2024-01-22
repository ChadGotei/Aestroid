import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${data.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} seconds`))
        }, s * 1000);
    })
}


export const spinnerOpacity = function (opacity) {
    document.querySelector('.spinner').style.opacity = opacity;
};


export const animeSection = document.querySelector('.anime');
export const resultsSection = document.querySelector('.results');

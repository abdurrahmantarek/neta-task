const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const btoa = require('btoa');


const key = request({
    method: 'GET',
    url: 'https://join.dev.neta.sh/api/interview-tests/vault-of-sweets',
    headers: {
        "Candidate-Email": "abdurrahmantarek2@gmail.com", 
    },
}, (err, res, body) => {

    const dom = new JSDOM(body);

    const elementsOfPage = dom.window.document.getElementsByTagName("*");

    const sortedElements = [...elementsOfPage].sort((a, b) => a.tagName.toLowerCase().localeCompare(b.tagName.toLowerCase()));

    const countedElements = sortedElements.reduce((acc, value) => ({
        ...acc,
        [value.tagName.toLowerCase()]: (acc[value.tagName.toLowerCase()] || 0) + 1
    }), []);

    var tagsString = '';

    for (const [key, value] of Object.entries(countedElements)) {
        tagsString += `${key}${value}`
    }

    
    getKey(btoa(tagsString))
});

function getKey (token) {

    request({
        method: 'POST',
        url: 'https://join.dev.neta.sh/api/interview-tests/vault-of-sweets',
        headers: {
            "Candidate-Email": "abdurrahmantarek2@gmail.com",
            "Authorization" : `Bearer ${token}`
        },
        }, (err, res, body) => {
            console.log(JSON.parse(body).message)
        });
}
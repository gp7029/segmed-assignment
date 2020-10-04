import Axios from 'axios';

const hostname='http://localhost:8080';

/**
 * Make a GET api call
 * @param {String} uri - String representing REST API resource 
 * @param {Object} params - GET params
 */
const GET = async (uri, params={}) =>{
    try {
        return await Axios.get(`${hostname}/${uri}`, {
            params
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Make a POST api call
 * @param {String} uri - String representing REST API resource
 * @param {Object} payload - POST payload
 */
const POST = async (uri, payload={}) => {
    try {
        return await Axios.post(`${hostname}/${uri}`, payload);
    } catch (error) {
        console.log(error);
    }
}

/**
 * An abstracted function that returns whether the response is a success
 * @param {Object} response - json object representing response from backend
 * @returns {boolean} - Whether we got a successfull response
 */
const isValidResponse = (response) => {
    return response && response.status ==  200 && response.data && response.data.payload;
}

export {
    GET,
    POST,
    isValidResponse
}
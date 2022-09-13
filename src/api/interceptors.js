const reqFulfil = function (config) {
    /*const updatedConfigHeader = { ...config.headers,};
    const updatedConfig = { ...config, headers: { ...updatedConfigHeader } }
    return updatedConfig;*/
    return {...config}
}

const reqError = function (error) {
    console.error("Request Error" + error);
    return Promise.reject(error);
}

const resFulfil = function (response) {
    return {
        'data': response.data.data,
        'result': response.status == 200 ? 'success' : 'failure',
    };
}

const resError = function (error) {
    const message = error.code == 'ERR_NETWORK' ? 'Network error or unable to conncet' : 'Some error happened';
    console.error(message);
    console.error(error);
    return Promise.reject(message);
}

export {
    reqFulfil,
    reqError,
    resFulfil,
    resError
}

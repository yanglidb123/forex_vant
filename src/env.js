module.exports = {
    host: process.env.NODE_ENV === 'production' ?
        (location.protocol + '//' + location.host) :
        '/app',  //本地
};

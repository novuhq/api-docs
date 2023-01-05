const URL = process.env.NOVU_API_URL || 'https://api.novu.co';

const getUrlForFrontend = () => process.env.GATSBY_NOVU_API_URL || 'https://api.novu.co';

module.exports = {
 URL,
 getUrlForFrontend,
};

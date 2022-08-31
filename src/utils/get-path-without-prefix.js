const getPathWithoutPrefix = (path) => path.replace(/^\/api\//, '').replace('/', '');

export default getPathWithoutPrefix;

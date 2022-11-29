const fetch = require(`node-fetch`);
const SwaggerParser = require('@apidevtools/swagger-parser');

const PARAMETER_TYPES = {
  path: 'path',
  query: 'query',
  body: 'body',
};

const getAllData = async () => {
  const dataSwagger = await fetch('https://api.novu.co/api-json').then((response) =>
    response.json()
  );

  const { paths, tags } = await SwaggerParser.dereference(dataSwagger);

  const pages = Object.keys(paths)
    .map((path) => ({
      endpoint: path.replace(/{/g, ':').replace(/}/g, ''),
      methods: Object.keys(paths[path]).map((method) => ({
        ...paths[path][method],
        id: `${method}-${path}`,
        method,
        endpoint: path.replace(/{/g, ':').replace(/}/g, ''),
        tag: paths[path][method]?.tags?.[0],
        slug: paths[path][method]?.summary?.replace(/\s/g, '-').toLowerCase(),
        parameters: {
          path: paths[path][method].parameters.filter((param) => param.in === PARAMETER_TYPES.path),
          query: paths[path][method].parameters.filter(
            (param) => param.in === PARAMETER_TYPES.query
          ),
          body: paths[path][method].requestBody?.content['application/json'].schema,
        },
        responses: Object.keys(paths[path][method].responses).map((status) => {
          const schema =
            paths[path][method].responses[status]?.content?.['application/json']?.schema;
          return {
            status,
            description: paths[path][method].responses[status].description,
            schema,
          };
        }),
      })),
    }))

    .filter((page) => page.methods.some((method) => method.tag && method.summary))
    .sort((a, b) => {
      const aIndex = tags.findIndex((tag) => tag.name === a.methods[0].tag);
      const bIndex = tags.findIndex((tag) => tag.name === b.methods[0].tag);
      return aIndex - bIndex;
    });

  const methods = pages.reduce((acc, path) => {
    path.methods.forEach((method) => {
      acc.push(method);
    });
    return acc;
  }, []);

  const menu = tags
    .map((tag) => ({
      label: tag.name,
      path: tag.name,
      subItems: methods
        .filter((method) => method.tags.includes(tag.name))
        .map((method) => ({
          label: method.summary,
          path: method.slug,
          ...method,
        })),
    }))
    .filter((tag) => tag.subItems.length > 0);

  return {
    pages,
    menu,
    methods,
  };
};

module.exports = getAllData;

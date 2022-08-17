const path = require('path');

const SwaggerParser = require('@apidevtools/swagger-parser');

const dataSwagger = require('./swagger.json');

const PARAMETER_TYPES = {
  path: 'path',
  query: 'query',
  body: 'body',
};

const getAllData = async () => {
  const { paths, tags } = await SwaggerParser.dereference(dataSwagger);

  const pages = Object.keys(paths)
    .map((path) => ({
      endpoint: path.replace(/{/g, ':').replace(/}/g, ''),
      methods: Object.keys(paths[path]).map((method) => ({
        ...paths[path][method],
        id: `${method}-${path}`,
        method,
        endpoint: path.replace(/{/g, ':').replace(/}/g, ''),
        tag: paths[path][method].tags[0],
        slug: paths[path][method].summary.replace(/\s/g, '-').toLowerCase(),
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
    .sort((a, b) => {
      const tagA = a.methods[0].tag;
      const tagB = b.methods[0].tag;
      if (tagA < tagB) {
        return -1;
      }
      if (tagA > tagB) {
        return 1;
      }
      return 0;
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

async function createMainPage({ actions, menu, pages }) {
  const { createPage } = actions;

  createPage({
    path: '/',
    component: path.resolve('./src/templates/main.jsx'),
    context: {
      menu,
      sections: pages,
    },
  });
}

async function createNotFoundPage({ actions, menu }) {
  const { createPage } = actions;

  createPage({
    path: '/404',
    component: path.resolve('./src/templates/404.jsx'),
    context: {
      menu,
    },
  });
}

exports.createPages = async (args) => {
  const { pages, menu, methods } = await getAllData();

  const params = {
    ...args,
    pages,
    menu,
    methods,
  };

  await createMainPage(params);
  await createNotFoundPage(params);
};

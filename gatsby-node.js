const path = require('path');

const algoliasearch = require('algoliasearch');

const getAllData = require('./src/utils/get-all-data');

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

async function uploadToAlgolia(methods) {
  const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
  const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME);

  index.setSettings({
    attributesToSnippet: [`excerpt:20`],
  });

  const data = methods
    .map((method) => ({
      objectID: method.id,
      id: method.id,
      title: method.summary,
      slug: method.slug,
      excerpt: method?.description || '',
    }))
    .reduce((acc, method) => {
      acc[method.id] = method;
      return acc;
    }, {});

  await index.saveObjects(Object.values(data));
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
  await uploadToAlgolia(methods);
};

const path = require('path');

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

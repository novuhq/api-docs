const path = require('path');

const getAllData = require('./src/utils/get-all-data');

async function createPages({ graphql, actions, menu, pages }) {
  const { createPage, createRedirect } = actions;

  const {
    data: { customPages },
  } = await graphql(`
    {
      customPages: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  pages.forEach((page) => {
    page.methods.forEach((method) => {
      createPage({
        path: method.slug,
        component: path.resolve('./src/templates/main.jsx'),
        context: {
          id: method.id,
          menu,
          sections: pages,
        },
      });
    });
  });

  customPages.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: slug,
      component: path.resolve('./src/templates/main.jsx'),
      context: {
        id: slug,
        menu,
        sections: pages,
      },
    });
  });

  createRedirect({
    fromPath: `/api`,
    toPath: `/overview`,
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

  await createPages(params);
  await createNotFoundPage(params);
};

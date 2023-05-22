export type Article = {
  [key: string]: object;
};
export const sourceNodes = async ({ actions, createNodeId, createContentDigest }, { username }) => {
  const { createNode } = actions;

  if (!actions || !createNodeId || !createContentDigest) {
    throw Error('`Gatsby` environment not initialized correctly.');
  }

  if (!username) {
    throw Error('No `username` provided to `gatsby-plugin-dev-community`');
  }

  const response = await fetch(`https://dev.to/api/articles?username=${username}`);
  const data = await response.json();
  const articlesPromise: Promise<Article>[] = data.map(({ id }) =>
    fetch(`https://dev.to/api/articles/${id}`).then((result) => result.json())
  );

  const articles: Article[] = await Promise.all(articlesPromise);
  articles.forEach((article: Article) => {
    const gatsbyNode = {
      article,
      id: createNodeId(`${article.id}`),
      parent: '__SOURCE__',
      children: [],
      internal: {
        type: 'DevArticles',
        contentDigest: createContentDigest(article)
      }
    };

    createNode(gatsbyNode);
  });
};

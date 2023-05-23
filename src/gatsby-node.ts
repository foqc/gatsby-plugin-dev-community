export type DevArticleType = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  social_image: string;
  tag_list: string[];
  tags: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  collection_id: number;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  published_timestamp: string;
  reading_time_minutes: number;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
  organization: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  };
};
export const sourceNodes = async ({ actions, createNodeId, createContentDigest }, { username }) => {
  const { createNode } = actions;

  if (!actions || !createNodeId || !createContentDigest) {
    throw Error('`Gatsby` environment not initialized correctly.');
  }

  if (!username) {
    throw Error('No `username` provided to `gatsby-plugin-dev-community`');
  }

  const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=100`);
  const data = await response.json();
  const articlesPromise: Promise<DevArticleType>[] = data.map(({ id }) =>
    fetch(`https://dev.to/api/articles/${id}`).then((result) => result.json())
  );

  const articles: DevArticleType[] = await Promise.all(articlesPromise);
  articles.forEach((article: DevArticleType) => {
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

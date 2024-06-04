export type DevArticleType = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  social_image: string;
  tag_list: string;
  tags: string[];
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

const getArticleIdsByPage = async (searchParams: string): Promise<number[]> => {
  try {
    const response = await fetch(`https://dev.to/api/articles?${searchParams}`);
    if (!response.ok) {
      throw Error(`Error fetching articles ${searchParams}. Status: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(({ id }) => id);
  } catch (error) {
    throw error;
  }
};

const getAllArticleIdsByUser = async (
  username: string,
  page: number = 1,
  perPage: number = 30
): Promise<number[]> => {
  const searchParams = new URLSearchParams({ username, page: `${page}`, per_page: `${perPage}` });

  let allArticlesIds: number[] = [];
  let pageParam = page;
  let hasMorePage = true;
  while (hasMorePage) {
    searchParams.set('page', `${pageParam}`);
    const articleIds: number[] = await getArticleIdsByPage(searchParams.toString());
    hasMorePage = !!articleIds.length;
    allArticlesIds = [...allArticlesIds, ...articleIds];
    pageParam++;
  }

  return allArticlesIds;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getDetailById = async (
  id: number,
  batchSize: number,
  batchIndex: number
): Promise<DevArticleType> =>
  fetch(`https://dev.to/api/articles/${id}`).then((response) => {
    if (!response.ok) {
      throw Error(
        `[${batchIndex}/${batchSize}] Error fetching article ${id} please try again later. Status: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  });

export const getArticlesDetailByIds = async (
  articleIds: number[],
  batchSize: number,
  sleepTime: number
): Promise<DevArticleType[]> => {
  const batches = Math.ceil(articleIds.length / batchSize);
  const articles: DevArticleType[] = [];

  for (let i = 0; i < batches; i++) {
    const batch = articleIds.slice(i * batchSize, (i + 1) * batchSize);
    const batchPromise = batch.map((id) => getDetailById(id, batchSize, i + 1));
    const batchArticles = await Promise.all<DevArticleType>(batchPromise);
    articles.push(...batchArticles);

    if (i < batches - 1) {
      await sleep(sleepTime);
    }
  }

  return articles;
};

export const sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { username, perPage, page, batchSize = 3, sleepTime = 3000 }
) => {
  const { createNode } = actions;

  if (!actions || !createNodeId || !createContentDigest) {
    throw Error('`Gatsby` environment not initialized correctly.');
  }

  if (!username) {
    throw Error('No `username` provided to `gatsby-plugin-dev-community`');
  }

  if (batchSize > 30 || batchSize < 1) {
    throw Error('Batch size cannot be greater than 30 or less than 1');
  }

  if (sleepTime < 0 || sleepTime > 10000) {
    throw Error('Sleep time cannot be less than 0 or greater than 10000');
  }

  const articleIds = await getAllArticleIdsByUser(username, page, perPage);
  const articles = await getArticlesDetailByIds(articleIds, batchSize, sleepTime);
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

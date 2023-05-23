# gatsby-plugin-dev-community

This small project it's a Gatsby plugin that fetches user articles from [Dev.to’s API](https://developers.forem.com/api/v0#tag/articles/operation/getArticles) `/articles?username` combined with `/articles/${id}` endpoint.

**Note:** There is an alternative plugin called [gatsby-source-dev](https://github.com/geocine/gatsby-source-dev) that achieves the same functionality, but it has unnecessary dependencies and hasn't received recent updates.

[![NPM version](https://badgen.net/npm/v/gatsby-plugin-dev-community)](https://www.npmjs.com/package/gatsby-plugin-dev-community)
[![main workflow](https://github.com/foqc/gatsby-plugin-dev-community/actions/workflows/main.yml/badge.svg)](https://github.com/foqc/gatsby-plugin-dev-community/actions/workflows/main.yml)

## Usage

Install `gatsby-plugin-dev-community` in your project:

```
yarn add gatsby-plugin-dev-community
npm install gatsby-plugin-dev-community
```

Then add the plugin to your `gatsby-config.js` file:

```js
{
  resolve: "gatsby-plugin-dev-community",
  options: {
    username: 'userDevCommunity',  // This is your username on Dev.to
    perPage: '50', // Page size (the number of items to return per page 1 ... 1000). By default is 30
    page: '1' //Pagination page. By default is 1
  }
}
```

This plugin retrieves data from the Dev.to API and stores it in Gatsby. It includes a sample query that fetches article information such as `title`, `id`, and `description`.

```js
{
  allDevArticles {
    edges {
      node {
        article {
          id
          title
          description
        }
      }
    }
  }
}
```

Available properties in articles

```js
{
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
}
```

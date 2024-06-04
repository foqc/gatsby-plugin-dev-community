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
    username: 'userDevCommunity',  //[Required] This is your username on Dev.to
    perPage: '50', //[Optional] Page size (the number of items to return per page 1 ... 1000). By default is 30
    page: '1', //[Optional] Pagination page. By default is 1
    batchSize: '3', //[Optional] To prevent 429 [Too Many Requests] errors from the server, we limit the number of requests sent in each batch. By default is 3
    sleepTime: '3000', // [Optional] To prevent 429 [Too Many Requests] errors from the server, we wait for a specified number of milliseconds after each batch request. The default is 3000 milliseconds.
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
}
```
<br />
<p align="center">
<a href="https://www.buymeacoffee.com/foqc" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>

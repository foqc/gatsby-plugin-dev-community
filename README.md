# gatsby-plugin-dev-community

This small project it's a Gatsby plugin that fetches user articles from Dev.to’s `/articles?username` combined with `/articles/${id}` endpoint.

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
    username: 'userDevCommunity'  // This is your username on Dev.to
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

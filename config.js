const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://docker-workshop.com',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://www.docker.com/sites/default/files/d8/2019-07/horizontal-logo-monochromatic-white.png',
    logoLink: 'https://docker-workshop.com',
    title:
      "Docker Workshop",
    githubUrl: 'https://github.com/itmayziii/docker-workshop',
    helpUrl: '',
    tweetText: '',
    social: `
      <li>
		    <a href="https://twitter.com/iTMayzIII" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Discord'}/>
		      </div>
		    </a>
		  </li>
		`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: true,
      indexName: 'prod_docker_workshop',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/quick-examples', // add trailing slash if enabled above
      '/why-containers',
    ],
    collapsedNav: [
      '/why-containers', // add trailing slash if enabled above
    ],
    links: [
      { text: 'Docker Docs', link: 'https://docs.docker.com/' },
      { text: 'Dockerfile Reference', link: 'https://docs.docker.com/engine/reference/builder/' },
      { text: 'Compose File Reference', link: 'https://docs.docker.com/compose/compose-file/' }
    ],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://docker-workshop.com/'>Docker </a><div class='greenCircle'></div><a href='https://docker-workshop.com/'>Workshop</a>",
  },
  siteMetadata: {
    title: 'Docker Workshop | Tommy May III',
    description: 'Container workshop focused around Docker',
    ogImage: null,
    docsLocation: '',
    favicon: 'https://docs.docker.com/favicons/docs@2x.ico',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;

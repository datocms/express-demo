const pageSeo = `seo: seoMetaTags {
      tag
      attributes
      content
    }`;

const getGeneralInfo = `{
  generalInfo {
    siteName
    callToAction
    socialProfiles {
      name
      url
    }
  }
  seo: _site {
    favicons: faviconMetaTags {
      attributes
      tag
      content
    }
    globalSeo {
      siteName
      titleSuffix
      twitterAccount
      fallbackSeo {
        title
        description
        image {
          url
        }
      }
    }
  }
}`;

const aboutQuery = `{

  aboutPage {
    ${pageSeo}
    title
    heroImage {
      url
    }
    content

  }
  skillGroups: allSkillGroups(orderBy: [position_ASC]) {
    title
    description
    image {
      url
    }
    skills {
      name
      value
    }
  }
}`;

const servicesQuery = `{
  page: servicesPage {
    ${pageSeo}
    title
    heroImage {
      url
    }
    content

    seoMetaTags {
      tag
      attributes
      content
    }

  }
  services: allServices(orderBy: [position_ASC]) {
    title
    image {
      url
    }
    description
  }
  testimonials: allTestimonials(orderBy: [position_ASC]) {
    name
    content
  }
  counters: allCounters(orderBy: [position_ASC]) {
    title
    value
    image {
      url
    }
  }
}`;

const contactQuery = `{
  contactPage {
    ${pageSeo}
    title
    heroImage {
      url
    }
    content
    location {
      latitude
      longitude
    }
  }
}
`;

const portfolioQuery = `{
  portfolioPage {
    ${pageSeo}
    title
    heroImage {
      url
    }
    content
  }
  works: allWorks(filter: {showInHome: {eq: false}}) {
    title
    creationDate
    tags {
      name
    }
    image {
      url
    }
    showInHome
  }
  tags: allTags {
    name
  }
}`;

const getHome = `{
  homepage {
    ${pageSeo}
    quote
    slides {
      url
      title
      alt
    }
  }
  works: allWorks(filter: {showInHome: {eq: true}}) {
    title
    creationDate
    tags {
      name
    }
    image {
      url
    }
    showInHome
  }
}`;

const getPage = section => {
  let query = "";
  switch (section) {
    case "about":
      query = aboutQuery;
      break;
    case "services":
      query = servicesQuery;
      break;
    case "contact":
      query = contactQuery;
      break;
    case "portfolio":
      query = portfolioQuery;
      break;
    default:
      query = getHome;
  }

  return query;
};

export { getGeneralInfo, getHome, getPage };

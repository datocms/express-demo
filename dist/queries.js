"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    favicon {
      url
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
  hero: servicesPage {
    title
    heroImage {
      url
    }
    content
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

exports.getGeneralInfo = getGeneralInfo;
exports.getHome = getHome;
exports.getPage = getPage;
//# sourceMappingURL=queries.js.map
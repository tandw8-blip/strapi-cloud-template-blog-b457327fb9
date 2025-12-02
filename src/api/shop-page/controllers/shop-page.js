'use strict';

/**
 *  shop-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::shop-page.shop-page', ({ strapi }) => ({

  async find(ctx) {
    // 1. Get the default single type Shop Page
    const page = await strapi.entityService.findMany(
      'api::shop-page.shop-page',
      {
        populate: {
          heroBanner: { populate: "*" },
          sections: { populate: "*" }
        }
      }
    );

    // 2. Fetch featured shops
    const featuredShops = await strapi.entityService.findMany(
      'api::shop.shop',
      {
        filters: { isFeatured: true },
        sort: { sortOrder: 'asc' },
        populate: {
          bannerImage: true,
          logo: true,
          categories: true,
          mapMarker: true
        }
      }
    );

    return {
      data: {
        ...page,
        featuredShops
      }
    };
  }

}));
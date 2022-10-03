import Layout from '@components/layout/layout-six';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { homeAntiqueHeroBanner as heroBanner } from '@framework/static/banner';
import { GetStaticProps } from 'next';
import CollectionGrid from '@components/common/collection-grid';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchProducts } from '@framework/product/get-all-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/limits';
import HeroBannerCard from '@components/hero/hero-banner-card';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import BannerGridTwo from '@components/common/banner-grid-two';
import BestSellerWithFlashSale from '@components/product/feeds/best-seller-with-flash-sale';
import CallToActionMoscow from '@components/common/call-to-action/cta-moscow';
import { elegantBannerGrid as banners } from '@framework/static/banner';

export default function Home() {
  return (
    <>
      <Seo
        title="Antique"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="antique"
      />

      <HeroBannerCard
        banner={heroBanner}
        variant="antique"
        className="min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[800px] py-20 py:pt-24 2xl:bg-center bg-[#F8DF9C] relative"
      />
      <Container className="-mt-[60px] relative z-10">
        <CategoryGridListBlock variant="antique" />
      </Container>
      <Container>
        <BestSellerGroceryProductFeed variant="oak" />
        <BannerGridTwo
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          girdClassName="xl:gap-5 3xl:gap-7"
        />
        <BestSellerWithFlashSale />
        <CollectionGrid
          headingPosition="center"
          className="pb-1 mb-12 xl:pt-2 2xl:pt-4 3xl:pt-6 lg:pb-0 lg:mb-14 xl:mb-16 2xl:mb-20"
        />
        <BestSellerGroceryProductFeed variant="oak" />
        <CallToActionMoscow />
      </Container>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};

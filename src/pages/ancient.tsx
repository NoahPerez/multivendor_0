import Layout from '@components/layout/layout-seven';
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
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { elegantBannerGrid as banners } from '@framework/static/banner';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import { homeSixBanner as banner } from '@framework/static/banner';
import {
  heroSevenBanner,
  homeTwoBannerMedium,
  homeSixBannerMedium,
} from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bannerDiscount } from '@framework/static/banner';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import { homeTwoBanner as bannerrr } from '@framework/static/banner';
import Cart from '@components/cart/cart';
import CartSidebar from '@components/cart/cart-sidebar';
import DownloadAppsTwo from '@components/common/download-apps-two';
import Footer from '@components/layout/footer/footer';
import CollectionMediumGrid from '@components/common/collection-medium-grid';
import BestSellerGroceryProductFeedTwo from '@components/product/feeds/best-seller-grocery-product-feed-two';
import CategoryWithProducts from '@components/common/category-with-products';
export default function Home() {
  return (
    <>
      <Seo
        title="Antique"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="antique"
      />

      <Container className="flex gap-x-7 mx-auto max-w-[1920px] relative" clean>
        <div className="w-full 2xl:w-[calc(100%-428px)] 3xl:w-[calc(100%-478px)] px-4 md:px-6 lg:px-8 ltr:2xl:pl-10 rtl:2xl:pr-10 ltr:2xl:pr-0 rtl:2xl:pl-0">
          <BannerCard banner={heroSevenBanner} effectActive={true} />
          <BannerAllCarousel
            data={bannerDiscount}
            className="mb-7 pt-4 mt-0.5"
          />
          <CategoryWithProducts />
          <BannerCard
            banner={homeTwoBannerMedium}
            className="pb-1 mb-12 md:mb-14"
          />
          <BestSellerGroceryProductFeedTwo />
          <BannerCard
            banner={homeSixBannerMedium}
            className="mb-12 lg:mb-14"
            effectActive={true}
          />

          <CollectionMediumGrid headingPosition="center" />
          <DownloadAppsTwo variant="modern" />
          <Footer variant="medium" />
        </div>
        <div className="hidden 2xl:block 2xl:w-[400px] 3xl:w-[450px] h-[calc(100vh-80px)] shrink-0 fixed bg-white 2xl:ltr:right-0 2xl:rtl:left-0 4xl:ltr:left-[calc(50%+512px)] 4xl:rtl:right-[calc(50%+512px)] border border-gray-100 top-20">
          <CartSidebar />
        </div>
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

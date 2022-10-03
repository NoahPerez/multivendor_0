import { Fragment } from 'react';
import BannerGridTwo from '@components/common/banner-grid-two';
import { bannerGridMediumTwo as bannersMedium } from '@framework/static/banner';
import { bannerDiscount } from '@framework/static/banner';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import CategoryListCard from '@components/cards/category-list-card';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import SectionHeader from './section-header';
import Countdown, { zeroPad } from 'react-countdown';
import { useProductsQuery } from '@framework/product/get-all-products';
import { usePopularProductsQuery } from '@framework/product/get-all-popular-products';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import ProductCardMaple from '@components/product/product-cards/product-card-maple';
import { Product } from '@framework/types';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductCardOak from '@components/product/product-cards/product-card-oak';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import { useTranslation } from 'next-i18next';

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <span className="flex items-center justify-center -mx-1 md:-mx-1.5 lg:-mx-2 text-base font-medium text-opacity-50 xl:text-lg text-brand-dark">
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[36px] bg-fill-three text-brand-dark rounded p-1 mx-1 md:mx-1.5 lg:mx-2">
          {zeroPad(days)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[36px] bg-fill-three text-brand-dark rounded p-1 mx-1 md:mx-1.5 lg:mx-2">
          {zeroPad(hours)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[36px] bg-fill-three text-brand-dark rounded p-1 mx-1 md:mx-1.5 lg:mx-2">
          {zeroPad(minutes)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[45px] min-h-[36px] bg-fill-three text-brand-dark rounded p-1 mx-1 md:mx-1.5 lg:mx-2">
          {zeroPad(seconds)}
        </span>
      </span>
    );
  }
};

function ProductWeek() {
  const limit = LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS;
  const { data, isLoading, error } = useBestSellerGroceryProductsQuery({
    limit: limit,
  });

  return (
    <div className="block">
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 2xl:gap-5">
          {isLoading && !data?.length ? (
            Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
              {data?.slice(0, 8)?.map((product: Product) => (
                <ProductCardAlpine
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  className?: string;
}

const CategoryWithProducts: React.FC<Props> = ({ className = 'mb-12' }) => {
  const { t } = useTranslation('common');
  const { data } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });
  return (
    <div className={`xl:flex ${className}`}>
      <div className="hidden xl:block shrink-0 ltr:pr-7 rtl:pl-7 2xl:ltr:pr-8 2xl:rtl:pl-8 xl:w-[320px] 2xl:w-[356px] pt-px">
        <div className="flex flex-col overflow-hidden border rounded-md border-border-base">
          <h2 className="tracking-wide px-5 py-4 text-[#312C01] bg-yellow-50 font-bold text-sm ">
            {t('text-all-categories')}
          </h2>
          <div className="flex flex-col justify-between">
            {data?.categories?.data?.slice(0, 11)?.map((category) => (
              <CategoryListCard
                key={`category--key-${category.id}`}
                category={category}
                href={{
                  pathname: ROUTES.SEARCH,
                  query: { category: category.slug },
                }}
                className="transition border-b border-border-base last:border-b-0"
                variant="small"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center flex-wrap justify-between -mx-2 -mt-2 py-2 mb-1.5">
          <h2 className="m-2 text-lg font-semibold text-black">
            {t('text-products-of-the-week')}
          </h2>
          <div className="m-2">
            <Countdown
              date={Date.now() + 4000000 * 60}
              intervalDelay={1000}
              renderer={renderer}
            />
          </div>
        </div>
        <ProductWeek />
      </div>
    </div>
  );
};

export default CategoryWithProducts;

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import { getDirection } from '@utils/get-direction';
import { AuthProvider } from 'src/context';

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <ManagedUIContext>
              <>
                <DefaultSeo />
                <Layout pageProps={pageProps}>
                  <Component {...pageProps} key={router.route} />
                </Layout>
                <ToastContainer />
                <ManagedModal />
                <ManagedDrawer />
              </>
            </ManagedUIContext>
          </AuthProvider>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(CustomApp);

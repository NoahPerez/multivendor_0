import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import Header from '@components/layout/header/header-seven';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow pt-16 lg:pt-20"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Layout;

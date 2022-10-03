import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

interface FooterProps {
  variant?: 'default' | 'medium';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => (
  <footer className="mt-[50px] lg:mt-14 2xl:mt-16">
    <Widgets widgets={widgets} variant={variant} />
    <Copyright payment={payment} variant={variant} />
  </footer>
);

export default Footer;

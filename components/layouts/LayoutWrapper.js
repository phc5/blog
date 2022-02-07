import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from '@/components/Link';
import SectionContainer from '@/components/SectionContainer';
import MobileNav from '@/components/MobileNav';
import ThemeSwitch from '@/components/ThemeSwitch';
import SocialIcon from '@/components/social-icons/index';

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="h-6 text-2xl font-sans font-semibold">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:flex">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-sans text-sm font-semibold text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
              <SocialIcon
                kind="github"
                href={siteMetadata.github}
                size="6"
                styles="p-1 sm:p-4 hover:text-blue-500"
              />
              <SocialIcon
                kind="linkedin"
                href={siteMetadata.linkedin}
                size="6"
                styles="p-1 sm:p-4"
              />
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;

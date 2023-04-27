import { useEffect, useMemo } from 'react';
import CountUp from 'react-countup';

import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';

export default function Home() {
  const yearsOfExperience = useMemo(() => {
    const ageDifferenceInMillisecond = Date.now() - new Date('2017/01/01');
    return Math.abs(
      new Date(ageDifferenceInMillisecond).getUTCFullYear() - 1970
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.opacity-0');
      [...elements].forEach((element) => element.classList.add('opacity-100'));
    }, 0);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="mb-24">
        <div className="text-center !mb-12 md:!mb-24">
          <h1 className="text-5xl !mb-2 font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-7xl">
            Paul Chong
          </h1>
          <h2 className="text-4xl !mb-2 font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
            Software Engineer
          </h2>
          <h3 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
            Based in California
          </h3>
        </div>

        <div className="flex flex-wrap md:flex-nowrap">
          <picture className="!mb-12 md:!mb-0 w-full md:order-2 md:flex md:w-2/4 opacity-0 transition-opacity duration-700 ease-in delay-600">
            <img
              width={250}
              sizes="(max-width: 1026px) 100vw, 1026px"
              srcSet="/assets/blog/authors/paul_200.jpg 200w,/assets/blog/authors/paul_391.jpg 391w,/assets/blog/authors/paul_526.jpg 526w,/assets/blog/authors/paul_677.jpg 677w,/assets/blog/authors/paul_805.jpg 805w,/assets/blog/authors/paul_941.jpg 941w,/assets/blog/authors/paul_1062.jpg 1062w"
              src="/assets/blog/authors/paul_1026.jpg"
              alt="Paul Chong's portrait"
              className="m-auto object-cover align-middle block rounded-2xl opacity-0 transition-opacity duration-700 ease-in delay-1000"
            />
          </picture>

          {/* Left Section */}
          <div className="w-2/3 md:order-1 md:w-1/4">
            <div className="opacity-0 transition-opacity duration-700 ease-in delay-100">
              <h3 className="font-sans text-sm text-gray-400">BIOGRAPHY</h3>
              <div className="h-8"></div>
              <p className="text-xl font-medium leading-relaxed">
                Front End Engineer at Meta who is building developer
                infrastructure and tools. Based in Southern California.
              </p>
            </div>
            <div className="h-16"></div>
            <div className="opacity-0 transition-opacity duration-700 ease-in delay-200">
              <h3 className="font-sans text-sm text-gray-400">COMPANIES</h3>
              <div className="h-8"></div>
              <div className="text-xl font-medium">
                <a
                  href="https://about.facebook.com/meta/"
                  className="hover:underline hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta
                </a>
                <br />
                <a
                  href="https://www.aws.amazon.com/"
                  className="hover:underline hover:text-amber-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amazon Web Services
                </a>
                <br />
                <a
                  href="https://www.kbb.com/"
                  className="hover:underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kelley Blue Book
                </a>
              </div>
            </div>
          </div>
          {/* Left Section */}

          {/* Right Section */}
          <div className="w-1/3 text-right md:order-3 md:w-1/4">
            <div className="opacity-0 transition-opacity duration-700 ease-in delay-300">
              <h3 className="text-sm text-gray-400">
                YEARS OF <br />
                EXPERIENCE
              </h3>
              <div className="h-8"></div>
              <p className="text-2xl md:text-4xl font-medium">
                <CountUp end={yearsOfExperience} duration={0.25} delay={0.5} />
              </p>
            </div>
            <div className="h-16"></div>
            <div className="opacity-0 transition-opacity duration-700 ease-in delay-400">
              <h3 className="font-sans text-sm text-gray-400 ">TECH</h3>
              <div className="h-8"></div>
              <p className="text-xl font-medium">
                JavaScript
                <br />
                React
                <br />
                GraphQL
                <br />
                Tailwind CSS
              </p>
            </div>
          </div>
          {/* Right Section */}
        </div>
      </div>
    </>
  );
}

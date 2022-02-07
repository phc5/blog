/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from './Image';
import CustomLink from './Link';
import Pre from './Pre';

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`./layouts/PostLayout`).default;
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout components={MDXComponents} {...rest} />;
};

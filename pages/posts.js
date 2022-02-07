import Tag from '@/components/Tag';
import Link from '@/components/Link';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/components/layouts/ListLayout';
import { PageSEO } from '@/components/SEO';

import { getAllTags } from '@/lib/tags';
import kebabCase from '@/lib/utils/kebabCase';

export const POSTS_PER_PAGE = 5;

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  const tags = await getAllTags('blog');

  return {
    props: { initialDisplayPosts, posts, pagination, tags },
  };
}

export default function Blog({ posts, initialDisplayPosts, pagination, tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />

      <div id="tags" className="mt-12 mb-24 space-y-2">
        <h2 className="text-3xl font-extrabold border-b-2 pb-2 leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Tags
        </h2>
        <ul className="flex ">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

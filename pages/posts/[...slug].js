import PageTitle from '@/components/PageTitle';
import { MDXLayoutRenderer } from '@/components/MDXComponents';
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from '@/lib/mdx';

export async function getStaticPaths() {
  const posts = getFiles('blog');
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog');
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join('/')
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug('blog', params.slug.join('/'));
  const authorList = post.frontMatter.authors || ['default'];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author]);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  return { props: { post, authorDetails, prev, next } };
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
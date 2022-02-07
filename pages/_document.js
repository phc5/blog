import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as fs from 'fs';
import * as path from 'path';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <InlineStylesHead />

        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white transition-colors duration-200 ease-in">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// in _document.ts
class InlineStylesHead extends Head {
  getCssLinks = ({ allFiles }) => {
    const { assetPrefix } = this.context;
    if (!allFiles || allFiles.length === 0) return null;

    return allFiles
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(
              path.join(process.cwd(), '.next', file),
              'utf-8'
            ),
          }}
        />
      ));
  };
}

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const rootUrl = window.location.href.split('/').slice(0, 3).join('/');

        return (
          <>
            <Layout
              title={`Hello from the other side`}
              description="Description will go into a meta tag in <head />"
            >
              <Head>
                <meta
                  name="google-site-verification"
                  content="dHh5c5B9VBRFZTjNEITlh3SS4o5qjHtdMCIVbqzCknc"
                />
              </Head>
              <main>
                <HomepageFeatures />
              </main>
            </Layout>
          </>
        );
      }}
    </BrowserOnly>
  );
}

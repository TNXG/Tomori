import { postslist } from "@/lib/utils";
import type { BlogItem } from "@/lib/utils";
import { SiteConfig } from "@/config";
import Head from "next/head";

import Homepage from "@/layouts/homepage";

export async function getStaticProps() {
  let articles: BlogItem[] = [];

  try {
    articles = await postslist();
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  return {
    props: {
      articles,
    },
  };
}

export default function Home({ articles }: { articles: BlogItem[] }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{SiteConfig.title}</title>
      </Head>
      <Homepage articles={articles} />
    </>
  );
}

import client from "../../../sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
  );
  return slugs.map((slug: string) => ({ slug }));
}

export default async function BlogPostPage(props: any) {
  const params = await props.params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage {
        asset->{url}
      },
      publishedAt
    }`,
    { slug: params.slug },
  );

  if (!post) return notFound();

  return (
    <main className="mx-auto mt-12 mb-24 max-w-3xl rounded-2xl bg-white px-4 py-40 shadow-lg">
      <h1 className="font-PPItalic mb-4 text-center text-4xl leading-tight text-gray-900 md:text-6xl">
        {post.title}
      </h1>
      {post.publishedAt && (
        <p className="mb-6 text-center text-sm text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          className="mx-auto mb-8 max-h-[420px] w-full rounded-xl object-cover"
        />
      )}
      <div className="prose prose-lg font-NHD mx-auto max-w-none text-gray-800">
        <PortableText value={post.body} />
      </div>
    </main>
  );
}

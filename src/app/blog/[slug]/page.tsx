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
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>{post.title}</h1>
      {post.publishedAt && (
        <p style={{ color: "#888", fontSize: 14 }}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          style={{ maxWidth: "100%", borderRadius: 8 }}
        />
      )}
      <div style={{ color: "#444", marginTop: 16 }}>
        <PortableText value={post.body} />
      </div>
    </main>
  );
}

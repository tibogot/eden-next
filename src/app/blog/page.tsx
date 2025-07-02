import client from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await client.fetch(
    `*[_type == "post"]|order(_createdAt desc){
      _id,
      title,
      slug,
      mainImage {
        asset->{url}
      },
      publishedAt,
      body
    }`,
  );

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>Blog</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post: any) => (
          <li key={post._id} style={{ marginBottom: 32 }}>
            <Link href={`/blog/${post.slug.current}`}>
              <h2>{post.title}</h2>
            </Link>
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
            <div style={{ color: "#444", marginTop: 8 }}>
              <PortableText value={post.body.slice(0, 1)} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

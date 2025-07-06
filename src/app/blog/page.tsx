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
    <main className="bg-[#FAF3EB] px-4 py-40">
      <h1 className="font-PPRegular mb-12 text-center text-4xl text-gray-800 md:text-6xl">
        Events
      </h1>
      <ul className="grid gap-10 md:grid-cols-3">
        {posts.map((post: any) => (
          <li key={post._id} className="flex flex-col overflow-hidden">
            <Link href={`/blog/${post.slug.current}`} className="block">
              {post.mainImage && (
                <div className="relative h-56 w-full bg-[#f3e7d8]">
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between py-6">
                <div>
                  {post.publishedAt && (
                    <p className="font-NHD mb-2 text-xs text-stone-400">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                  <h2 className="font-PPRegular mb-2 text-2xl leading-tight text-gray-800 md:text-3xl">
                    {post.title}
                  </h2>

                  <div className="font-NHD mb-2 line-clamp-3 text-base text-stone-600 md:text-lg">
                    {post.body && (
                      <PortableText value={post.body.slice(0, 1)} />
                    )}
                  </div>
                </div>
                <span className="font-NHD mt-2 inline-block text-base text-lime-900">
                  Read more →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

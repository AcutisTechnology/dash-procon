"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Posts = () => {
  const router = useRouter();

  const fetchPosts = async () => {
    const { data } = await axios.get(
      "https://proconsr.pb.gov.br/wp-json/wp/v2/posts"
    );
    const postsWithImages = await Promise.all(
      data.map(async (post: any) => {
        const imageResponse = await axios.get(
          `https://proconsr.pb.gov.br/wp-json/wp/v2/media?parent=${post.id}`
        );
        const imageUrl =
          imageResponse.data.length > 0
            ? imageResponse.data[0].source_url
            : null;
        return { ...post, imageUrl };
      })
    );
    return postsWithImages;
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts: {error.message}</div>;

  console.log(posts);

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Início</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span
            className="cursor-pointer"
            onClick={() => router.push("/posts")}
          >
            Postagens
          </span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Publicações</h3>
      <Divider />

      <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex gap-4 flex-col">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-4 shadow-sm rounded-lg gap-4 flex flex-row"
          >
            {post.imageUrl?.endsWith(".pdf") ? null : (
              <img
                src={post.imageUrl}
                alt="Post thumbnail"
                width={300}
                className="rounded"
              />
            )}
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-semibold">{post.title.rendered}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.rendered.slice(0, 800),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostProps {
  imageUrl: string;
  id: number;
  title: {
    rendered: string;
  };
}

const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://proconsr.pb.gov.br/wp-json/wp/v2/posts"
  );
  const postsWithImages = await Promise.all(
    data.map(async (post: PostProps) => {
      const imageResponse = await axios.get(
        `https://proconsr.pb.gov.br/wp-json/wp/v2/media?parent=${post.id}`
      );
      const imageUrl =
        imageResponse.data.length > 0 ? imageResponse.data[0].source_url : null;
      return { ...post, imageUrl };
    })
  );
  return postsWithImages;
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // Adicione as configurações de React Query conforme necessário, como refetchInterval, etc.
  });
};

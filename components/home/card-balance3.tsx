import { Card, CardBody } from "@nextui-org/react";
import { usePosts } from "../hooks/usePosts";
import { Community } from "../icons/community";

export const CardBalance3 = () => {
  const { data: posts } = usePosts();

  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Postagens</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-900 text-xl font-semibold">
            {posts?.length} posts
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

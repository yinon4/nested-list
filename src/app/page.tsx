// import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CrudShowcase />
      </div>
    </main>
  );
};

const CrudShowcase = async () => {
  const rootPosts = await api.line.getRoots();
  const childPosts = await api.line.getChildren({
    id: "clu8uveok000010hzsk7l18bj",
  });

  return (
    <div className="w-full max-w-xs">
      {childPosts.length ? (
        childPosts.map((post) => <div key={post.id}>{post.body}</div>)
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
};

export default Page;

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export const CreatePost = () => {
  const router = useRouter();
  const [body, setBody] = useState("");

  const createPost = api.line.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setBody("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({
          body,
          parents: [{ id: "clu8uveok000010hzsk7l18bj" }],
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

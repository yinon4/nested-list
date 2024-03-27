import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lineRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        body: z.string(),
        parents: z.array(z.object({ id: z.string() })).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.line.create({
        data: {
          parents: {
            connect: input.parents,
          },
          body: input.body,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.line.findMany();
  }),

  getRoots: publicProcedure.query(({ ctx }) => {
    return ctx.db.line.findMany({ where: { parents: { none: {} } } });
  }),

  getChildren: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.line.findMany({
        where: { parents: { some: { id } } },
      });
    }),
});

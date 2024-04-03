import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default("0").transform(Number),
        }),
        response: {
            200: z.object({
                attendees: z.array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        email: z.string().email(),
                        createdAt: z.date(),
                        checkInAt: z.date().nullable(),
                    })
                )
            })
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      const { pageIndex, query } = request.query;

      const attendees = await prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          CreatedAt: true,
          checkIn: {
            select: {
              CreatedAt: true,
            },
          },
        },
        where: query
          ? {
              eventId,
              name: {
                contains: query,
              },
            }
          : {
              eventId,
            },
        take: 10,
        skip: pageIndex * 10,
        orderBy:{
            CreatedAt:'desc'
        }
      });

      return reply.send({
        attendees: attendees.map((attendee) => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.CreatedAt,
            checkInAt: attendee.checkIn?.CreatedAt ?? null,
          };
        }),
      });
    }
  );
}

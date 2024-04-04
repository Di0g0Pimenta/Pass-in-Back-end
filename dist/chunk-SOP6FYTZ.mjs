import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event.ts
import { z } from "zod";
async function getEvent(app) {
  app.withTypeProvider().get(
    "/events/:eventId",
    {
      schema: {
        summary: "Get an event",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maxAttendis: z.number().int().nullable(),
              attendeesAmount: z.number().int()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maxAttendees: true,
          _count: {
            select: {
              Attendee: true
            }
          }
        },
        where: {
          id: eventId
        }
      });
      if (event === null) {
        throw new BadRequest("Event not found.");
      }
      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maxAttendis: event.maxAttendees,
          attendeesAmount: event._count.Attendee
        }
      });
    }
  );
}

export {
  getEvent
};

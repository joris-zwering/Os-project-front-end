// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

async function upsertNode({ nodeId }: { nodeId: number }) {
   const prisma = new PrismaClient();

   await prisma.node.upsert({
      where: {
         nodeId: nodeId,
      },
      create: {
         nodeId: nodeId,
      },
      update: {
         nodeId: nodeId,
      },
   });
   await prisma.$disconnect();
}

async function createAlert({ nodeId }: { nodeId: number }) {
   const prisma = new PrismaClient();

   await prisma.alerts.create({
      data: {
         node: {
            connect: {
               nodeId: nodeId,
            },
         },
      },
   });
   await prisma.$disconnect();
}

async function getLogsFromNode(nodeId: number) {
   const prisma = new PrismaClient();
   const data = await prisma.log.findMany({
      where: {
         nodeId: nodeId,
      },
      select: {
         node: true,
         loggedAt: true,
         logId: true,
         temperature: true,
         pressure: true,
         humidity: true,
      },
   });
   return data;
}

async function getAllLogsPerNode() {
   const prisma = new PrismaClient();
   const data = await prisma.log.findMany({
      select: {
         node: true,
         loggedAt: true,
         logId: true,
         temperature: true,
         pressure: true,
         humidity: true,
      },
   });
   return data;
}

const expectedLogs = [
   {
      node: 4,
      hum: 30,
      temp: 22,
      pres: 30,
      logged_at: 1675770480,
   },
];

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "POST") {
      req.body.map(async (log) => {
         console.log(log);
         await upsertNode({ nodeId: log.nodeId });
         await createAlert({
            nodeId: log.nodeId,
         });
      });
      res.status(200).json({ succeed: true });
   }
}

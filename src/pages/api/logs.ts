// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

const prisma = new PrismaClient();
async function upsertNode({ nodeId }: { nodeId: number }) {
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

async function createLog({
   nodeId,
   temperature,
   humidity,
   pressure,
   loggedAt,
}: {
   nodeId: number;
   temperature: number;
   humidity: number;
   pressure: number;
   loggedAt: Date;
}) {
   await prisma.log.create({
      data: {
         node: {
            connect: {
               nodeId: nodeId,
            },
         },
         humidity: humidity,
         temperature: temperature,
         loggedAt: loggedAt,
         pressure: pressure,
      },
   });
   await prisma.$disconnect();
}

async function getLogsFromNode(nodeId: number) {
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
      orderBy: {
         loggedAt: "asc",
      },
   });
   return data;
}

async function getAllLogsPerNode() {
   const data = await prisma.log.findMany({
      select: {
         node: true,
         loggedAt: true,
         logId: true,
         temperature: true,
         pressure: true,
         humidity: true,
      },
      orderBy: {
         loggedAt: "desc",
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
         await createLog({
            nodeId: log.nodeId,
            temperature: log.temperature,
            humidity: log.humidity,
            pressure: log.pressure,
            loggedAt: new Date(log.logged_at * 1000),
         });
      });
      res.status(200).json({ succeed: true });
   } else if (req.method === "GET" && req?.query?.nodeId) {
      const logs = await getLogsFromNode(parseInt(req.query.nodeId as string));
      res.status(200).json({ logs });
   } else if (req.method === "GET") {
      const logs = await getAllLogsPerNode();
      const groupedLogs = _.groupBy(logs, "node.nodeId");
      res.status(200).json({ ...groupedLogs });
   }
}

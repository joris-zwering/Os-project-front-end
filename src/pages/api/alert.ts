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

async function createAlert({
   nodeId,
   temperature,
   humidity,
   pressure,
}: {
   nodeId: number;
   temperature: number;
   humidity: number;
   pressure: number;
}) {
   await prisma.alerts.create({
      data: {
         pressure: pressure,
         humidity: humidity,
         temperature: temperature,
         node: {
            connect: {
               nodeId: nodeId,
            },
         },
      },
   });
   await prisma.$disconnect();
}

async function getActiveAlerts() {
   const data = await prisma.alerts.findMany({
      where: {
         alertActive: true,
      },
      distinct: ["nodeId"],
   });
   return data;
}

async function deleteAlertForNodes(nodeId) {
   await prisma.alerts.updateMany({
      where: {
         alertActive: true,
         nodeId: nodeId,
      },
      data: {
         alertActive: false,
      },
   });
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "POST") {
      await upsertNode({ nodeId: req.body.nodeId });
      await createAlert({
         nodeId: req.body.nodeId,
         temperature: req.body.temperature,
         humidity: req.body.humidity,
         pressure: req.body.pressure,
      });
      res.status(200).json({ succeed: true });
   } else if (req.method === "GET") {
      const alerts = await getActiveAlerts();
      res.status(200).json({ ...alerts });
   } else if (req.method === "DELETE" && req.query.nodeId) {
      await deleteAlertForNodes(parseInt(req.query.nodeId as string));
      res.status(200).json({ success: true });
   }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("merda")
  if (req.method === "GET") {
    // get all projects
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } else if (req.method === "POST") {
    // create project
    const title = JSON.parse(req.body).title;
    const project = await prisma.project.create({
      data: { title },
    });
    res.json(project);
  } else if (req.method === "PUT") {
    // update project
    const id = req.query.projectId as string;
    const data = JSON.parse(req.body);
    const project = await prisma.project.update({
      where: { id },
      data,
    });
    res.json(project);
  } else if (req.method === "DELETE") {
    // delete project
    const id = req.query.projectId as string;
    await prisma.project.delete({ where: { id } });
    res.json({ status: "ok" });
  }
};

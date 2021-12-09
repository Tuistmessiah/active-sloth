import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// TODO: Do we need to have a PrismaClient per endpoint
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            break;
        // (Create Task in Project) http://localhost:3000/api/projects/${projectId}/tasks?taskId=${taskId}
        case 'POST':
            const projectId = req.query.projectId as string;
            const task = await prisma.task.create({
                data: { text: JSON.parse(req.body).text, completed: false, cost: 0, projectId },
            });
            res.json(task);
            break;
        // (Update a Task in Project) http://localhost:3000/api/projects/${projectId}/tasks
        case 'PUT':
            {
                const taskId = req.query.taskId as string;
                // TODO: return invalid when no taskId is passed
                const task = await prisma.task.update({
                    where: { id: taskId },
                    data: JSON.parse(req.body),
                });
                res.json(task);
            }
            break;
        // (Delete a Task in Project) http://localhost:3000/api/projects/${projectId}/tasks
        case 'DELETE':
            {
                const taskId = req.query.taskId as string;
                // TODO: return invalid when no taskId is passed
                await prisma.todo.delete({ where: { id: taskId } });
                res.json({ status: 'ok' });
            }
            break;
    }
};

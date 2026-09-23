import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, priority, status, dueDate, userId } = body;

  if (!title || !userId) {
    return NextResponse.json({ error: 'title and userId are required' }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority: priority ?? 'MEDIUM',
      status: status ?? 'TODO',
      dueDate: dueDate ? new Date(dueDate) : null,
      userId,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
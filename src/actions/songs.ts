"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeSong(songId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = (session.user as any).id;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_songId: { userId, songId },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: { userId, songId },
    });
  }

  revalidatePath(`/song/${songId}`);
}

export async function addComment(songId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = (session.user as any).id;

  await prisma.comment.create({
    data: {
      content,
      userId,
      songId,
    },
  });

  revalidatePath(`/song/${songId}`);
}

export async function submitSong(data: {
  title: string;
  videoUrl: string;
  teamId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = (session.user as any).id;

  await prisma.submission.create({
    data: {
      ...data,
      userId,
      status: "PENDING",
    },
  });
}

export async function approveSubmission(submissionId: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
  });

  if (!submission) throw new Error("Submission not found");

  // Create the song from the submission
  await prisma.song.create({
    data: {
      title: submission.title,
      videoUrl: submission.videoUrl,
      teamId: submission.teamId,
      slug: `${submission.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    },
  });

  // Update submission status
  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/admin");
}

export async function rejectSubmission(submissionId: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: "REJECTED" },
  });

  revalidatePath("/admin");
}

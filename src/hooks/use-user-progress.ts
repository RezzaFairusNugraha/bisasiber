"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INITIAL_TASKS, type RoomTaskItem } from "@/lib/mock-data";

export interface UserProfileSummary {
  id: number;
  username: string;
  fullName: string;
  rankTitle: string;
  points: number;
  streakDays: number;
  completedRooms: number;
  activeRooms: number;
}

export interface ProgressResponse {
  user: UserProfileSummary;
  completedTaskIds: number[];
  tasks: RoomTaskItem[];
}

export interface SubmitFlagPayload {
  taskId: number;
  flag: string;
}

export interface SubmitFlagResult {
  success: boolean;
  message: string;
  completedTaskIds?: number[];
  pointsEarned?: number;
}

export function useUserProgress() {
  return useQuery<ProgressResponse>({
    queryKey: ["user-progress"],
    queryFn: async () => {
      const res = await fetch("/api/progress");
      if (!res.ok) {
        throw new Error("Gagal mengambil data progres pengguna");
      }
      return res.json() as Promise<ProgressResponse>;
    },
    initialData: {
      user: {
        id: 1,
        username: "siber_pejuang",
        fullName: "Pratama Siber",
        rankTitle: "Cyber Defender Lv. 4",
        points: 450,
        streakDays: 7,
        completedRooms: 3,
        activeRooms: 4,
      },
      completedTaskIds: [101],
      tasks: INITIAL_TASKS,
    },
  });
}

export function useSubmitFlag() {
  const queryClient = useQueryClient();

  return useMutation<SubmitFlagResult, Error, SubmitFlagPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json() as Promise<SubmitFlagResult>;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user-progress"] });
      }
    },
  });
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface LabInstanceState {
  id: number;
  roomId: number;
  containerId: string;
  ipAddress: string;
  sshPort: number;
  webPort: number;
  status: "starting" | "running" | "stopped";
  startedAt: string;
  expiresAt: string;
}

interface LabApiResponse {
  lab: LabInstanceState | null;
  message?: string;
}

export function useLabInstance() {
  return useQuery<LabApiResponse>({
    queryKey: ["lab-instance"],
    queryFn: async () => {
      const res = await fetch("/api/labs");
      if (!res.ok) {
        throw new Error("Gagal memuat status container lab");
      }
      return res.json() as Promise<LabApiResponse>;
    },
  });
}

export function useManageLabInstance() {
  const queryClient = useQueryClient();

  return useMutation<
    LabApiResponse,
    Error,
    { action: "start" | "stop" | "reset"; roomId?: number }
  >({
    mutationFn: async (payload) => {
      const res = await fetch("/api/labs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Gagal mengeksekusi aksi pada container lab");
      }
      return res.json() as Promise<LabApiResponse>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["lab-instance"], data);
    },
  });
}

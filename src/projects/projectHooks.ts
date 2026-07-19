import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { projectAPI } from "./projectAPI";
import type { Project } from "./Project";

// Hook for fetching projects
export function useProjects() {
  const [page, setPage] = useState(0);
  const queryInfo = useQuery({
    queryKey: ["projects", page],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData,
  });

  console.log("queryInfo", queryInfo);
  return { ...queryInfo, page, setPage };
}

// Hook for saving a project
export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectAPI.put(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

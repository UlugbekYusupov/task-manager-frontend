import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../app/api/projectApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useProjects = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return useQuery({
    queryKey: ["projects", token],
    queryFn: () => fetchProjects(token || ""),
    enabled: !!token,
  });
};

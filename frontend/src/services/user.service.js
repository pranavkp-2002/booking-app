import "server-only";
import { api } from "./http";

export const userService = {
  list: async () => (await api.get("/users")).users,
};

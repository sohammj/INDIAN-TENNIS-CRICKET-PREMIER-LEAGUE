import { requireRoles } from "./auth.middleware";

export const requireAdmin = requireRoles("ADMIN");
export const requireAdminOrScorer = requireRoles("ADMIN", "SCORER");
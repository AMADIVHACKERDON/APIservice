export const COLLABORATION_STATUSES = [
    "new",
    "reviewing",
    "contacted",
    "accepted",
    "declined",
  ] as const;
  
  export type CollaborationStatus =
    (typeof COLLABORATION_STATUSES)[number];
  
  export const COLLABORATION_STATUS_LABELS: Record<
    CollaborationStatus,
    string
  > = {
    new: "New",
    reviewing: "Reviewing",
    contacted: "Contacted",
    accepted: "Accepted",
    declined: "Declined",
  };
  
  export const COLLABORATION_STATUS_STYLES: Record<
    CollaborationStatus,
    string
  > = {
    new: "bg-blue-100 text-blue-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    contacted: "bg-purple-100 text-purple-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-700",
  };
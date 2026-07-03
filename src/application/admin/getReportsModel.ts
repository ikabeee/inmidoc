import { reportTickets } from "@/src/domain/mocks/inmidoc";

export function getReportsModel() {
  return {
    tickets: reportTickets,
    selectedTicket: reportTickets[0],
  };
}

export function newTicketCreationText(ticketsCount: number) {
  const message = [`🔷 New Ticket is received`, `Total: ${ticketsCount}`].join(
    "\n"
  );

  return message;
}

export function newQaCreationText() {
  const message = [`🔷 Dear Tutor`, `New QA is received`].join("\n");

  return message;
}

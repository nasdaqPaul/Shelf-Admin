class DBOpenError extends Error {
  constructor(event: Event) {
    //@ts-ignore
    super(event.target);
  }
}

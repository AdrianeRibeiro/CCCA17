export default class Observer {
  handlers: { event: string, callback: Function }[]

  constructor() {
    this.handlers = []
  }

  register(event: string, callback: Function): void {
    this.handlers.push({ event, callback })
  }

  async notify (event: string, data: any) {
    for (const handler of this.handlers) {
      if (handler.event === event) {
        await handler.callback(data)
      }
    }
  }
}
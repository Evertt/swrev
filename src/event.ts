import { Subject } from "rxjs"

export class EventEmitter {
  private subjects: Record<string, Subject<any>> = {}

  listen<T = any>(name: string, handler: (payload: T) => void) {
    this.subjects[name] || (this.subjects[name] = new Subject())
    return this.subjects[name].subscribe(handler)
  }

  emit<T = any>(name: string, payload: T) {
    this.subjects[name] || (this.subjects[name] = new Subject())
    this.subjects[name].next(payload)
  }

  dispose() {
    for (const prop in this.subjects) {    
      this.subjects[prop].complete()
    }
    
    this.subjects = {}
  }
}

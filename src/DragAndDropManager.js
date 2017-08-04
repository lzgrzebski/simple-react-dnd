export default class DragAndDropManager {
  constructor() {
    this.active = null;
    this.subscriptions = [];
    this.id = -1;
  }

  setActive(activeProps) {
    this.active = activeProps;
    this.subscriptions.forEach(subscription => subscription());
  }

  subscribe(callback) {
    this.id += 1;
    this.subscriptions.push({
      callback,
      id: this.id,
    });

    return this.id;
  }

  unsubscribe(id) {
    this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
  }

}

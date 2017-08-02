export default class DragAndDropManager {
  constructor() {
    this.active = null;
    this.subscriptions = [];
  }

  setActive(activeProps) {
    this.active = activeProps;
    this.subscriptions.forEach(subscription => subscription());
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
  }

}

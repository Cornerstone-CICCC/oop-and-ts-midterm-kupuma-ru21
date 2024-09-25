export class Component {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  async render() {
    throw new Error("Component should have a render() method!");
  }

  async mount(container) {
    this.element = await this.render();
    container.appendChild(this.element);
  }
}

export class Pila<T> {
  #items: T[] = [];

  push(x: T) {
    this.#items.push(x);
  }

  pop() {
    return this.#items.pop();
  }

  tope() {
    return this.#items[this.#items.length - 1];
  }

  get vacia() {
    return this.#items.length === 0;
  }

  get tamanio() {
    return this.#items.length;
  }

  aArray() {
    return [...this.#items];
  }
}

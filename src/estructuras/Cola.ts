// No usa shift(): guarda el indice del frente y lo va avanzando.
export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(x: T) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#frente++;
    return x;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }

  aArray() {
    return this.#items.slice(this.#frente);
  }
}

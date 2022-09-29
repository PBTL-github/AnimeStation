export class Water {
  private options: any;
  private item: any;
  constructor(options: any) {
    this.options = options;
  }

  public init(): void {
    this.item = document.querySelector(this.options.el).children;
  }
}

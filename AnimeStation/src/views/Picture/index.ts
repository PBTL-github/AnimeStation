export interface ImageList {
  imgIndex: number;
  imgUrl: string;
  isShow: boolean;
}

interface WaterFullOptions {
  columnGap: number;
  columnWidth: number;
}

export class WaterFull {
  private columnGap: number = 15; // 列表间距
  private columnWidth: number = 206; // 列表单个宽度
  private container: HTMLElement; // 瀑布流布局容器
  private columnCount: number = 0; // 列表列数
  private columnHeights: Array<any>; // 列表单个高度

  /**
   * @description: 初始化瀑布流布局
   * @param {HTMLElement} container 瀑布流布局容器
   * @param {WaterFullOptions} options {columnGap, columnWidth} -> {列表间距，列表单个宽度}
   * @return {*}
   */
  constructor(container?: HTMLElement, options?: WaterFullOptions) {
    if (container) {
      this.container = container;
    }
    if (options) {
      this.columnGap = options.columnGap;
      this.columnWidth = options.columnWidth;
    }
  }

  /**
   * @description: 设置瀑布流布局容器
   * @param {HTMLElement} container -> 瀑布流布局容器
   * @return {*}
   */
  public resetContainer(container: HTMLElement): void {
    this.container = container;
  }

  /**
   * @description: 初始化图片布局
   * @param {Array} cells html元素数组
   * @return {*}
   */
  public initWaterFull(cells?: Array<HTMLElement>): void {
    this.resetColumnCount();
    this.resetColumnHeights();
    if (cells) {
      this.adjustCells(cells);
    }
  }

  /**
   * @description: 计算容器可容纳列数
   * @return {*}
   */
  public resetColumnCount(): void {
    this.columnCount = Math.max(
      2,
      Math.floor(
        (this.container.offsetWidth + this.columnGap) / (this.columnWidth + this.columnGap)
      )
    );
  }

  /**
   * @description: 初始化每个列表高度
   * @return {*}
   */
  public resetColumnHeights(): void {
    this.columnHeights = new Array(this.columnCount).fill(0);
  }

  /**
   * @description: 获取当前以运算的最小列表高度
   * @return {*}
   */
  public getMinHeight(): number {
    return Math.min(...this.columnHeights);
  }

  /**
   * @description: 元素定位布局
   * @param {Array} cells 元素数组
   * @return {*}
   */
  public adjustCells(cells: Array<HTMLElement>): void {
    cells.forEach((cell) => {
      const minHeight = Math.min(...this.columnHeights);
      const indexOfMinHeight = this.columnHeights.indexOf(minHeight);
      cell.style.left = indexOfMinHeight * (this.columnWidth + this.columnGap) + "px";
      cell.style.top = minHeight + "px";
      this.columnHeights[indexOfMinHeight] = minHeight + this.columnGap + cell.offsetHeight;
    });
    this.container.style.height = Math.max(...this.columnHeights) + "px";
  }
}

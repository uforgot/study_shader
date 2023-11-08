export interface IRange {
  min: number;
  max: number;
}

export default class UtilMath {
  public static PI: number = Math.PI;

  /**
   * num 값으로 들어온 값의 최소 최대값 에 대한 계산
   * @param num
   * @returns {number}
   * @param range
   */
  public static clamp(num: number, range: IRange): number {
    if (range.max < range.min) {
      const targetMax: number = range.min;
      range.min = range.max;
      range.max = targetMax;
    }

    if (num < range.min) return range.min;
    else if (num > range.max) return range.max;

    return num;
  }

  /**
   * amount 를 mix max 값의 상대값으로 리턴
   * @returns {number}
   * @param num
   * @param range
   */
  public static lerp(num: number, range: IRange): number {
    return range.min + num * (range.max - range.min);
  }

  /**
   * min1 max1 의 num 값을 min2 max2 로 변환
   * @param num
   * @param currentRange
   * @param targetRange
   * @param round
   * @param constrainMin
   * @param constrainMax
   * @returns {number}
   */
  public static map(
    num: number,
    currentRange: IRange,
    targetRange: IRange,
    round = false,
    constrainMin = true,
    constrainMax = true
  ): number {
    if (constrainMin && num < currentRange.min) return targetRange.min;
    if (constrainMax && num > currentRange.max) return targetRange.max;

    const num1 =
      (num - currentRange.min) / (currentRange.max - currentRange.min);
    const num2 = num1 * (targetRange.max - targetRange.min) + targetRange.min;
    if (round) return Math.round(num2);
    return num2;
  }
}

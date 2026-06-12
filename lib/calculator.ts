/**
 * 장기 렌트 및 오토리스 월 납입금 계산 로직
 */

interface CalculationParams {
  price: number;
  prepayRatio: number;
  termMonths: number;
  residualRatio: number;
  interestRate: number;
  isRent: boolean;
  insurancePerMonth?: number;
  taxPerMonth?: number;
}

export function calculateMonthlyPayment(params: CalculationParams): number {
  const {
    price,
    prepayRatio,
    termMonths,
    residualRatio,
    interestRate,
    isRent,
    insurancePerMonth = 0,
    taxPerMonth = 0,
  } = params;

  const P = price;
  const A = price * prepayRatio;
  const RV = price * residualRatio;
  const N = termMonths;
  const r = interestRate / 12;

  if (r === 0) {
    const M_pure_zero = ((P - A) - RV) / N;
    return isRent ? M_pure_zero + insurancePerMonth + taxPerMonth : M_pure_zero;
  }

  const rvDiscounted = RV / Math.pow(1 + r, N);
  const numerator = ((P - A) - rvDiscounted) * r;
  const denominator = 1 - Math.pow(1 + r, -N);
  
  const M_pure = numerator / denominator;

  let finalPayment = M_pure;
  if (isRent) {
    finalPayment += insurancePerMonth + taxPerMonth;
  }

  return Math.round(finalPayment);
}

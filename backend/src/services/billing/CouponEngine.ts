export interface CouponValidationResult {
  code: string;
  isValid: boolean;
  discountPercent: number;
  message: string;
}

export class CouponEngine {
  public static validateCoupon(code: string): CouponValidationResult {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GENIUS20') {
      return { code: cleanCode, isValid: true, discountPercent: 20, message: 'Applied 20% promotional discount!' };
    }
    if (cleanCode === 'ALPHA50') {
      return { code: cleanCode, isValid: true, discountPercent: 50, message: 'Applied 50% launch discount!' };
    }
    return { code: cleanCode, isValid: false, discountPercent: 0, message: 'Invalid or expired promo code.' };
  }
}

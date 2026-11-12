declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeInitOptions {
    mode: 'sandbox' | 'production';
  }

  export interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal';
    [key: string]: unknown;
  }

  export interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<void>;
    [key: string]: unknown;
  }

  export function load(options: CashfreeInitOptions): Promise<CashfreeInstance | null>;
}

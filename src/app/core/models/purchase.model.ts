export interface Purchase {
	title: string;
	subtitle: string;
	item: PurchaseItem;
}

interface PurchaseItem {
  cover: PurchaseCover;
  title: string;
  subtitle: string;
  button: PurchaseButton;
}

interface PurchaseCover {
  default: string;
  webp: string;
  webp2x: string;
}

interface PurchaseButton {
  title: string;
  routerLink: string;
}
export interface ILookbookForMain {
  id: number;
  title: string;
  sub_title: string;
  thumbnail: string;
}

export interface ILookbookForMainDetail {
  lookbookId: number;
  title: string;
  sub_title: string;
  content: string;
  thumbnail: string;
  images: string[];
  productInfo: IProductInfo;
}

export interface IProductInfo {
  productId: number;
  name: string;
  price: number;
  thumbnail: string;
}

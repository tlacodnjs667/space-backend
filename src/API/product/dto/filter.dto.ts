export class FilterDto {
  mainCategory?: Array<number>;
  item?: Array<number>;
  color?: Array<number>;
  left?: string;
  name?: string;
}
export class FilterDtoForService {
  mainCategory?: Array<number>;
  item?: Array<number>;
  color?: Array<number>;
}

export class ProductListDto extends FilterDtoForService {
  sort?: any;
  count?: any;
  name?: string;
}

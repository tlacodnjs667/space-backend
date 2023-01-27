export class FilterDto {
  mainCategory?: Array<number>;
  item?: any;
  color?: Array<number>;
  left?: string;
  name?: string;
}
export class FilterDtoForService {
  mainCategory?: any;
  item?: Array<number>;
  color?: Array<number>;
}

export class ProductListDto extends FilterDtoForService {
  sort?: string;
  count?: any;
  name?: string;
}

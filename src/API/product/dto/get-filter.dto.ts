export class filterResultDTO {
  color: filterElementDTO[] | undefined;
  item: filterElementDTO[] | undefined;
  gender: filterElementDTO[] | undefined;
}

export class filterElementDTO {
  id: any;
  name: string;
}

// export class orderFilterDto {
//   orderProduct: string;
//   review: string;
//   like: string;
//   new: string;
//   lowPrice: string;
//   highPrice: string;
//   name: string;
// }

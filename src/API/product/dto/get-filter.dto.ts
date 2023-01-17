export class filterResultDTO {
  color: filterElementDTO[] | undefined;
  item: filterElementDTO[] | undefined;
  gender: filterElementDTO[] | undefined;
}

export class filterElementDTO {
  id: any;
  name: string;
}

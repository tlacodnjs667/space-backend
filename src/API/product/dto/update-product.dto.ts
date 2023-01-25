import { PartialType } from '@nestjs/mapped-types';
import { FindProductDto } from './find-product.dto';

export class UpdateProductDto extends PartialType(FindProductDto) {}

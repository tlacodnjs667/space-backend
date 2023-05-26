import { PartialType } from '@nestjs/mapped-types';
import { WeeklyCodyListDto } from './create-weekly_cody.dto';

export class UpdateWeeklyCodyDto extends PartialType(WeeklyCodyListDto) {}

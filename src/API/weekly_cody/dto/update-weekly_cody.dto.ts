import { PartialType } from '@nestjs/mapped-types';
import { CreateWeeklyCodyDto } from './create-weekly_cody.dto';

export class UpdateWeeklyCodyDto extends PartialType(CreateWeeklyCodyDto) {}

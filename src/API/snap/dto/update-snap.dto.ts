import { PartialType } from '@nestjs/mapped-types';
import { CreateSnapDto } from './create-snap.dto';

export class UpdateSnapDto extends PartialType(CreateSnapDto) {}

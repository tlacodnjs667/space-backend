import { PartialType } from '@nestjs/mapped-types';
import { SnapDto } from './create-snap.dto';

export class UpdateSnapDto extends PartialType(SnapDto) {}

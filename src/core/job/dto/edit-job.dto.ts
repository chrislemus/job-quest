import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { JobEntity, JobListEntity } from '../entities';

// function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'isLongerThan',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return (
//             typeof value === 'string' &&
//             typeof relatedValue === 'string' &&
//             value.length > relatedValue.length
//           ); // you can return a Promise<boolean> here as well, if you want to make async validation
//         },
//       },
//     });
//   };
// }

type AllowNull = Parameters<typeof ValidateIf>[0];
const allowNull: AllowNull = (_obj, value) => value !== null;

export class EditJobDto implements Omit<JobEntity, 'id'> {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @ValidateIf(allowNull)
  @IsString()
  location: string | null;

  @ValidateIf(allowNull)
  @IsNumber({}, { message: 'must be a number' })
  salary: number | null;

  @ValidateIf(allowNull)
  @IsString()
  description: string | null;

  @ValidateIf(allowNull)
  @IsString()
  jobCardColor: string | null;

  @IsNumber()
  jobListId: JobListEntity['id'];
}

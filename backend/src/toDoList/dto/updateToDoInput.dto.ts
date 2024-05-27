import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateToDoDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field((type) => Int, { nullable: false })
  ownerId: number;
}

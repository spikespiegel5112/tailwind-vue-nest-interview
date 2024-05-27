import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateToDoDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field((type) => Int, { nullable: false })
  ownerId: number;
}

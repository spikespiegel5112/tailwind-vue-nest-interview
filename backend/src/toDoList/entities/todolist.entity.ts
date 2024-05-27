import { DefaultValuePipe } from '@nestjs/common';
import { Default } from 'sequelize-typescript';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ToDoList')
export class ToDoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  content?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}

import { DefaultValuePipe } from '@nestjs/common';
import { Default } from 'sequelize-typescript';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ToDoList')
export class ToDoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  contentName?: string;

  @Column({ nullable: false, default: false })
  checked?: boolean;

  @Column({ nullable: true, default: null })
  content?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;
}

/* eslint-disable max-len */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Users } from './Users.js';
import { UserCards } from './UserCards.js';
import { Installments } from './Installments.js';

@Entity('Outgoings')
export class Outgoings {

	@PrimaryGeneratedColumn()
		id: number;

	@ManyToOne(() => Users, user => user.id)
	@JoinColumn({name: 'user_id'})
		user: Relation<Users>;
		
	@ManyToOne(() => UserCards, userCard => userCard.id)
	@JoinColumn({name: 'user_card_id'})
		userCard: Relation<UserCards>;

	@Column({nullable: false})
		purchase_date: Date;

	@Column({type: 'float', nullable: false})
		monthly_amount: number;

	@Column({type: 'float', nullable: false})
		total_amount: number;

  @Column({nullable: false}) 
  	total_installment_count: number;
	
	@Column({name: 'is_paid', default: false, nullable: false}) 
  	is_paid: boolean;

	@Column({nullable: true}) 
		paid_date: Date;

	@Column({nullable: true})
		description: string;
	
	@Column({name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

	@OneToMany(() => Installments, installment => installment.outgoing)
		installment: Relation<Installments>;

}
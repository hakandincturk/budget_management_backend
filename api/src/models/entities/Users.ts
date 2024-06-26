/* eslint-disable max-len */
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, VirtualColumn, JoinColumn, ManyToOne} from 'typeorm'; 

import { UserRoles } from './UserRoles.js';
import { UserCards } from './UserCards.js';
import { UserTypes } from './UserTypes.js';

@Entity({name: 'Users'}) 
export class Users {   

	@PrimaryGeneratedColumn({type: 'bigint'}) 
		id: number; 

	@Column('varchar',)
	public name: string; 

	@Column('varchar',)
	public surname: string; 

	@Column('varchar',) 
		email: string;
		
	@Column('varchar',) 
		password: string;

	@Column('varchar', {nullable: true}) 
		phone_number: string;

	@Column('boolean', {nullable: false, default: false}) 
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

	@ManyToOne(() => UserTypes, userType => userType.id, {cascade: true})
	@JoinColumn({name: 'user_type_id'})
		userType: UserTypes;

	@OneToMany(() => UserRoles, userRoles => userRoles.user, {cascade: true})
		userRoles: UserRoles[];

	@OneToMany(() => UserCards, userCards => userCards.user, {cascade: true})
		userCards: UserCards[];

	@VirtualColumn('varchar', {
		query(alias) {
			return `CONCAT(${alias}.name, ' ', ${alias}.surname)`;
		}
	})
	public fullName: string;

}
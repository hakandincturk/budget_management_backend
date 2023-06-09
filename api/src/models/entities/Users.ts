/* eslint-disable max-len */
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, VirtualColumn} from 'typeorm'; 

import { UserRoles } from './UserRoles.js';
import { UserCards } from './UserCards.js';

@Entity({name: 'Users'}) 
export class Users {   

	@PrimaryGeneratedColumn({type: 'bigint'}) 
		id: number; 

	@Column() 
	public name: string; 

	@Column() 
	public surname: string; 

	@Column() 
		email: string;
		
	@Column() 
		password: string;

	@Column({nullable: true}) 
		phone_number: string;

	@Column('boolean', {nullable: false, default: false}) 
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

	@OneToMany(() => UserRoles, userRoles => userRoles.user, {cascade: true})
		userRoles: UserRoles[];

	@OneToMany(() => UserCards, userCards => userCards.user, {cascade: true})
		userCards: UserCards[];

	@VirtualColumn({
		query(alias) {
			return `CONCAT(${alias}.name, ' ', ${alias}.surname)`;
		}
	})
	public fullName: string;

}
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { RolePermissions } from './RolePermissions.js';
import { UserRoles } from './UserRoles.js';

@Entity('Roles')
export class Roles {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({nullable: false})
		name: string;

	@Column({nullable: false})
		clean_name: string;

	@Column({name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@OneToMany(() => RolePermissions, userRoles => userRoles.role)
		rolePermissions: RolePermissions[];

	@OneToMany(() => UserRoles, userRole => userRole.user)
		userRoles: UserRoles[];

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}


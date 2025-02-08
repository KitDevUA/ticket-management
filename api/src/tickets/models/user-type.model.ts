import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'user_types',
	timestamps: true,
	underscored: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export class UserType extends Model<UserType> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	})
	user_type_id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name!: string;
}

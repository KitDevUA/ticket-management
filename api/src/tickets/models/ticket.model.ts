import {
	Model,
	Table,
	Column,
	DataType,
	BelongsTo,
	ForeignKey,
	Sequelize,
} from 'sequelize-typescript';
import { TicketCreationAttrs } from '../dto/tickets.dto';
import { UserType } from './user-type.model';

@Table({
	tableName: 'tickets',
	timestamps: true,
	underscored: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export class Ticket extends Model<Ticket, TicketCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	})
	ticket_id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	title!: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	description!: string;

	@Column({
		type: DataType.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	})
	date!: Date;

	@Column({ type: DataType.STRING, allowNull: false })
	location!: string;

	@ForeignKey(() => UserType)
	@Column({ type: DataType.INTEGER, allowNull: false })
	user_type_id!: number;

	@BelongsTo(() => UserType, 'user_type_id')
	user_type!: UserType;
}

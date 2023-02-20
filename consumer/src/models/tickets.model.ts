import {Column, DataType, Model, Table} from "sequelize-typescript";
import {TicketStatusEnum} from "../enums/ticketStatus.enum";

@Table({
    timestamps: false,
    tableName: "tickets",
})
export default class Ticket extends Model {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    request: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    result: string | null;

    @Column({
        type: DataType.ENUM(...Object.values(TicketStatusEnum)),
        allowNull: false,
        defaultValue: TicketStatusEnum.IN_PROGRESS
    })
    status: string;
}
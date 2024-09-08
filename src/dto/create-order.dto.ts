import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateOrderDto {

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    products: [];

    @IsBoolean()
    payment: boolean;
}
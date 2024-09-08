import {Controller, Get, Post} from "@nestjs/common";
import {ProductService} from "../services/product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('addSample')
    async addProducts(){
        await this.productService.addSampleProducts();
    }

    @Get('list')
    async getProducts(){
        const allProducts = await this.productService.getProducts();
        return allProducts;
    }
}
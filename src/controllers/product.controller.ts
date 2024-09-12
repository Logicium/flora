import {Controller, Get, Param, Post} from "@nestjs/common";
import {ProductService} from "../services/product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('addSample')
    async addProducts(){
        await this.productService.addSampleProducts();
    }

    @Get(':id')
    async getProduct(@Param() params: any){
        const product = await this.productService.getProduct(params.id);
        return product;
    }

    @Get('/')
    async getProducts(){
        const allProducts = await this.productService.getProducts();
        return allProducts;
    }
}
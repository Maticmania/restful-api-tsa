import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.js";

const router = express.Router()

router.post('/create', createProduct )
router.put('/update/:productId', updateProduct )
router.get('/all', getAllProducts )
router.get('/:productId', getProductById )
router.delete('/:productId', deleteProduct )


export default router
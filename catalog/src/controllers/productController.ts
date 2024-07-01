import { Request, Response } from 'express';
import ProductService from '../services/productService';

const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  try {
    const product = await ProductService.createProduct(name, description, price);
    res.status(201).json(product);
  } catch (err) {
    if(err instanceof Error){
        res.status(500).json({ error: err.message  });
    } else {
        res.status(500).json({ error: 'Unknown error occurred'  });
    }
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getProducts(req.query);
    res.json(products);
  } catch (err) {
    if(err instanceof Error){
        res.status(500).json({ error: err.message  });
    } else {
        res.status(500).json({ error: 'Unknown error occurred'  });
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await ProductService.updateProduct(Number(id), updates);
    res.json(product);
  } catch (err) {
    if(err instanceof Error){
        res.status(500).json({ error: err.message  });
    } else {
        res.status(500).json({ error: 'Unknown error occurred'  });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ProductService.deleteProduct(Number(id));
    res.status(204).send();
  } catch (err) {
    if(err instanceof Error){
        res.status(500).json({ error: err.message  });
    } else {
        res.status(500).json({ error: 'Unknown error occurred'  });
    }
  }
};

export { createProduct, getProducts, updateProduct, deleteProduct };

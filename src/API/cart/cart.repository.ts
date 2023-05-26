import { AppDataSource } from 'src/config/database-config';
import { Cart } from 'src/entities/cart.entity';

export const CartRepository = AppDataSource.getRepository(Cart).extend({
  createUserCart: (userId: number, optionId: number, quantity: number) => {
    return CartRepository.query(`
      INSERT INTO carts( 
        userId, 
        optionId, 
        quantity
      ) VALUES (${userId}, ${optionId}, ${+quantity})
    `);
  },
  CheckUserCart: (userId: number, optionId: number) => {
    return CartRepository.query(`
      SELECT 
        id,
        userId, 
        optionId, 
        quantity
      FROM carts
      Where userId = ${userId} AND optionId = ${optionId}
    `);
  },
  updateUserCart: (userId: number, optionId: number, quantity: number) => {
    return CartRepository.query(`
    update carts
      SET quantity = ${quantity}
    WHERE userId = ${userId} AND optionId = ${optionId}
    `);
  },
  getUserCart: (userId: number) => {
    return CartRepository.query(`
      SELECT 
        color.productName AS name,
        color.price,
        ca.id AS cartId,
        ca.quantity,
        si.siz as size,
        color.colorName,
        color.imgUrl,
        si.productColorId,
        optionChange.color,
        userId
      FROM carts ca
      INNER JOIN (
        SELECT
          po.id AS optionId,
          po.productColorId,
          JSON_OBJECT(
            'id',po.sizeId,
            'name', s.name
      ) AS siz
      from product_options po
      LEFT JOIN size s ON s.id = po.sizeId 
      ) as si ON si.optionId = ca.optionId
      INNER JOIN (
        SELECT 
          pc.id AS productColorId,
          pc.productId,
          c.name AS colorName,
          p.name AS productName,
          p.thumbnail AS imgUrl,
          p.price
        FROM product_color pc 
        LEFT JOIN colors c ON c.id = pc.colorId
        LEFT JOIN product p ON pc.productId = p.id
      ) AS color ON color.productColorId = si.productColorId
      LEFT JOIN (
        SELECT
          p.id AS productId,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'colorId', c.id,
              'colorName', c.name,
              'options', productOption.options
            ) 
          ) AS color
      FROM product p
      LEFT JOIN product_color pc ON p.id = pc.productId
      LEFT JOIN colors c ON c.id = pc.colorId
      LEFT JOIN (
        SELECT
          po.productColorId AS pcId,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'optionId', size.id,
              'size', size.name,
              'stock', stock
            ) 
          ) AS options
        FROM product_options po
        LEFT JOIN size ON size.id = po.sizeId
        GROUP BY pcId
      ) AS productOption ON productOption.pcId = pc.id
      GROUP BY p.id
      ) AS optionChange ON optionChange.productId = color.productId
      where ca.userId =${userId}
    `);
  },
  updateQuantityCart: (cartId: string, quantity: string, userId: number) => {
    return CartRepository.query(`
    update carts
      SET quantity = ${quantity}
    WHERE userId = ${userId} AND id = ${cartId}
    `);
  },
  updateProductCart: (optionId: number, cartId: number, userId: number) => {
    return CartRepository.query(`
    update carts
      SET optionId = ${optionId}
    WHERE userId = ${userId} AND id = ${cartId}
    `);
  },
  deleteCart: (query: string) => {
    return CartRepository.query(`
    DELETE FROM carts 
    ${query}
    `);
  },
});

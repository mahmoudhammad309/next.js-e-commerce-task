/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import UserInfo from '@/shared/UserInfo';
import ProductCard from '@/shared/ProductCard';
import { Stack } from '@mui/material';
const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log({data})
        setProducts(data);
      } catch (error) {
        if ((error as any).response?.status === 401) {
          window.location.href = '/login'; // Redirect to login page
          console.log('no user!!!!!!!!!!!!!!!!')
        } else {
          console.error('Error fetching products:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <UserInfo />
      <h1>Product List</h1>

      <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "21px",
            margin: "auto",
            justifyContent: "center",
            my: "24px"
          }}
        >
        {products.map((product) => (
          // <div key={product.id} className="product-card">
          //   <h2>{product.name}</h2>
          //   <p>{product.description}</p>
          //   <p>${product.price}</p>
          // </div>
      <ProductCard key={product.id} product={product}/>
        ))}
          </Stack>
    </div>
  );
};

export default Home;

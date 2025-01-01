"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import Image from "next/image";
import { Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";

const ProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    imageUrl?: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: "16px" }}>
      <Card>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "400px",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.imageUrl || "/placeholder-image.png"}
            alt={product.name}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => router.push("/")}>
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductPage;

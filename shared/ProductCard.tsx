
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: any) => {
  const theme = useTheme();

  return (
    <Link href={`/product/${product.id}`}>
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: theme.shadows[4],
        borderRadius: "16px",
        maxWidth: "300px",

      }}
    >
      <Stack
        sx={{ position: "relative", minWidth: "277px", minHeight: "266px" }}
      >
    <Image
      priority
      src={product.imageUrl}
      alt={product.name}
      width={277}
      height={266}
    />

      </Stack>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "nav.primary", mt: "10px" }}
      >
       {product.name}
      </Typography>
      <Stack sx={{ position: "relative", height: "24px" }}>
        <>
          <Stack
            sx={{
              transform: "translate(-50%,-50%)",
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "120%",
              height: "2px",
              bgcolor: "grey.600",
            }}
          ></Stack>
          <Typography variant="body1" sx={{ color: "grey.600" }}>
            ${product.price}
          </Typography>
        </>
      </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            px: "12px",
            pb: "25px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: "center",
              color: "common.black",
            }}
            variant="h6"
            className="cut-text-2"
          >
            {product.description}
          </Typography>
        </Stack>
    </Stack>
      </Link>
  );
};

export default ProductCard;

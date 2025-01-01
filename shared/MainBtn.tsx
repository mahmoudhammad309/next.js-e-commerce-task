"use client";

import { Button } from "@mui/material";

import { SxProps } from "@mui/system";
import { ButtonProps } from "@mui/material";

interface MainBtnProps extends ButtonProps {
	sx?: SxProps;
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
	width?: string | number;
	borderRadius?: string | number;
	height?: string | number;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	variant?: "text" | "outlined" | "contained";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MainBtn: React.FC<MainBtnProps> = ({
	sx,
	color,
	width,
	borderRadius,
	height,
	children,
	type,
	variant,
	onClick,
}) => {
	return (
		<Button
			type={type}
			color={color}
			variant={variant || "contained"}
			sx={{
				width: width || "100%",
				borderRadius: borderRadius || "10px",
				height: height,
				...sx,
			}}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default MainBtn;

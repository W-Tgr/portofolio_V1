import React, { useState } from "react"
import { Modal, IconButton, Box, Fade, Backdrop, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { motion } from "framer-motion"

const Certificate = ({ ImgSertif }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	// Debug: Log URL
	console.log('Certificate ImgSertif:', ImgSertif);

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				whileHover={{ 
					scale: 1.02, 
					boxShadow: '0 0 20px rgba(33, 136, 255, 0.2)',
					transition: { duration: 0.3 }
				}}
				whileTap={{ scale: 0.98 }}
			>
				<Box
					className=""
					sx={{
						position: "relative",
						overflow: "hidden",
						borderRadius: 2,
						boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
						transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						"&:hover": {
							transform: "translateY(-5px)",
							boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
							"& .overlay": {
								opacity: 1,
							},
							"& .hover-content": {
								transform: "translate(-50%, -50%)",
								opacity: 1,
							},
							"& .certificate-image": {
								filter: "contrast(1.05) brightness(1) saturate(1.1)",
							},
						},
					}}>
					{/* Certificate Image with Initial Filter */}
					<Box
						sx={{
							position: "relative",
							"&::before": {
								content: '""',
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0, 0, 0, 0.1)",
								zIndex: 1,
							},
						}}>
						<img
							className="certificate-image"
							src={ImgSertif || 'https://via.placeholder.com/300x200?text=No+Image+Available'}  // Fallback jika null
							alt="Certificate"
							onError={(e) => {  // Log error load
							  console.error('Certificate image failed to load:', ImgSertif);
							  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';  // Fallback on error
							}}
							style={{
								width: "100%",
								height: "auto",
								display: "block",
								objectFit: "cover",
								filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
								transition: "filter 0.3s ease",
							}}
							onClick={handleOpen}
						/>
					</Box>

					{/* Hover Overlay */}
					<motion.div
						className="overlay"
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							cursor: "pointer",
							zIndex: 2,
							backgroundColor: "rgba(33, 136, 255, 0.3)",
						}}
						onClick={handleOpen}
					>
						{/* Hover Content */}
						<motion.div
							className="hover-content"
							initial={{ opacity: 0, scale: 0.9 }}
							whileHover={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4 }}
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								textAlign: "center",
								width: "100%",
								color: "white",
							}}>
							<FullscreenIcon
								sx={{
									fontSize: 40,
									mb: 1,
									filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
								}}
							/>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 600,
									textShadow: "0 2px 4px rgba(0,0,0,0.3)",
								}}>
								View Certificate
							</Typography>
						</motion.div>
					</motion.div>
				</Box>
			</motion.div>

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						backdropFilter: "blur(5px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Fade in={open}>
					<Box
						sx={{
							position: "relative",
							width: "auto",
							maxWidth: "90vw",
							maxHeight: "90vh",
							m: 0,
							p: 0,
							outline: "none",
							"&:focus": {
								outline: "none",
							},
						}}>
						{/* Close Button */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						>
							<IconButton
								onClick={handleClose}
								sx={{
									position: "absolute",
									right: 16,
									top: 16,
									color: "white",
									bgcolor: "rgba(0,0,0,0.6)",
									zIndex: 1,
									padding: 1,
									"&:hover": {
										bgcolor: "rgba(0,0,0,0.8)",
										transform: "scale(1.1)",
									},
								}}
								size="large">
								<CloseIcon sx={{ fontSize: 24 }} />
							</IconButton>
						</motion.div>

						{/* Modal Image */}
						<motion.img
							src={ImgSertif || 'https://via.placeholder.com/800x600?text=No+Image'}  // Fallback
							alt="Certificate Full View"
							onError={(e) => {
							  console.error('Modal image load error:', ImgSertif);
							  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
							}}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							style={{
								display: "block",
								maxWidth: "100%",
								maxHeight: "90vh",
								margin: "0 auto",
								objectFit: "contain",
								borderRadius: "8px",
								boxShadow: "0 0 30px rgba(33, 136, 255, 0.3)"
							}}
						/>
					</Box>
				</Fade>
			</Modal>
		</Box>
	)
}

export default Certificate
// Product Card
export const cardVariants = {
	hidden: { opacity: 0, y: 50, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			duration: 0.5,
			delay: 0,
			bounce: 0.3,
		},
	},
}

// Product Page
export const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			when: 'beforeChildren',
			staggerChildren: 0.2,
		},
	},
}

export const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const truncateText = (
	text: string,
	maxLength: number,
	isVisible: boolean = true
) =>
	text.length >= maxLength || isVisible
		? text.slice(0, maxLength) + '...'
		: text

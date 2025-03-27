export const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}

	return date.toLocaleDateString('tm-TM', options)
}

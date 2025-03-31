import { ChangeEvent, FC, useRef } from 'react'
import { ITextAreaProps } from '../../features/admin/types/ui.interface'

export const TextArea: FC<ITextAreaProps> = ({
	label,
	maxLength,
	value,
	setValue,
	...props
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const textareaInputChangeHight = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = textareaRef.current
		setValue(e.target.value)

		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}
	return (
		<div className='w-full max-w-md'>
			<div className='flex justify-between items-center mb-4'>
				{label && <label className='block text-white'>{label}</label>}
				{maxLength && (
					<span className='text-right text-sm text-white  mt-1'>
						{String(value.length)} / {maxLength}
					</span>
				)}
			</div>

			<textarea
				ref={textareaRef}
				value={value}
				onChange={textareaInputChangeHight}
				maxLength={maxLength}
				className='w-full min-h-[80px] max-h-[300px] p-3 text-baseTextAndButton bg-white 
        border border-bgCards rounded-lg resize-none 
        focus:ring-3 focus:ring-bgCards focus:outline-none transition-all'
				{...props}
			/>
		</div>
	)
}

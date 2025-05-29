import { Box, Typography, FormHelperText, Stack } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useFormContext } from "../../context/FormContext"

const DateRangeStep = () => {
	const { formData, updateFormData, errors } = useFormContext()

	return (
		<Box className="w-full max-w-md mx-auto p-6">
			<Typography variant="h5" className="mb-6 text-center">
				Select Booking Dates
			</Typography>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={2}>
					<DatePicker
						label="Start Date"
						value={formData.startDate}
						onChange={(date) => updateFormData("startDate", date)}
						slotProps={{
							textField: {
								fullWidth: true,
								error: !!errors.startDate,
								helperText: errors.startDate,
							},
						}}
						minDate={new Date()}
					/>

					<DatePicker
						label="End Date"
						value={formData.endDate}
						onChange={(date) => updateFormData("endDate", date)}
						slotProps={{
							textField: {
								fullWidth: true,
								error: !!errors.endDate,
								helperText: errors.endDate,
							},
						}}
						minDate={formData.startDate || new Date()}
					/>
				</Stack>
			</LocalizationProvider>

			{errors.dateRange && (
				<FormHelperText error className="text-center mt-2">
					{errors.dateRange}
				</FormHelperText>
			)}
		</Box>
	)
}

export default DateRangeStep

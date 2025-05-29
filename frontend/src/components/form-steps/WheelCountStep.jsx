import {
	Box,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormHelperText,
} from "@mui/material"
import { useFormContext } from "../../context/FormContext"

const WheelCountStep = () => {
	const { formData, updateFormData, errors } = useFormContext()

	return (
		<Box className="w-full max-w-md mx-auto p-6">
			<Typography variant="h5" className="mb-6 text-center">
				Number of wheels
			</Typography>

			<RadioGroup
				value={formData.wheelCount || ""}
				onChange={(e) =>
					updateFormData("wheelCount", parseInt(e.target.value))
				}
				className="flex flex-col items-center"
			>
				<FormControlLabel
					value={2}
					control={<Radio />}
					label="2 Wheels"
					className="mb-4"
				/>
				<FormControlLabel
					value={4}
					control={<Radio />}
					label="4 Wheels"
				/>
			</RadioGroup>

			{errors.wheelCount && (
				<FormHelperText
					error
					className="mt-2"
					style={{ textAlign: "center" }}
				>
					{errors.wheelCount}
				</FormHelperText>
			)}
		</Box>
	)
}

export default WheelCountStep

import { TextField, Box, Typography } from "@mui/material"
import { useFormContext } from "../../context/FormContext"

const NameStep = () => {
	const { formData, updateFormData, errors } = useFormContext()

	return (
		<Box className="w-full max-w-md mx-auto p-6">
			<Typography variant="h5" className="mb-6 text-center">
				First, what's your name?
			</Typography>

			<Box className="space-y-4">
				<TextField
					fullWidth
					label="First Name"
					value={formData.firstName}
					onChange={(e) =>
						updateFormData("firstName", e.target.value)
					}
					error={!!errors.firstName}
					helperText={errors.firstName}
					style={{ marginBlock: "16px" }}
				/>

				<TextField
					fullWidth
					label="Last Name"
					value={formData.lastName}
					onChange={(e) => updateFormData("lastName", e.target.value)}
					error={!!errors.lastName}
					helperText={errors.lastName}
				/>
			</Box>
		</Box>
	)
}

export default NameStep

import { FormProvider } from "./context/FormContext"
import MultiStepForm from "./components/MultiStepForm"

function App() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<FormProvider>
				<MultiStepForm />
			</FormProvider>
		</div>
	)
}

export default App

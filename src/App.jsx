import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Form from './components/form/Form';
import Table from './components/table/Table';
import { useRef } from 'react';

function App() {
	const toastRef = useRef(null);
	const showToast = (message, statusCode) => {
		let severityValue = '';
		let summaryValue = '';
		if (statusCode === 200 || statusCode === 201) {
			severityValue = 'success';
			summaryValue = 'Success';
		}
		if (statusCode >= 400) {
			severityValue = 'error';
			summaryValue = 'Error';
		}
		if (severityValue)
			toastRef.current.show({
				severity: severityValue,
				summary: summaryValue,
				detail: message,
				life: 2000,
			});
	};
	return (
		<>
			<Toast position='top-center' ref={toastRef} />
			<ConfirmDialog />
			<Form showToast={showToast} />
			<hr />
			<Table showToast={showToast} />
		</>
	);
}

export default App;

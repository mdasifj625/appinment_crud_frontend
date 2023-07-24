import './form.css';
import { useFormik } from 'formik';
import { validation } from '../../validations/validation';
import { apiRequest } from '../../requestMethod';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';

function Form({ showToast }) {
	const { renderTableFlag, setRenderTableFlag, updateData, setUpdateData } =
		useContext(AppContext);
	const initialValues = {
		gender: 'male',
		patientName: '',
		patientAge: '',
		status: 'consult',
		appointmentTime: '',
		appointmentDate: '',
		phoneNumber: '',
		doctorName: '',
	};

	const {
		handleSubmit,
		handleBlur,
		handleChange,
		errors,
		touched,
		values,
		resetForm,
		setValues,
	} = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values);
			const handlePostData = async (values) => {
				let response = updateData
					? await apiRequest.put(`/appointments/${updateData._id}`, {
							...values,
					  })
					: await apiRequest.post('/appointments', {
							...values,
					  });

				const { statusCode, message } = response.data.data;
				showToast(message, statusCode);
				if (statusCode === 201 || statusCode === 200) {
					setRenderTableFlag(!renderTableFlag);
					clearFormData();
				}
			};
			handlePostData(values);
		},
		validationSchema: validation,
	});

	useEffect(() => {
		if (updateData) {
			setValues(() => ({
				patientName: updateData.patientName,
				patientAge: updateData.patientAge,
				status: updateData.status,
				gender: updateData.gender,
				appointmentTime: updateData.appointmentTime,
				appointmentDate: updateData.appointmentDate.split('T')[0],
				phoneNumber: updateData.phoneNumber,
				doctorName: updateData.doctorName,
			}));
		}
	}, [updateData, setValues]);

	function clearFormData() {
		setUpdateData(null);
		resetForm();
	}

	return (
		<div className='formContainer'>
			<h3>Welcome to Gradious Doctor Appointment Booking</h3>
			<form onSubmit={handleSubmit}>
				<div className='inputGroup'>
					<div className='col'>
						<input
							type='text'
							name='patientName'
							onBlur={handleBlur}
							value={values.patientName}
							placeholder='Patient Name *'
							onChange={handleChange}
						/>
						{errors.patientName && touched.patientName && (
							<div className='validationAlert'>
								⚠️ {errors.patientName}
							</div>
						)}
					</div>
					<div className='col'>
						<input
							type='text'
							value={values.phoneNumber}
							name='phoneNumber'
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Phone Number *'
						/>
						{errors.phoneNumber && touched.phoneNumber && (
							<div className='validationAlert'>
								⚠️ {errors.phoneNumber}
							</div>
						)}
					</div>
					<div className='col'>
						<input
							type='text'
							value={values.doctorName}
							name='doctorName'
							className='form-control'
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Doctor Name *'
						/>
						{errors.doctorName && touched.doctorName && (
							<div className='validationAlert'>
								⚠️ {errors.doctorName}
							</div>
						)}
					</div>
					<div className='col'>
						<select
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.gender}
							name='gender'
							required
						>
							<option value='male'>male</option>
							<option value='female'>female</option>
						</select>
						{errors.gender && touched.gender && (
							<div className='validationAlert'>
								⚠️ {errors.gender}
							</div>
						)}
					</div>
					<div className='col'>
						<input
							type='date'
							value={values.appointmentDate}
							name='appointmentDate'
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.appointmentDate && touched.appointmentDate && (
							<div className='validationAlert'>
								⚠️ {errors.appointmentDate}
							</div>
						)}
					</div>
					<div className='col'>
						<select
							name='status'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.status}
						>
							<option value='consult'>Consult</option>
							<option value='revisit'>Revisit</option>
						</select>
						{errors.status && touched.status && (
							<div className='validationAlert'>
								⚠️ {errors.status}
							</div>
						)}
					</div>
					<div className='col'>
						<input
							type='text'
							value={values.patientAge}
							name='patientAge'
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Age *'
						/>
						{errors.patientAge && touched.patientAge && (
							<div className='validationAlert'>
								⚠️ {errors.patientAge}
							</div>
						)}
					</div>
					<div className='col'>
						<input
							type='time'
							value={values.appointmentTime}
							onChange={handleChange}
							onBlur={handleBlur}
							name='appointmentTime'
						/>
						{errors.appointmentTime && touched.appointmentTime && (
							<div className='validationAlert'>
								⚠️ {errors.appointmentTime}
							</div>
						)}
					</div>
				</div>
				<div className='btnGroup'>
					<button className='bookBtn' type='submit'>
						{updateData ? 'Update Appointment' : 'Book Appointment'}
					</button>
					{updateData && (
						<button
							className='cancelBtn'
							type='button'
							onClick={clearFormData}
						>
							Cancel Update
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default Form;

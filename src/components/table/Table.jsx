/* eslint-disable react/prop-types */
import "./table.css";
import avatar_male from "../../assets/images/avatar_male.png";
import avatar_female from "../../assets/images/avatar_female.png";
import { useContext, useEffect, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import { apiRequest } from "../../requestMethod";
import { AppContext } from "../../context/AppProvider";
export default function Table({ showToast }) {
    const { renderTableFlag, setUpdateData } = useContext(AppContext);

    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetchData();
    }, [renderTableFlag]);
    async function fetchData() {
        const response = await apiRequest.get("/appointments");
        setAppointments(response.data.data.items);
    }

    const handleEdit = (item) => {
        setUpdateData(item);
    };

    const handleDelete = async (id) => {
        const response = await apiRequest.delete(`/appointments/${id}`);
        const { statusCode, message } = response.data.data;
        showToast(message, statusCode);
        if (statusCode === 200) fetchData();
    };

    return (
        <>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Status</th>
                            <th>Appointment</th>
                            <th>Phone</th>
                            <th>Doctor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <div className="patient">
                                        <img
                                            src={
                                                item.gender === "male"
                                                    ? avatar_male
                                                    : avatar_female
                                            }
                                            alt="img"
                                        />
                                        <div>
                                            <p className="p_name">
                                                {item.patientName}
                                            </p>
                                            <p className="p_details">
                                                {item.patientAge} yrs,{" "}
                                                {item.gender}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className={`status ${
                                            item.status === "consult"
                                                ? "primary"
                                                : "secondary"
                                        }`}
                                    >
                                        {item.status.charAt(0).toUpperCase() +
                                            item.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div className="appointment">
                                        <p className="time">
                                            {item.appointmentTime}
                                        </p>
                                        <p className="date">
                                            {item.appointmentDate.split("T")[0]}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className="phone">
                                        <p>{`${item.phoneNumber.slice(
                                            0,
                                            3
                                        )}-${item.phoneNumber.slice(
                                            3,
                                            6
                                        )}-${item.phoneNumber.slice(6)}`}</p>
                                        <a href={`tel:+91${item.phoneNumber}`}>
                                            Contact
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <p className="doctor">
                                        Dr. {item.doctorName}
                                    </p>
                                </td>
                                <td>
                                    <div className="actionBtn">
                                        <button
                                            onClick={() => {
                                                handleEdit(item);
                                            }}
                                            className="btn edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                confirmDialog({
                                                    trigger:
                                                        event.currentTarget,
                                                    message:
                                                        "Are you sure you want to delete?",
                                                    header: "Confirmation",
                                                    icon: "pi pi-exclamation-triangle",
                                                    accept: () => {
                                                        handleDelete(item._id);
                                                    },
                                                    reject: () => {},
                                                });
                                            }}
                                            className="btn delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

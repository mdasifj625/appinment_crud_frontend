/* eslint-disable react/prop-types */
import { useState, createContext, useMemo } from 'react';

export const AppContext = createContext(null);
const AppProvider = ({ children }) => {
	const [renderTableFlag, setRenderTableFlag] = useState(false);
	const [updateData, setUpdateData] = useState(null);

	const memoisedValues = useMemo(
		() => ({
			renderTableFlag,
			setRenderTableFlag,
			updateData,
			setUpdateData,
		}),
		[renderTableFlag, updateData]
	);

	return (
		<AppContext.Provider value={memoisedValues}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;

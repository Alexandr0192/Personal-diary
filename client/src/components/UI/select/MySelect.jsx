import React from 'react';

/**
 * Меню выбора сортировки
 * @param options
 * @param defaultValue
 * @param value
 * @param onChange
 * @returns {JSX.Element}
 */
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(options =>
                <option key={options.value} value={options.value}>
                    {options.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;
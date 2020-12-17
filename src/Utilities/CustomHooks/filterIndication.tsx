let isFilterSelected = false;

export const filterIndication = () => {
    const setSelection = () => isFilterSelected = true;
    const resetSelection = () => isFilterSelected = false;

    return {isFilterSelected, setSelection, resetSelection}
}
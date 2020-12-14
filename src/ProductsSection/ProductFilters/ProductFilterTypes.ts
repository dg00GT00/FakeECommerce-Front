import {ClearFilterType} from "../../Utilities/ClearFilterManager/ClearFiltersContext";

export type ProductFilterProps = { className: string, setClearFunction: (clearProps: ClearFilterType) => void };
export type ProductFilterDesktop = {setClearFunction: (clearProps: ClearFilterType) => void };
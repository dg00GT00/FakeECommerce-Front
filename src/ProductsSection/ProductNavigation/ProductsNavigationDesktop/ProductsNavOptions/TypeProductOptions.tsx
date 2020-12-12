import React, {useRef} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductTypes} from '../../../../Utilities/ProductModels/ProductFilters';
import {useHistory} from 'react-router-dom';
import {ProductFilterEnum, UrlQueryFilter} from "../../../ProductRouteManager/ProductRouteManager";
import {ProductNavDesktopProps} from "../../ProductNavigationTypes";
import {parsePath} from "history";


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > .MuiOutlinedInput-root": {
                backgroundColor: "#808488", // Change this value if the secondary theme color also change
                "&:focus-within": {
                    backgroundColor: "initial",
                }
            },
            "& > fieldset": {
                border: "none",
            }
        },
        select: {
            color: theme.palette.common.white,
            fontFamily: "inherit",
            "&:not([multiple]) option": {
                backgroundColor: theme.palette.primary.light,
                color: "white",
            },
        }
    }),
);


export const TypeProductOptions: React.FunctionComponent<ProductNavDesktopProps> = props => {
    const {className, clearFilter} = props;
    const {push, location: {search}} = useHistory();
    const [inputValue, setInputValue] = React.useState(0)

    const formStyles = useFormStyles();
    const formRef = useRef<HTMLDivElement>(null)
    const [type, setType] = React.useState<number | string>("");


    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setType(event.target.value as number);
        push({
            pathname: '/products',
            search: `${UrlQueryFilter.Type}=${event.target.value as number}`,
            state: {filter: ProductFilterEnum.FilterType}
        })
    };

    React.useEffect(() => {
        if (search.includes(UrlQueryFilter.Type)) {
            const searchParams = parsePath(search).search;
            const queryValue = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Type);
            setType(_ => {
                const label = formRef.current?.querySelector("label");
                if (label) {
                    label.setAttribute("data-shrink", "true");
                    label.classList.add("MuiInputLabel-shrink", "MuiFormLabel-filled")
                }
                const legend = formRef.current?.querySelector("legend");
                if (legend) {
                    legend.classList.add("PrivateNotchedOutline-legendNotched-12");
                }
                setInputValue(parseInt(queryValue ?? "0"));
                return queryValue ?? "";
            });
        }
    }, [search])

    React.useEffect(() => {
        setType("");
    }, [clearFilter]);

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className]);

    return (
        <FormControl size={"small"} color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
            <InputLabel htmlFor="typeIt" id={"typeIt"} classes={{formControl: formStyles.select}}>Product
                Type</InputLabel>
            <Select
                native
                className={formStyles.select}
                value={type}
                id={"typeIt"}
                onChange={handleChange}
                label="Product Type"
                labelId={"typeIt"}
                inputProps={{value: inputValue}}
            >
                <option/>
                <option value={ProductTypes.MenClothing}>Men Clothing</option>
                <option value={ProductTypes.Jewelry}>Jewelry</option>
                <option value={ProductTypes.Electronics}>Electronics</option>
                <option value={ProductTypes.WomenClothing}>Women Clothing</option>
            </Select>
        </FormControl>
    );
}

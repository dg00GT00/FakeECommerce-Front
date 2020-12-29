import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../UserModels/UserAddressModel";

const addressSeparator = ", "

const buildUserStreetAddress = (streetName: string, streetComplement?: string): string => {
    let userStreet = streetName;
    if (streetComplement) {
        userStreet += addressSeparator + streetComplement;
    }
    return userStreet;
}

const destructUserStreetAddress = (userStreetAddress: string): {street: string, complement?: string} => {
    const addressArray = userStreetAddress.split(addressSeparator);
    return {
        street: addressArray[0],
        complement: addressArray.length > 1 ? addressArray[1] : undefined
    };
}
export const addressFormMapper = (addressForm: FormState<AddressFieldId>): UserAddressModel => {
    return {
        city: addressForm.city.fieldValue ?? "",
        state: addressForm.state.fieldValue ?? "",
        street: buildUserStreetAddress(addressForm.street.fieldValue ?? "", addressForm.complement.fieldValue),
        zipCode: addressForm.zipcode.fieldValue ?? "",
        firstName: addressForm.firstName.fieldValue ?? "",
        lastName: addressForm.lastName.fieldValue ?? ""
    }
}
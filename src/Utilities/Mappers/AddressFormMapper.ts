import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../UserModels/UserAddressModel";

const addressSeparator = ", "

const buildUserStreetAddress = (streetName: string, country: string, streetComplement?: string): string => {
    let userStreet = streetName;
    if (streetComplement) {
        userStreet = [streetName, streetComplement, country].join(addressSeparator);
    }
    return [userStreet, country].join(addressSeparator);
}

const destructUserStreetAddress = (userStreetAddress: string): { street: string, country: string, complement?: string } => {
    const addressArray = userStreetAddress.split(addressSeparator);
    return {
        street: addressArray[0],
        country: addressArray.length > 2 ? addressArray[2] : addressArray[1],
        complement: addressArray.length > 2 ? addressArray[1] : undefined
    };
}

export const formToAddressMapper = (addressForm: FormState<AddressFieldId>): UserAddressModel => {
    return {
        city: addressForm.city.fieldValue ?? "",
        state: addressForm.state.fieldValue ?? "",
        zipCode: addressForm.zipcode.fieldValue ?? "",
        firstName: addressForm.firstName.fieldValue ?? "",
        lastName: addressForm.lastName.fieldValue ?? "",
        street: buildUserStreetAddress(
            addressForm.street.fieldValue ?? "",
            addressForm.country.fieldValue ?? "",
            addressForm.complement.fieldValue
        )
    };
}

export const addressToFormMapper = (address: UserAddressModel): FormState<AddressFieldId> => {
    const {complement, country, street} = destructUserStreetAddress(address.street);
    return {
        street: {fieldValue: street, submitButtonDisable: true, requiredValidity: false},
        lastName: {fieldValue: address.lastName, submitButtonDisable: true, requiredValidity: false},
        firstName: {fieldValue: address.firstName, submitButtonDisable: true, requiredValidity: false},
        zipcode: {fieldValue: address.zipCode, submitButtonDisable: true, requiredValidity: false},
        city: {fieldValue: address.city, submitButtonDisable: true, requiredValidity: false},
        country: {fieldValue: country, submitButtonDisable: true, requiredValidity: false},
        complement: {fieldValue: complement, submitButtonDisable: true, requiredValidity: false},
        state: {fieldValue: address.state, submitButtonDisable: true, requiredValidity: false}
    };
}
import { faker } from '@faker-js/faker';
import { TProductLicense, TTransaction } from "@chat/graphql"
import moment from 'moment';

export const generateLicenceTransaction = async ({type, dateBegin, dateEnd, license}: LicenseTransacProps) => {

    const license_ = await getLicense(type, license)

    const dateBegin_ = dateBegin ? moment(dateBegin).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS) : moment().subtract(1, 'years').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    const dateEnd_ = dateEnd ? moment(dateEnd).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS) : moment().add(1, 'years').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)

    
    const transaction = await TTransaction.create({
        id: null,
        ke: license_.ke,
        type: 'MVOLA',
        status: 'SUCCESS',
        reference: faker.string.uuid(),
        dateBegin: dateBegin_,
        dateEnd:  dateEnd_,
        comment: 'test licence transaction',
        license: license_ as TProductLicense
    }).save()
    
    return transaction

}

export const getLicense = async (type: LicenseType, license?: TProductLicense): Promise<TProductLicense> => {

    let license_;

    if(license) {
        license_ = await TProductLicense.create(license).save()
        return license_
    }

    license_ = await TProductLicense.findOne({ where: { ke: type } })

    return license_

}

export type LicenseType = 'FREE' | 'PRENIUM' | 'DEVELOPPER' | 'HAREA_ADMIN' | string
export type LicenseTransacProps = {
    type: LicenseType,
    dateBegin?: Date | string,
    dateEnd?: Date | string,
    license?: TProductLicense
}
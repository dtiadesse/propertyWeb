import type { BrokerSelectOption } from "./brokerSelectOption";
import type { CompanySelectOption } from "./companySelectOption";

export interface Opportunity {
    id: string;
    opportunityType: string;
    opportunityName: string;
    dealProfile: string;
    estimatedLoanAmount: number;
    category: string;
    feeAmountPct: number;
    subcategory: string;
    company: CompanySelectOption;
    sideRepresented: string;
    leadBroker: BrokerSelectOption;
    closeDate: string;
    pitchDate: string;
    stabilizeLoanAmount: number;
    stabilizeNOI: number;
    leadOffice: string;
    referralCompany: CompanySelectOption;
    consultingType: string;
    isPortfolio: boolean;
    userEmail: string;
    oneCapUserId: string;
}
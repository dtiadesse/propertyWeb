import type { Relationship } from "./relationship.model";
import type { CompanySummary } from "./companySummary.model";
import type { ContactSummary } from "./contactSummary.model";

export interface RelationshipResponse {
    companyRelationships: CompanySummary[];
    contactRelationships: ContactSummary[];
    relatedProperties: Relationship[];
    relatedContacts: ContactSummary[];
    hasError: boolean;
    errorMsg: string;
}
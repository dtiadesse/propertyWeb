import type { Opportunity } from "./opportunity.model";
import type { PropertySummary } from "./propertySummary.model";

export interface OpportunityData {
    opportunity: Opportunity,
    properties: PropertySummary[],
    portfolioName: string
}
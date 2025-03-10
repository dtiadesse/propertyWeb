import type { PersonalListProperty } from "./personalListProperty.model";

export interface PersonalList {
    id: string;
    listName: string;
    properties: PersonalListProperty[];
}
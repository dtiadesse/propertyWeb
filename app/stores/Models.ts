export interface Property {
  id: string;
  source: string;
  sourceId: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  stdAddress1: string;
  stdAddress2: string;
  stdCity: string;
  stdState: string;
  stdStateCode: string;
  stdCounty: string;
  stdPostalCode: string;
  stdCountry: string;
  stdCountryCode: string;
  stdLatitude: number | null;
  stdLongitude: number | null;
  googleLocationType: string;
  googleAddressType: string;
  profiseeMasterRecordId: string;
  stdFullAddress: string;
  propertyType: string;
  propertySubType: string;
  mixedUse: string;
  secondaryPropertyType: string;
  propertyStyle: string;
  buildingClass: string;
  buildingStatus: string;
  buildingSizeSqFt: number | null;
  yearBuilt: number | null;
  completionDate: string | null;
  rentType: string;
  numberOfUnits: number | null;
  market: string;
  lastSalePrice: number | null;
  crossStreet: string;
  crossStreet2: string;
  county: string;
  borough: string;
  township: string;
  dateRenovated: string;
  siding: string;
  roofing: string;
  beds: string;
  sizeAcres: string;
  stories: string;
  region: string;
  garages: string;
  carports: string;
  buildings: string;
  website: string;
  parcelNumber: string;
  parkingSpaces: string;
  subMarket: string;
  createdBy: string;
  createdByEmail: string;
  lastUpdatedBy: string;
  lastUpdatedByEmail: string;
  lastUpdatedDate: string | null;
  createdDate: string | null;
  // extre
  propertyRelationship: PropertyRelationship[];
  notes: Note[];
  developmentPhases: DevelopmentPhase[];
  amenities: Amenity[];
  features: Feature[];
  rentSurveys: any[];
  mapNumber: string;
  microMarket: string;
  municipality: string;
  configuration: string;
  designation: string;
  intendedUse: string;
  intendedSubUse: string;
  rate: string;
  rateDetail: string;
  composition: string;
  lastReplaced: string;
  images: any[];
  createNewImage: boolean;
  utilities: Utility[];
  transactions: Transaction[];
  rentComparables: any[];
  transactionComparables: any[];
}

export interface Utility {
  name: string;
  paidBy: string;
  isUserAdded?: boolean;
}

export interface Amenity {
  name: string;
  description: string;
}

export interface Feature {
  name: string;
  description: string;
  selectUnits?: boolean;
}

export interface PropertyRelationship {
  Company: Company;
  Contact: Contact;
  Role: Role;
  Source: string;
}

export interface Company {
  Id: string | number;
  Name: string;
}

export interface Contact {
  Id: string | number;
  Name: string;
}

export interface Role {
  Id: string | number;
  Name: string;
}

export interface Note {
  id?: number;
  subject: string;
  message: string;
  createdBy?: string;
  createdOn?: Date;
}

export interface Options {
  class_options: Option[];
  config_options: Option[];
  desig_options: Option[];
  use_options: Option[];
  sub_use_options: SubUseOption[];
  rate: Option[];
  rateDetail: SubUseOption[];
  propertyType: Option[];
  propertySubType: SubUseOption[];
  secondaryPropertyType: Option[];
  utilities: any[];
  roofingType: any[];
  rentSurveySource: Option[];
  transactionTypes: Option[];
  transactionStatus: Option[];
  developmentStatus: Option[];
  developmentStyle: Option[];
}

export interface Option {
  label: string;
  value: string;
}

export interface SubUseOption {
  label: string;
  value: string;
  parent: string;
}

export interface DevelopmentPhase {
  id?: number;
  value?: string;
  rentPSF?: string;
  concessions?: string;
  phaseNumber?: string;
  phaseName?: string;
  status?: string;
  surveyDate?: Date | null | string;
  leased?: string;
  physical?: string;
  velocity?: string;
  unitsNumber?: string;
  constructionStyle?: string;
  developerName?: string;
  dtFirstCertificate?: Date | string;
  dtLastCertificate?: Date | string;
  isAvailableForLeasing?: string;
}

export interface Activity {
  id: string;
  type: string;
  dueDate?: string;
  startDate?: string;
  endDate?: string;
  subject: string;
  comments?: string;
  owner: LinkedContact;
  assignedTo?: any;
  user?: LinkedContact;
  location?: string;
  propertyId: string;
  relatedToObject: string;
  isOpen: boolean;
  showActionMenu?: boolean;
  status: string;
  priority: string;
  reminder?: boolean
  reminderDateTime?: Date;
  currency: string;
}

export interface LinkedContact {
  Id: string;
  Name: string;
}

export interface Transaction {
  name?: string;
  property?: string;
  status?: string;
  confidential: boolean | null;
  inHouse: boolean | null;
  propertyType: string;
  closingDate: string | null;
  salePrice: number | null;
  capRate: number | null;
  numberOfUnits: number | null;
  unitPrice: number | null;
  yearBuilt: number | null;
  buildingSizeSqFt: number | null;
  sqFtPrice: number | null;
  sizeAcres: number | null;
  acrePrice: number | null;
  acreUnit: number | null;
  beds: number | null;
  bedPrice: number | null;
  sellerCompany: SFRefObject | null;
  sellerContact: SFRefObject | null;
  coSellerCompany: SFRefObject | null;
  coSellerContact: SFRefObject | null;
  buyerCompany: SFRefObject | null;
  buyerContact: SFRefObject | null;
  coBuyerCompany: SFRefObject | null;
  coBuyerContact: SFRefObject | null;
  brokeredBy: SFRefObject | null;
  occupancy: number | null;
  preLeased: number | null;
  loanAssumption: boolean;
}

export interface SFRefObject {
  Id: string;
  Name: string;
}
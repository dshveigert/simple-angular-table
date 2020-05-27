import { IResponse } from '.';

export declare type IEvent = IDefaultEvent | ISystemHealth | ISystemHeat | IAlert | IGroup | ICalving | IBirth | IBreeding;

export interface IDefaultEvent {
  type: string;
  cowId: number;
  animalId: string;
  eventId: number;
  deletable: boolean;
  lactationNumber: number;
  daysInLactation: number;
  ageInDays: number;
  startDateTime: number;
  reportingDateTime: number;
}

export const enum EEventType {
  systemHealth = 'System Health',
  systemHeat = 'System Heat',
  distress = 'Distress',
  changeGroup = 'Change Group',
  calving = 'Calving',
  birth = 'Birth',
  breeding = 'Breeding'
}

export interface ISystemHealth extends IDefaultEvent {
  healthIndex: number;
  endDate: null;
  minValueDateTime: number
}

export interface ISystemHeat extends IDefaultEvent {
  heatIndexPeak: string;
}

export interface IAlert extends IDefaultEvent {
  alertType: string;
  duration: number;
  originalStartDateTime: number;
  endDateTime: number;
  daysInPregnancy: number;
}

export interface IGroup extends IDefaultEvent {
  newGroupId: number;
  newGroupName: string;
  currentGroupId: number;
  currentGroupName: string;
}

export interface ICalving extends IDefaultEvent {
  destinationGroup: number;
  destinationGroupName: string;
  calvingEase: any;
  daysInPregnancy: number;
  oldLactationNumber: number;
  newborns: number;
}

export interface IBirth extends IDefaultEvent {
  birthDateCalculated: boolean;
}

export interface IBreeding extends IDefaultEvent {
  sire: any;
  breedingNumber: number;
  isOutOfBreedingWindow: boolean;
  interval: number;
}

export type IEventsList = IResponse<IEvent[]>;

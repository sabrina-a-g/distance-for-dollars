import { Temporal } from "@js-temporal/polyfill";
import { categoryBySportType, metersPerUnit, PledgeRule } from "./pledgeRules";

export interface SyncedActivityInput {
  startDate: Temporal.Instant;
  distanceMeters: number;
  sportType: string;
}

export function pledgeCalculations(activities: SyncedActivityInput[], rules: PledgeRule[], startDate: Temporal.Instant, endDate?: Temporal.Instant): number {
    const results = activities.reduce((total, activity) => {
        if (Temporal.Instant.compare(activity.startDate, startDate) < 0) return total;
        if (endDate && Temporal.Instant.compare(activity.startDate, endDate) > 0) return total;
        const category = categoryBySportType[activity.sportType];
        const rule = rules.find(r => r.category === category);
        if (!rule) return total;
        return total + activity.distanceMeters / metersPerUnit[rule.unit] * rule.rate;
    }, 0);
    
    const cents = results * 100;
    return Math.round(cents) / 100;
}


 

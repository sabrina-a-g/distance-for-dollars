import { db } from "@/src/prisma/db";
import { Temporal } from "@js-temporal/polyfill";
import { usersPledge } from "./pledgeRules";
import { pledgeCalculations, SyncedActivityInput } from "./pledgeCalculations";

export async function getPledgeTotals(athleteId: bigint, goalStartDate: Temporal.Instant){
    const activities = await db.orm.public.SyncedActivity.where({ athleteId }).all();
    const goalCompare = activities.filter(activity => Temporal.Instant.compare(activity.startDate, goalStartDate) >= 0);
    const syncedActivities: SyncedActivityInput[] = goalCompare.map(activity => ({
        startDate: activity.startDate as any,
        distanceMeters: activity.distanceMeters,
        sportType: activity.sportType,
    }));
    return pledgeCalculations(syncedActivities, usersPledge, goalStartDate);
}

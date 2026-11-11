export type Category = "Running" | "Walking" | "Hiking" | "Biking" | "Swimming";
export type Unit = "miles" | "meters" | "yards" | "100 meters" | "100 yards";

// The rate at which the user pledges to donate per unit of distance
export type Rate = number;

export interface PledgeRule {
  category: Category;
  unit: Unit;
  rate: Rate;
}

export const usersPledge: PledgeRule[] = [
  { category: "Running", rate: 1, unit: "miles" },
  { category: "Walking", rate: 0.5, unit: "miles" },
  { category: "Hiking", rate: 0.75, unit: "miles" },
  { category: "Biking", rate: 0.25, unit: "miles" },
  { category: "Swimming", rate: 2, unit: "100 meters" },
];

export const metersPerUnit: Record<Unit, number> = {
  miles: 1609.344,
  meters: 1,
  yards: 0.9144,
  "100 meters": 100,
  "100 yards": 91.44
};

export const categoryBySportType: Record<string, Category> = {
  Run: "Running",
  TrailRun: "Running",
  Walk: "Walking",
  Hike: "Hiking",
  Ride: "Biking",
  MountainBikeRide: "Biking",
  Swim: "Swimming",
};



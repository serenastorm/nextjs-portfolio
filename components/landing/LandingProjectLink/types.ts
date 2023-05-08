export type ProjectType = "open_source" | "experiment";

export type LandingProject = {
  title: string;
  description?: string;
  slug: string;
};

export type LandingFooterProject = {
  type: ProjectType;
  title: string;
  description?: string;
  year: string;
  url: string;
};

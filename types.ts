
export interface ProjectIdea {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
}

export interface Submission {
  id: string;
  projectName: string;
  teamName: string;
  description: string;
  repoUrl: string;
  status: 'Pending' | 'Reviewing' | 'Completed';
}

export type AppView = 'dashboard' | 'brainstorm' | 'submit' | 'mentor';

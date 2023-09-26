export interface QuestionsList {
  id: string;
  title: string;
  answer: string;
  subpoints: string[] | null;
  tags: string[];
  image: string | null;
}

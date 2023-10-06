import { Tags } from 'src/app/home/shared/enums/tags.enum';

export interface QuestionsList {
  id: string;
  title: string;
  answer: string;
  subpoints: string[] | null;
  tags: Tags;
  image: string | null;
}

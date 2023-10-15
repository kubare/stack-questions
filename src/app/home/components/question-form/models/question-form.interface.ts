import { FormControl, FormArray } from '@angular/forms';

export interface QuestionForm {
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  answer: FormControl<string | null>;
  subpoints: FormArray;
  tags: FormControl<string | null>;
  image: FormControl<string | null>;
}

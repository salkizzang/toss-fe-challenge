import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.').min(2, '이름은 2글자 이상 입력해주세요.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식을 입력해주세요.'),
  message: z.string().min(1, '메시지를 입력해주세요.').min(10, '메시지는 10글자 이상 입력해주세요.'),
});

export type FormData = z.infer<typeof formSchema>;

export interface FormModalProps {
}

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export interface TextInputProps extends FormFieldProps {
  type?: 'text' | 'email';
  placeholder?: string;
  register: any; 
}

export interface TextAreaProps extends FormFieldProps {
  rows?: number;
  placeholder?: string;
  register: any; 
}
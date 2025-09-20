import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, TextArea } from '../form/FormField';
import { ScrollTestContent } from '../ScrollTestContent';
import { formSchema, type FormData, type FormModalProps } from '../../types/form';
import { useModal } from '../../contexts/ModalContext';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const FormActions = ({ onCancel, isSubmitting }: FormActionsProps) => (
  <div className="form-actions">
    <button
      type="button"
      onClick={onCancel}
      className="btn btn-secondary"
      disabled={isSubmitting}
    >
      취소
    </button>
    <button
      type="submit"
      className="btn btn-primary"
      disabled={isSubmitting}
    >
      {isSubmitting ? '제출 중...' : '제출하기'}
    </button>
  </div>
);

export const FormModal = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleFormSubmit = (data: FormData) => {
    closeModal(data);
  };

  const handleCancel = () => {
    closeModal(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      closeModal(null);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="dialog-content"
          aria-modal="true"
        >
        <Dialog.Title
          ref={titleRef}
          className="dialog-title"
          tabIndex={-1}
        >
          문의하기
        </Dialog.Title>
        <Dialog.Description
          className="dialog-description"
        >
          모든 필드를 정확히 입력해주세요.
        </Dialog.Description>

        <div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="modal-form">
            <TextInput
              id="name"
              label="이름"
              required
              register={register('name')}
              error={errors.name?.message}
            />

            <TextInput
              id="email"
              label="이메일"
              type="email"
              required
              register={register('email')}
              error={errors.email?.message}
            />

            <ScrollTestContent
              count={10}
              title="추가 정보"
              className="modal-scroll-test"
              itemContent="스크롤 테스트"
            />

            <TextArea
              id="message"
              label="문의 내용"
              required
              rows={6}
              placeholder="문의하실 내용을 자세히 적어주세요."
              register={register('message')}
              error={errors.message?.message}
            />

            <FormActions
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>

        <Dialog.Close asChild>
          <button className="dialog-close" aria-label="닫기" type="button">
            ×
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  );
};